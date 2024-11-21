import { HttpError } from 'wasp/server'

export const getProductCatalog = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const filters = {};
  if (args.category) {
    filters.category = args.category;
  }
  if (args.minPrice || args.maxPrice) {
    filters.price = {};
    if (args.minPrice) {
      filters.price.gte = args.minPrice;
    }
    if (args.maxPrice) {
      filters.price.lte = args.maxPrice;
    }
  }
  return await context.entities.Product.findMany({
    where: filters,
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      category: true
    }
  });
}

export const getUserOrders = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Order.findMany({
    where: {
      userId: context.user.id
    },
    select: {
      id: true,
      status: true,
      totalPrice: true
    }
  });
}

export const getUserProfile = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  // Fetch user information along with orders and pet profiles
  return await context.entities.User.findUnique({
    where: { id: context.user.id },
    select: {
      id: true,
      orders: {
        select: {
          id: true,
          status: true,
          totalPrice: true,
          products: {
            select: {
              id: true,
              name: true,
              price: true
            }
          }
        }
      },
      petProfiles: {
        select: {
          id: true,
          name: true,
          breed: true,
          age: true
        }
      }
    }
  });
}
