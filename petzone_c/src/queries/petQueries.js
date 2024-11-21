import { HttpError } from 'wasp/server';

export const getPetProfiles = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }
  return context.entities.Pet.findMany({
    where: {
      userId: context.user.id
    },
    select: {
      name: true,
      breed: true,
      medicalRecords: true
    }
  });
}
