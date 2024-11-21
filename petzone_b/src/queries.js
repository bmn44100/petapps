import { HttpError } from 'wasp/server'

export const getProducts = async (args, context) => {
  const { category, searchTerm } = args;
  const whereClause = {};
  if (category) {
    whereClause.category = category;
  }
  if (searchTerm) {
    whereClause.OR = [
      { name: { contains: searchTerm, mode: 'insensitive' } },
      { description: { contains: searchTerm, mode: 'insensitive' } }
    ];
  }
  return context.entities.Product.findMany({ where: whereClause });
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

export const getProductDetails = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const product = await context.entities.Product.findUnique({
    where: { id },
    include: {
      reviews: {
        select: {
          id: true,
          rating: true,
          comment: true,
          user: {
            select: {
              id: true,
              reviews: true
            }
          }
        }
      }
    }
  });

  if (!product) throw new HttpError(404, 'No product with id ' + id);

  return product;
}
