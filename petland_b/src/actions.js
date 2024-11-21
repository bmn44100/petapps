import { HttpError } from 'wasp/server'

export const addProductToWishlist = async ({ productId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const product = await context.entities.Product.findUnique({
    where: { id: productId }
  });
  if (!product) { throw new HttpError(404, 'Product not found') };

  await context.entities.User.update({
    where: { id: context.user.id },
    data: { wishlist: { connect: { id: productId } } }
  });
};

export const createOrder = async ({ productIds }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const products = await context.entities.Product.findMany({
    where: { id: { in: productIds } }
  });

  if (products.length !== productIds.length) {
    throw new HttpError(400, 'Some products not found');
  }

  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

  const order = await context.entities.Order.create({
    data: {
      user: { connect: { id: context.user.id } },
      products: { connect: productIds.map(id => ({ id })) },
      totalPrice,
      status: 'pending'
    }
  });

  return order;
}
