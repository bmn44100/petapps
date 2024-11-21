import { HttpError } from 'wasp/server'

export const createOrder = async ({ products }, context) => {
  if (!context.user) { throw new HttpError(401) }

  let totalPrice = 0;
  const orderItems = await Promise.all(products.map(async ({ productId, quantity }) => {
    const product = await context.entities.Product.findUnique({
      where: { id: productId }
    });
    if (!product || product.stock < quantity) {
      throw new HttpError(400, 'Product not available or insufficient stock')
    }
    totalPrice += product.price * quantity;
    return {
      quantity,
      productId: product.id
    };
  }));

  const order = await context.entities.Order.create({
    data: {
      totalPrice,
      userId: context.user.id,
      orderItems: {
        create: orderItems
      }
    }
  });

  await Promise.all(products.map(async ({ productId, quantity }) => {
    await context.entities.Product.update({
      where: { id: productId },
      data: { stock: { decrement: quantity } }
    });
  }));

  return order;
}

export const addProductReview = async ({ productId, rating, comment }, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Review.create({
    data: {
      rating,
      comment,
      user: { connect: { id: context.user.id } },
      product: { connect: { id: productId } }
    }
  })
}
