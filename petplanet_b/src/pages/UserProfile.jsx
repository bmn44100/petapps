import React from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { getPetProfiles, savePetProfile } from 'wasp/client/operations';

const UserProfilePage = () => {
  const { data: petProfiles, isLoading, error } = useQuery(getPetProfiles);
  const savePetProfileFn = useAction(savePetProfile);

  const handleSaveProfile = (profile) => {
    savePetProfileFn(profile);
  };

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Pet Profiles</h2>
        {petProfiles.map(profile => (
          <div key={profile.id} className="border p-4 rounded mb-4">
            <div className="mb-2">
              <span className="font-semibold">Name:</span> {profile.name}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Breed:</span> {profile.breed}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Age:</span> {profile.age}
            </div>
            <button
              onClick={() => handleSaveProfile(profile)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            >
              Save Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfilePage;
