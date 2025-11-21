import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { withBaseUrl } from "../config/apiConfig";

const CreateUser = ({ onClose, handleRefresh, initialData }) => {
  const normalize = (value) => (value === "" ? null : value);
  const normalizeNumber = (value) =>
    value === "" ? null : parseInt(value, 10);

  const defaultFormState = {
    name: "",
    email: "",
    password: "",
    designation: "",
    phone: "",
    address: "",
    date_of_birth: "",
    gender: "",
    joining_date: "",
    role_id: "1", // Initialize with a default value (e.g., "1" for User)
  };

  const [form, setForm] = useState(defaultFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!initialData?.id;

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        password: "",
        designation: initialData.designation || "",
        phone: initialData.phone || "",
        address: initialData.address || "",
        date_of_birth: initialData.date_of_birth
          ? initialData.date_of_birth.split("T")[0]
          : "",
        gender: initialData.gender || "",
        joining_date: initialData.joining_date
          ? initialData.joining_date.split("T")[0]
          : "",
        role_id: initialData.role_id ? String(initialData.role_id) : "1",
      });
    } else {
      setForm(defaultFormState);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: normalize(form.name),
      email: normalize(form.email),
      password: normalize(form.password),
      designation: normalize(form.designation),
      phone: normalize(form.phone),
      address: normalize(form.address),
      date_of_birth: normalize(form.date_of_birth),
      gender: normalize(form.gender),
      joining_date: normalize(form.joining_date),
      role_id: normalizeNumber(form.role_id), // integer conversion
    };

    if (isEditing && !form.password) {
      delete payload.password;
    }

    try {
      let response;
      if (isEditing) {
        response = await axios.patch(
          withBaseUrl(`/api/users/${initialData.id}`),
          payload
        );
        toast.success("User updated successfully!");
      } else {
        response = await axios.post(withBaseUrl("/api/users"), payload);
        toast.success("User added successfully!");
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
      <div className="bg-white w-full max-w-2xl  rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {isEditing ? "Update User" : "Create User"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              placeholder="Name"
              className="p-2 border rounded w-full"
              onChange={handleChange}
              value={form.name}
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              placeholder="Email"
              type="email"
              className="p-2 border rounded w-full"
              onChange={handleChange}
              value={form.email}
              disabled={isSubmitting}
              required
              pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
              title="Email must include @ and end with a domain like .com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              placeholder="Password"
              type="password"
              className="p-2 border rounded w-full"
              onChange={handleChange}
              value={form.password}
              disabled={isSubmitting || isEditing}
              required={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Designation</label>
            <input
              name="designation"
              placeholder="Designation"
              className="p-2 border rounded w-full"
              onChange={handleChange}
              value={form.designation}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Phone</label>
            <input
              name="phone"
              placeholder="Phone"
              className="p-2 border rounded w-full"
              onChange={handleChange}
              value={form.phone}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Address</label>
            <input
              name="address"
              placeholder="Address"
              className="p-2 border rounded w-full"
              onChange={handleChange}
              value={form.address}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Date of Birth</label>
            <input
              name="date_of_birth"
              type="date"
              className="p-2 border rounded w-full"
              onChange={handleChange}
              value={form.date_of_birth}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Gender</label>
            <select
              name="gender"
              className="p-2 border rounded w-full"
              onChange={handleChange}
              value={form.gender}
              disabled={isSubmitting}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Joining Date</label>
            <input
              name="joining_date"
              type="date"
              className="p-2 border rounded w-full"
              onChange={handleChange}
              value={form.joining_date}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Role</label>
            <select
              name="role_id"
              className="p-2 border rounded w-full"
              onChange={handleChange}
              value={form.role_id}
              disabled={isSubmitting}
            >
              <option value="2">User</option>
              <option value="1">Admin</option>
              <option value="1">HR</option>
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end mt-2">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                ? "Update"
                : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;