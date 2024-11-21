import { HttpError } from 'wasp/server'

export const createOrder = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { products } = args;
  let totalPrice = 0;

  const orderItems = await Promise.all(products.map(async (item) => {
    const product = await context.entities.Product.findUnique({
      where: { id: item.productId }
    });
    if (!product) { throw new HttpError(404) }

    totalPrice += product.price * item.quantity;

    return {
      productId: product.id,
      quantity: item.quantity
    };
  }));

  const order = await context.entities.Order.create({
    data: {
      userId: context.user.id,
      status: 'Pending',
      totalPrice,
      items: {
        create: orderItems
      }
    }
  });

  return order;
}

export const savePetProfile = async ({ name, breed, age }, context) => {
  if (!context.user) { throw new HttpError(401) }
  
  const existingProfile = await context.entities.PetProfile.findFirst({
    where: {
      name,
      userId: context.user.id
    }
  });

  if (existingProfile) {
    return context.entities.PetProfile.update({
      where: { id: existingProfile.id },
      data: { breed, age }
    });
  } else {
    return context.entities.PetProfile.create({
      data: {
        name,
        breed,
        age,
        userId: context.user.id
      }
    });
  }
}
