import React, { useContext } from "react";
import { AuthContext } from "../../../../context/authContext";

const Profile = () => {
  const { userData } = useContext(AuthContext);

  console.log(userData);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Profile Avatar */}
        <div className="flex justify-center mb-5">
          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
            H
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">{userData?.user?.name}</h1>

          <p className="text-gray-500 mt-1">{userData?.user?.email}</p>
        </div>

        {/* Details */}
        <div className="mt-7 border-t border-gray-200 pt-5">
          <div className="flex justify-between items-center py-3">
            <span className="text-sm text-gray-500">Name</span>
            <span className="font-medium text-gray-800">{userData?.user?.name}</span>
          </div>

          <div className="flex justify-between items-center py-3">
            <span className="text-sm text-gray-500">Email</span>
            <span className="font-medium text-gray-800">{userData?.user?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
