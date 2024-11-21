import { HttpError } from 'wasp/server'

export const getProducts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const filters = {};
  if (args.category) {
    filters.category = args.category;
  }
  if (args.minPrice !== undefined && args.maxPrice !== undefined) {
    filters.price = { gte: args.minPrice, lte: args.maxPrice };
  }
  if (args.isAvailable !== undefined) {
    filters.stock = args.isAvailable ? { gt: 0 } : undefined;
  }

  return context.entities.Product.findMany({
    where: filters,
    select: {
      name: true,
      price: true,
      stock: true,
      imageUrl: true
    }
  });
}

export const getProductDetails = async ({ id }, context) => {
  const product = await context.entities.Product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      stock: true,
      imageUrl: true,
      reviews: {
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              address: true,
            }
          }
        }
      }
    }
  });

  if (!product) throw new HttpError(404, 'No product with id ' + id);

  return product;
}

export const getUserOrders = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Order.findMany({
    where: { userId: context.user.id },
    include: {
      products: true
    }
  });
}
