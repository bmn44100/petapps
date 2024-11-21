import { HttpError } from 'wasp/server'

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
              username: true
            }
          }
        }
      }
    }
  });

  if (!product) throw new HttpError(404, 'No product with id ' + id);

  return product;
}

export const listAvailableProducts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Product.findMany({
    select: {
      name: true,
      price: true,
      stock: true
    },
    where: {
      stock: { gt: 0 }
    }
  });
}

export const getUserOrders = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const orders = await context.entities.Order.findMany({
    where: { userId: context.user.id },
    select: {
      id: true,
      status: true,
      orderDate: true
    }
  });

  return orders;
}
