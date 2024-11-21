import { HttpError } from 'wasp/server'

export const getProducts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { category, minPrice, maxPrice, searchTerm } = args;

  const whereClause = {
    AND: [
      category ? { categories: { some: { id: category } } } : {},
      minPrice ? { price: { gte: minPrice } } : {},
      maxPrice ? { price: { lte: maxPrice } } : {},
      searchTerm ? { OR: [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } }
      ] } : {}
    ]
  };

  return context.entities.Product.findMany({
    where: whereClause,
    include: {
      categories: true,
      ratings: true
    }
  });
}
