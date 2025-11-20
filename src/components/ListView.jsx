import React from "react";

const ListView = () => {
  return (
    <div>
      <div className="p-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>

        <div className="space-y-3">
          {data.length === 0 ? (
            <p className="text-gray-500">No items found.</p>
          ) : (
            data.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition"
              >
                {/* Left Section */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-gray-600">{item.description}</p>
                  )}
                  {item.email && (
                    <p className="text-sm text-gray-600">Email: {item.email}</p>
                  )}
                  {item.department && (
                    <p className="text-sm text-gray-600">
                      Department: {item.department}
                    </p>
                  )}
                  {item.role && (
                    <p className="text-sm text-gray-600">Role: {item.role}</p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ListView;
