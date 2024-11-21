import { HttpError } from 'wasp/server'

export const createOrder = async ({ items }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const totalAmount = await Promise.all(items.map(async ({ productId, quantity }) => {
    const product = await context.entities.Product.findUnique({ where: { id: productId } });
    if (!product || product.stock < quantity) {
      throw new HttpError(400, 'Product not available in sufficient stock.');
    }
    return product.price * quantity;
  })).then(amounts => amounts.reduce((sum, amount) => sum + amount, 0));

  const order = await context.entities.Order.create({
    data: {
      userId: context.user.id,
      totalAmount,
      status: 'Pending',
      orderItems: {
        create: await Promise.all(items.map(async ({ productId, quantity }) => ({
          productId,
          quantity,
          priceAtPurchase: (await context.entities.Product.findUnique({ where: { id: productId } })).price
        })))
      }
    }
  });

  for (const { productId, quantity } of items) {
    await context.entities.Product.update({
      where: { id: productId },
      data: { stock: { decrement: quantity } }
    });
  }

  return order;
}

export const addReview = async ({ productId, rating, comment }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const createdReview = await context.entities.Review.create({
    data: {
      userId: context.user.id,
      productId,
      rating,
      comment
    }
  });

  return createdReview;
}
