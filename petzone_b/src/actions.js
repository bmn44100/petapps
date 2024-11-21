import { HttpError } from 'wasp/server'

export const createOrder = async ({ productIds }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const products = await context.entities.Product.findMany({
    where: { id: { in: productIds } }
  });

  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

  const order = await context.entities.Order.create({
    data: {
      user: { connect: { id: context.user.id } },
      products: { connect: productIds.map(id => ({ id })) },
      status: "Pending",
      totalPrice
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
      user: { connect: { id: context.user.id } },
      product: { connect: { id: productId } }
    }
  });
  return review;
}
