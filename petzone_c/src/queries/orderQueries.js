import { HttpError } from 'wasp/server'

export const getOrders = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return await context.entities.Order.findMany({
    where: { userId: context.user.id },
    select: {
      id: true,
      status: true,
      orderItems: {
        select: {
          id: true,
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true
            }
          }
        }
      }
    }
  });
}
