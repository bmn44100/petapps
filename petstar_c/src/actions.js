import { HttpError } from 'wasp/server'

export const createOrder = async ({ productIds, status }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const products = await context.entities.Product.findMany({
    where: { id: { in: productIds } }
  });

  if (products.length !== productIds.length) { throw new HttpError(400, 'Some products not found') }

  const total = products.reduce((sum, product) => sum + product.price, 0);

  const newOrder = await context.entities.Order.create({
    data: {
      userId: context.user.id,
      products: { connect: productIds.map(id => ({ id })) },
      status,
      total,
      orderDate: new Date()
    }
  });

  return newOrder;
}

export const updateProductStock = async ({ productId, newStock }, context) => {
  if (!context.user) { throw new HttpError(401) }
  const vendorProfile = await context.entities.VendorProfile.findUnique({
    where: { userId: context.user.id },
    include: { products: true }
  });
  if (!vendorProfile) { throw new HttpError(403) }

  const product = vendorProfile.products.find(product => product.id === productId);
  if (!product) { throw new HttpError(403, 'Product not found or you do not have access.') }

  return context.entities.Product.update({
    where: { id: productId },
    data: { stock: newStock }
  });
}
