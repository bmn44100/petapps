import { HttpError } from 'wasp/server'

export const getProductCatalog = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { category, minPrice, maxPrice, isAvailable } = args;

  const products = await context.entities.Product.findMany({
    where: {
      category: category ? category : undefined,
      price: {
        gte: minPrice !== undefined ? minPrice : undefined,
        lte: maxPrice !== undefined ? maxPrice : undefined,
      },
      stock: isAvailable ? { gt: 0 } : undefined
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      stock: true,
      category: true,
      reviews: true
    }
  });

  return products;
}

export const getUserOrders = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Order.findMany({
    where: { userId: context.user.id },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    }
  });
}

export const getProductDetails = async ({ id }, context) => {
  const product = await context.entities.Product.findUnique({
    where: { id },
    include: {
      reviews: {
        select: {
          rating: true,
          comment: true,
          user: {
            select: {
              id: true,
              // Select other user fields if needed
            }
          }
        }
      }
    }
  });
  if (!product) throw new HttpError(404, 'No product with id ' + id);
  return product;
}
