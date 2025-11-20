import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Employees = ({ refresh, onEdit }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiCall = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users");
        setData(response.data.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    apiCall();
  }, [refresh]);

  const onDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/users/${id}`
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete employee."
      );
    }
  };

  return (
    <div className="p-4 w-full md:max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">All Employees</h2>

      <div className="space-y-3">
        {data.length === 0 ? (
          <p className="text-gray-500">No employees found.</p>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              className="
                bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition
                flex flex-col md:flex-row md:items-center md:justify-between
                gap-3
              "
            >
              {/* LEFT SECTION */}
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800">
                  {item.name}
                </h3>

                {item.email && (
                  <p className="text-sm text-gray-600">Email: {item.email}</p>
                )}

                {item.designation && (
                  <p className="text-sm text-gray-600">
                    Designation: {item.designation}
                  </p>
                )}

                {item.role_name && (
                  <p className="text-sm text-gray-600">
                    Role: {item.role_name}
                  </p>
                )}
              </div>

              {/* RIGHT BUTTONS */}
              <div className="flex flex-wrap md:flex-nowrap gap-2">
                <button
                  onClick={() => onEdit && onEdit(item)}
                  className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 w-full md:w-auto"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 w-full md:w-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Employees;
