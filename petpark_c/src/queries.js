import { HttpError } from 'wasp/server'

export const getProductsByCategory = async ({ categoryId }, context) => {
  if (!context.user) { throw new HttpError(401); }

  const products = await context.entities.Product.findMany({
    where: {
      categoryId: categoryId
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      inStock: true,
      image: true
    }
  });

  return products;
}

export const getUserOrders = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }

  return context.entities.Order.findMany({
    where: {
      userId: context.user.id
    },
    include: {
      items: true 
    }
  });
}

export const searchProducts = async ({ searchTerm }, context) => {
  if (!context.user) { throw new HttpError(401); }

  return context.entities.Product.findMany({
    where: {
      OR: [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } }
      ],
      inStock: true
    }
  });
}
