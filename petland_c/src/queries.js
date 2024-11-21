import { HttpError } from 'wasp/server'

export const getProductDetails = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) }
  const product = await context.entities.Product.findUnique({
    where: { id },
    include: {
      vendor: true,
      Item: true
    }
  });
  if (!product) throw new HttpError(404, 'No product with id ' + id);
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    petType: product.petType,
    vendor: {
      name: product.vendor.name,
      contactInfo: product.vendor.contactInfo
    }
  };
}

export const getUserOrders = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }; // Ensure the user is authenticated.

  return context.entities.Order.findMany({
    where: { userId: context.user.id },
    select: {
      id: true,
      status: true,
      totalAmount: true,
      products: {
        select: {
          id: true,
          name: true,
          price: true
        }
      }
    }
  });
}

export const getVendorProducts = async ({ vendorId }, context) => {
  if (!context.user) { throw new HttpError(401) }
  const products = await context.entities.Product.findMany({
    where: {
      vendorId
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      category: true,
      petType: true
    }
  });
  return products;
}
