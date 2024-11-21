import { HttpError } from 'wasp/server';

export const getProducts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const filters = {};
  if (args.categoryId) {
    filters.categories = { some: { id: args.categoryId } };
  }

  const products = await context.entities.Product.findMany({
    where: filters,
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      stock: true
    }
  });

  return products;
};

export const getCart = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const cart = await context.entities.Cart.findUnique({
    where: { userId: context.user.id },
    include: {
      items: {
        select: {
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
              stock: true
            }
          }
        }
      }
    }
  });

  if (!cart) throw new HttpError(404, 'Cart not found');

  return cart;
};

export const getOrderHistory = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }
  return context.entities.Order.findMany({
    where: { userId: context.user.id },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });
};
