import { HttpError } from 'wasp/server'

export const getProductCatalog = async ({ categoryId }, context) => {
  const filter = categoryId ? { categoryId } : {};
  return context.entities.Product.findMany({
    where: filter,
    select: {
      name: true,
      description: true,
      price: true,
      imageUrl: true
    }
  });
}

export const getUserOrders = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Order.findMany({
    where: { userId: context.user.id },
    include: {
      products: {
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true
        }
      }
    }
  });
}

export const getProductReviews = async ({ productId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const reviews = await context.entities.Review.findMany({
    where: { productId },
    select: {
      id: true,
      rating: true,
      comment: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          profile: {
            select: {
              address: true,
              phoneNumber: true
            }
          }
        }
      }
    }
  });

  return reviews;
}
