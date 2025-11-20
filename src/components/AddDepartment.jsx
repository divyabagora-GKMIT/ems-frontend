import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const DepartmentForm = ({ onClose, handleRefresh, initialData }) => {
  const isEditing = !!initialData?.id;

  const [name, setName] = useState(initialData?.name || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
    } else {
      setName(""); // Clear the form if modal is opened for adding
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let response;
      let url;
      let method;
      let successMessage;

      if (isEditing) {
        url = `http://localhost:8080/api/departments/${initialData.id}`;
        method = axios.patch;
        successMessage = "Department updated successfully!";
      } else {
        url = "http://localhost:8080/api/departments";
        method = axios.post;
        successMessage = "Department added successfully!";
      }

      response = await method(url, { name });

      toast.success(successMessage);
      onClose();
      handleRefresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Note: The min-h-screen and full-page centering likely belong to the ModelWrapper
    // For simplicity, I'm keeping your original structure.
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {isEditing ? "Update Department" : "Add Department"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="department-name" className="block text-sm mb-1">
              Department Name
            </label>
            <input
              id="department-name"
              name="name"
              placeholder="Department Name"
              className="p-2 border rounded w-full"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? isEditing
                  ? "Updating..."
                  : "Adding..."
                : isEditing
                ? "Update Department"
                : "Add Department"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentForm;
