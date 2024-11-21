import { HttpError } from 'wasp/server'

export const createOrder = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  const userId = context.user.id;

  // Find all products in user's cart for the order (assuming we have a mechanism to get them)
  const cartProducts = await context.entities.Product.findMany({
    where: { userId, Order: null }
  });

  if (!cartProducts.length) {
    throw new HttpError(400, 'Cart is empty');
  }

  // Calculate total price
  const totalPrice = cartProducts.reduce((sum, product) => sum + product.price, 0);

  // Create new order
  const order = await context.entities.Order.create({
    data: {
      userId,
      products: { connect: cartProducts.map(product => ({ id: product.id })) },
      status: 'Processing',
      totalPrice
    }
  });

  // Update products to reference the new order
  await Promise.all(cartProducts.map(product =>
    context.entities.Product.update({
      where: { id: product.id },
      data: { orderId: order.id }
    })
  ));

  return order;
}

export const addRating = async ({ productId, score, comment }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const existingRating = await context.entities.Rating.findFirst({
    where: {
      productId: productId,
      userId: context.user.id
    }
  });

  if (existingRating) { throw new HttpError(400, "User has already rated this product."); }

  return context.entities.Rating.create({
    data: {
      score: score,
      comment: comment,
      product: {
        connect: { id: productId }
      },
      user: {
        connect: { id: context.user.id }
      }
    }
  });
}
