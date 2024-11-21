import { HttpError } from 'wasp/server'

export const createOrder = async ({ productIds }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const products = await context.entities.Product.findMany({
    where: { id: { in: productIds } }
  });

  if (products.length !== productIds.length) {
    throw new HttpError(400, 'Some products not found');
  }

  const totalAmount = products.reduce((sum, product) => sum + product.price, 0);

  const order = await context.entities.Order.create({
    data: {
      userId: context.user.id,
      products: {
        connect: products.map(product => ({ id: product.id }))
      },
      status: 'pending',
      totalAmount
    }
  });

  return order;
}

export const addToWishlist = async ({ productId }, context) => {
  if (!context.user) { throw new HttpError(401) };
  const product = await context.entities.Product.findUnique({ where: { id: productId } });
  if (!product) { throw new HttpError(404, 'Product not found') };
  const wishlistItem = await context.entities.Item.findUnique({ where: { userId_productId: { userId: context.user.id, productId } } });
  if (wishlistItem) { throw new HttpError(409, 'Product already in wishlist') };
  await context.entities.Item.create({ data: { userId: context.user.id, productId } });
  const updatedWishlist = await context.entities.Item.findMany({
    where: { userId: context.user.id },
    include: { product: true }
  });
  return updatedWishlist;
}

export const updateVendor = async ({ vendorId, name, contactInfo }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const vendor = await context.entities.Vendor.findUnique({
    where: { id: vendorId }
  });
  if (!vendor || vendor.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Vendor.update({
    where: { id: vendorId },
    data: { name, contactInfo }
  });
}
