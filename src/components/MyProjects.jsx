import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const MyDepartments = ({ refresh }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = Cookies.get("token");
    const decodedToken = jwtDecode(token);
    const id = decodedToken.id;

    const apiCall = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/project-members/${id}`
        );

        const records = response.data.data;

        if (Array.isArray(records) && records.length > 0) {
          const projectList = records.map((item) => ({
            id: item.project.id,
            name: item.project.name,
            role: item.project_role,
            start_at: item.start_at,
            end_at: item.end_at,
          }));

          setData(projectList);
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
      <h2 className="text-2xl font-semibold mb-4">My Projects</h2>
      <div className="space-y-3">
        {data.length === 0 ? (
          <p className="text-gray-500">No Projects found.</p>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm">{item.role}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyDepartments;
