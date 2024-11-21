import { HttpError } from 'wasp/server'

export const getProductsByCategory = async ({ category, priceRange, sortBy }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const whereClause = { category };
  if (priceRange) {
    whereClause.price = { gte: priceRange.min, lte: priceRange.max };
  }

  const orderByClause = sortBy ? { [sortBy.field]: sortBy.direction } : { id: 'asc' };

  return context.entities.Product.findMany({
    where: whereClause,
    orderBy: orderByClause,
    include: {
      additionalImages: true
    }
  });
}

export const getUserCart = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.CartItem.findMany({
    where: { userId: context.user.id },
    select: {
      id: true,
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          mainImage: true
        }
      },
      quantity: true
    }
  });
}
