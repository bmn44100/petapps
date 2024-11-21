import { HttpError } from 'wasp/server'

export const getProducts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { category, minPrice, maxPrice, petType } = args;

  const filters = {};
  if (category) filters.category = category;
  if (minPrice != null && maxPrice != null) {
    filters.price = { gte: minPrice, lte: maxPrice };
  } else if (minPrice != null) {
    filters.price = { gte: minPrice };
  } else if (maxPrice != null) {
    filters.price = { lte: maxPrice };
  }
  if (petType) filters.category = petType;

  return context.entities.Product.findMany({
    where: filters,
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      category: true,
      stock: true,
      images: true
    }
  });
}

export const getUserOrders = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }

  return context.entities.Order.findMany({
    where: {
      userId: context.user.id
    },
    include: {
      products: true
    }
  });
}

export const getWishlist = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return await context.entities.WishlistItem.findMany({
    where: {
      userId: context.user.id
    },
    include: {
      product: true
    }
  });
}
