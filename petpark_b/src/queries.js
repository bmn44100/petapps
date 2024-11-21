import { HttpError } from 'wasp/server'

export const getProducts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  const { categoryId } = args;
  const filters = categoryId ? { categoryId } : {};
  return context.entities.Product.findMany({
    where: filters,
    include: {
      category: true
    }
  });
}

export const getUserOrders = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

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
              address: true
            }
          }
        }
      },
      category: {
        select: {
          name: true
        }
      }
    }
  });

  if (!product) throw new HttpError(404, 'No product with id ' + id);

  return product;
}
