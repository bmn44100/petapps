import { HttpError } from 'wasp/server'

export const getAvailableProducts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Product.findMany({});
}

export const getUserWishlist = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const userWithWishlist = await context.entities.User.findUnique({
    where: { id: context.user.id },
    select: {
      wishlist: {
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true
        }
      }
    }
  });

  if (!userWithWishlist) throw new HttpError(404, 'User not found');

  return userWithWishlist.wishlist;
}
