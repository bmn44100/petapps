import { HttpError } from 'wasp/server';

export const addToCart = async ({ productId, quantity }, context) => {
  if (!context.user) { throw new HttpError(401); }

  const product = await context.entities.Product.findUnique({
    where: { id: productId }
  });
  if (!product || product.stock < quantity) { throw new HttpError(400, 'Product not in stock'); }

  const existingCartItem = await context.entities.CartItem.findFirst({
    where: {
      userId: context.user.id,
      productId
    }
  });

  if (existingCartItem) {
    await context.entities.CartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + quantity }
    });
  } else {
    await context.entities.CartItem.create({
      data: {
        user: { connect: { id: context.user.id } },
        product: { connect: { id: productId } },
        quantity
      }
    });
  }

  await context.entities.Product.update({
    where: { id: productId },
    data: { stock: product.stock - quantity }
  });
};

export const createOrder = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }

  const cartItems = await context.entities.CartItem.findMany({
    where: { userId: context.user.id }
  });

  if (cartItems.length === 0) { throw new HttpError(400, 'No items in cart.'); }

  const orderItems = cartItems.map(cartItem => ({
    productId: cartItem.productId,
    quantity: cartItem.quantity
  }));

  const total = await cartItems.reduce(async (sum, cartItem) => {
    const product = await context.entities.Product.findUnique({ where: { id: cartItem.productId } });
    return sum + product.price * cartItem.quantity;
  }, 0);

  const order = await context.entities.Order.create({
    data: {
      userId: context.user.id,
      total,
      status: 'Pending',
      items: {
        create: orderItems
      }
    }
  });

  await context.entities.CartItem.deleteMany({
    where: { userId: context.user.id }
  });

  return order;
};
