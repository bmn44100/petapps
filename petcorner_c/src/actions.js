import { HttpError } from 'wasp/server'

export const createOrder = async ({ productIds }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const products = await context.entities.Product.findMany({
    where: { id: { in: productIds } }
  });

  const totalAmount = products.reduce((sum, product) => sum + product.price, 0);

  const order = await context.entities.Order.create({
    data: {
      userId: context.user.id,
      totalAmount,
      status: 'Pending',
      products: {
        connect: productIds.map(id => ({ id }))
      }
    }
  });

  await Promise.all(products.map(product =>
    context.entities.Product.update({
      where: { id: product.id },
      data: { stock: product.stock - 1 }
    })
  ));

  return order;
}

export const addReview = async ({ productId, rating, comment }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const product = await context.entities.Product.findUnique({
    where: { id: productId }
  });

  if (!product) { throw new HttpError(404, 'Product not found') };

  return await context.entities.Review.create({
    data: {
      rating,
      comment,
      user: { connect: { id: context.user.id } },
      product: { connect: { id: productId } }
    }
  });
}

export const addToWishlist = async ({ productId }, context) => {
  if (!context.user) { throw new HttpError(401); }

  const wishlist = await context.entities.Wishlist.findUnique({
    where: { userId: context.user.id },
    include: { products: true }
  });

  if (!wishlist) { throw new HttpError(404, 'Wishlist not found'); }

  const productExists = wishlist.products.some(product => product.id === productId);
  if (productExists) { throw new HttpError(409, 'Product already in wishlist'); }

  await context.entities.Wishlist.update({
    where: { id: wishlist.id },
    data: { products: { connect: { id: productId } } }
  });
}
