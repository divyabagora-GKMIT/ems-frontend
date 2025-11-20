import React from "react";

const ProfileData = ({user}) => {
  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6 border">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        My Profile
      </h2>

      <div className="space-y-4">
        {/* NAME */}
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Name</span>
          <span className="text-gray-800">{user.name}</span>
        </div>

        {/* EMAIL */}
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Email</span>
          <span className="text-gray-800">{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileData;
