import { HttpError } from 'wasp/server';

export const createOrder = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }

  const { orderItems } = args;
  if (!orderItems || !orderItems.length) {
    throw new HttpError(400, 'No order items provided');
  }

  // Validate order items
  for (const item of orderItems) {
    const product = await context.entities.Product.findUnique({
      where: { id: item.productId }
    });
    if (!product) {
      throw new HttpError(404, `Product with id ${item.productId} not found`);
    }
    if (item.quantity <= 0) {
      throw new HttpError(400, 'Quantity must be greater than 0');
    }
  }

  // Create order
  const order = await context.entities.Order.create({
    data: {
      status: 'Pending',
      user: { connect: { id: context.user.id } },
      orderItems: {
        create: orderItems.map(item => ({
          quantity: item.quantity,
          product: { connect: { id: item.productId } }
        }))
      }
    },
    include: { orderItems: true }
  });

  return order;
}