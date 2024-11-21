import { HttpError } from 'wasp/server'

export const addProductToCart = async ({ productId, quantity }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const product = await context.entities.Product.findUnique({
    where: { id: productId }
  });
  if (!product) { throw new HttpError(404, "Product not found") };
  if (product.stock < quantity) { throw new HttpError(400, "Insufficient stock") };

  let cart = await context.entities.Cart.findFirst({
    where: { userId: context.user.id },
    include: { items: true }
  });

  if (!cart) {
    cart = await context.entities.Cart.create({
      data: { userId: context.user.id, items: [] }
    });
  }

  const existingCartItem = cart.items.find(item => item.productId === productId);

  if (existingCartItem) {
    await context.entities.CartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + quantity }
    });
  } else {
    await context.entities.CartItem.create({
      data: { cartId: cart.id, productId, quantity }
    });
  }

  await context.entities.Product.update({
    where: { id: productId },
    data: { stock: product.stock - quantity }
  });
}

export const createOrder = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const cart = await context.entities.Cart.findUnique({
    where: { userId: context.user.id },
    include: { items: { include: { product: true } } }
  });

  if (!cart || cart.items.length === 0) {
    throw new HttpError(400, 'Cart is empty');
  }

  const order = await context.entities.Order.create({
    data: {
      userId: context.user.id,
      totalPrice: cart.items.reduce((sum, item) => sum + (item.quantity * item.product.price), 0),
      status: 'pending',
      items: {
        create: cart.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      }
    }
  });

  await context.entities.CartItem.deleteMany({
    where: { cartId: cart.id }
  });

  return order;
}

export const writeReview = async ({ productId, rating, comment }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const product = await context.entities.Product.findUnique({
    where: { id: productId }
  });
  if (!product) { throw new HttpError(404, 'Product not found') };

  const review = await context.entities.Review.create({
    data: {
      userId: context.user.id,
      productId,
      rating,
      comment
    }
  });

  return review;
}
