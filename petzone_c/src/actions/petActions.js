import { HttpError } from 'wasp/server'

export const updatePetProfile = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const pet = await context.entities.Pet.findUnique({
    where: { id: args.petId },
    select: { userId: true }
  });
  if (pet.userId !== context.user.id) { throw new HttpError(403) }

  return context.entities.Pet.update({
    where: { id: args.petId },
    data: args.updatedFields
  });
}
