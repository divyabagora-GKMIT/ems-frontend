import React from 'react';

const DashboardHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      {subtitle && (
        <p className="text-gray-600 text-lg">{subtitle}</p>
      )}
    </div>
  );
};

export default DashboardHeader;

