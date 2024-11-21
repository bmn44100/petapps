import { HttpError } from 'wasp/server'

export const createOrder = async ({ productIds }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const products = await context.entities.Product.findMany({
    where: { id: { in: productIds } }
  });

  if (products.length !== productIds.length) {
    throw new HttpError(400, 'Some products are not available.')
  }

  const total = products.reduce((sum, product) => sum + product.price, 0);

  const order = await context.entities.Order.create({
    data: {
      userId: context.user.id,
      products: { connect: productIds.map(id => ({ id })) },
      total,
      status: 'Pending'
    }
  });

  return order;
}

export const addToWishlist = async ({ productId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  // Check if the product exists
  const product = await context.entities.Product.findUnique({
    where: { id: productId }
  });
  if (!product) { throw new HttpError(404, 'Product not found') }

  // Add product to user's wishlist
  const wishlistItem = await context.entities.WishlistItem.create({
    data: {
      userId: context.user.id,
      productId: productId
    }
  });

  // Retrieve the updated wishlist
  const updatedWishlist = await context.entities.WishlistItem.findMany({
    where: { userId: context.user.id },
    include: { product: true }
  });

  return updatedWishlist;
}
