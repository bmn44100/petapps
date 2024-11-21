import { HttpError } from 'wasp/server';

export const getProductsByCategory = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }

  const { categoryId, priceRange, minRating, availability } = args;

  const products = await context.entities.Product.findMany({
    where: {
      categoryId,
      price: {
        gte: priceRange ? priceRange.min : undefined,
        lte: priceRange ? priceRange.max : undefined
      },
      reviews: {
        every: {
          rating: {
            gte: minRating
          }
        }
      },
      OrderItem: availability !== undefined ? {
        some: {
          order: {
            status: availability ? 'available' : 'unavailable'
          }
        }
      } : undefined
    },
    include: {
      reviews: true
    }
  });

  return products;
};

export const getPetProfiles = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }
  return await context.entities.PetProfile.findMany({
    where: { userId: context.user.id }
  });
};
