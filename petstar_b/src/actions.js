import { HttpError } from 'wasp/server'

export const createOrder = async ({ productIds }, context) => {
  if (!context.user) { throw new HttpError(401); }

  const products = await context.entities.Product.findMany({
    where: { id: { in: productIds } }
  });

  if (products.length !== productIds.length) {
    throw new HttpError(400, 'Some products were not found.');
  }

  const newOrder = await context.entities.Order.create({
    data: {
      userId: context.user.id,
      products: { connect: products.map(product => ({ id: product.id })) },
      status: 'Pending',
    }
  });

  return newOrder;
}

export const addProductReview = async ({ productId, rating, comment }, context) => {
  if (!context.user) { throw new HttpError(401); }

  const product = await context.entities.Product.findUnique({
    where: { id: productId }
  });
  if (!product) { throw new HttpError(404, 'Product not found'); }

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

export const updateUserProfile = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }

  const updatedUserProfile = await context.entities.UserProfile.update({
    where: { userId: context.user.id },
    data: {
      address: args.address,
      phoneNumber: args.phoneNumber
    }
  });

  return updatedUserProfile;
}
