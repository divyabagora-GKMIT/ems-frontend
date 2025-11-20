import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { withBaseUrl } from "../config/apiConfig";

const MyDepartments = ({ refresh }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = Cookies.get("token");
    const decodedToken = jwtDecode(token);
    const id = decodedToken.id;

    const apiCall = async () => {
      try {
        const response = await axios.get(
          withBaseUrl(`/api/department-members/departments/${id}`)
        );

        const records = response.data.data;

        if (Array.isArray(records) && records.length > 0) {
          const deptList = records.map((item) => ({
            id: item.department.id,
            name: item.department.name,
          }));

          setData(deptList);
        } else {
          setData([]);  
        }
      } catch (error) {
        console.error("API Error:", error);
        setData([]); 
      }
    };

    apiCall();
  }, [refresh]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Departments</h2>

      <div className="space-y-3">
        {data.length === 0 ? (
          <p className="text-gray-500">No Departments found.</p>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition"
            >
              {/* Left Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  {item.name}
                </h3>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyDepartments;
