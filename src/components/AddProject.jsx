import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AddProject({onClose , handleRefresh, initialData}) {
  const isEditing = !!initialData?.id;

  const [form, setForm] = useState({
    name: "",
    start_date: "",
    end_date: "",
    status: "active",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        start_date: initialData.start_date ? initialData.start_date.split('T')[0] : "",
        end_date: initialData.end_date ? initialData.end_date.split('T')[0] : "",
        status: initialData.status || "active",
      });
    } else {
      setForm({
        name: "",
        start_date: "",
        end_date: "",
        status: "active",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const payload = {
      ...form,
      start_date: form.start_date === "" ? null : form.start_date,
      end_date: form.end_date === "" ? null : form.end_date,
    };

    try {
      let response;
      if (isEditing) {
        // Update existing project
        response = await axios.patch(
          `http://localhost:8080/api/projects/${initialData.id}`,
          payload
        );
        toast.success("Project updated successfully!");
      } else {
        // Create new project
        response = await axios.post(
          "http://localhost:8080/api/projects/",
          payload
        );
        toast.success("Project added successfully!");
      }
      
      onClose();
      handleRefresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg  rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {isEditing ? "Update Project" : "Add Project"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm mb-1">Project Name</label>
            <input
              name="name"
              placeholder="Project Name"
              className="p-2 border rounded w-full"
              value={form.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Start Date</label>
            <input
              name="start_date"
              type="date"
              className="p-2 border rounded w-full"
              value={form.start_date}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">End Date</label>
            <input
              name="end_date"
              type="date"
              className="p-2 border rounded w-full"
              value={form.end_date}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Status</label>
            <select
              name="status"
              className="p-2 border rounded w-full"
              value={form.status}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="active">Active</option>
              <option value="hold">hold</option>
              <option value="Completed">Completed</option>
            </select>
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
                ? "Update Project"
                : "Add Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
