import { HttpError } from 'wasp/server'

export const createOrder = async ({ userId, items }, context) => {
  if (!context.user) { throw new HttpError(401) };
  if (context.user.id !== userId) { throw new HttpError(403) };

  // Calculate total amount for the order based on the provided items.
  let totalAmount = 0;

  // Prepare order items for database entry.
  const orderItems = await Promise.all(items.map(async (item) => {
    const product = await context.entities.Product.findUnique({
      where: { id: item.productId }
    });
    if (!product || !product.inStock) { throw new HttpError(400, 'Product is out of stock.') };
    totalAmount += product.price * item.quantity;
    return {
      productId: item.productId,
      quantity: item.quantity
    };
  }));

  // Create the order.
  const newOrder = await context.entities.Order.create({
    data: {
      userId,
      status: 'Pending',
      totalAmount,
      items: {
        create: orderItems
      }
    }
  });
  return newOrder;
}

export const addProduct = async ({ name, description, price, categoryId, image }, context) => {
  if (!context.user || !context.user.isAdmin) { throw new HttpError(401) }

  const category = await context.entities.Category.findUnique({ where: { id: categoryId } });
  if (!category) { throw new HttpError(404, 'Category not found') }

  const newProduct = await context.entities.Product.create({
    data: {
      name,
      description,
      price,
      categoryId,
      image,
      inStock: true
    }
  });

  return newProduct;
}

export const updateUserProfile = async ({ userId, address, paymentInfo }, context) => {
  if (!context.user) { throw new HttpError(401); }

  if (context.user.id !== userId) { throw new HttpError(403); }

  return context.entities.UserProfile.update({
    where: { userId },
    data: { address, paymentInfo }
  });
}
