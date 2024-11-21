import { HttpError } from 'wasp/server'

export const createOrder = async ({ productIds }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const products = await context.entities.Product.findMany({
    where: { id: { in: productIds } }
  });

  if (products.length !== productIds.length) {
    throw new HttpError(400, 'Some products not found.');
  }

  const order = await context.entities.Order.create({
    data: {
      userId: context.user.id,
      status: 'pending',
      products: {
        connect: productIds.map(id => ({ id }))
      }
    }
  });

  return order;
}

export const addReview = async ({ productId, rating, comment }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const product = await context.entities.Product.findUnique({
    where: { id: productId }
  });
  if (!product) { throw new HttpError(404, 'Product not found') };

  const review = await context.entities.Review.create({
    data: {
      rating,
      comment,
      productId,
      userId: context.user.id
    }
  });

  return review;
}
