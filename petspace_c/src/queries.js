import { HttpError } from 'wasp/server'

export const getProducts = async ({ category, search, page = 1, pageSize = 10 }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const where = {};
  if (category) {
    where.category = category;
  }
  if (search) {
    where.name = { contains: search, mode: 'insensitive' };
  }

  const products = await context.entities.Product.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { name: 'asc' }
  });

  const totalProducts = await context.entities.Product.count({ where });

  return {
    products,
    totalProducts,
    currentPage: page,
    totalPages: Math.ceil(totalProducts / pageSize)
  };
}

export const getProductDetails = async ({ productId }, context) => {
  if (!context.user) { throw new HttpError(401); }

  const product = await context.entities.Product.findUnique({
    where: { id: productId },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      stock: true,
      images: true,
      reviews: {
        select: {
          rating: true,
          comment: true,
          user: {
            select: {
              id: true
            }
          }
        }
      }
    }
  });

  if (!product) throw new HttpError(404, 'No product with id ' + productId);

  return product;
}

export const getUserOrders = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return await context.entities.Order.findMany({
    where: {
      userId: context.user.id
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    }
  });
}
