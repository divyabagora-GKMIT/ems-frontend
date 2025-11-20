import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ModelWrapper from "./ModelWrapper";
import { withBaseUrl } from "../config/apiConfig";

const AllDepartments = ({ refresh, onEdit }) => {
  const [data, setData] = useState([]);
  const [members, setMembers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMembersLoading, setIsMembersLoading] = useState(false);
  const [isMemberSubmitting, setIsMemberSubmitting] = useState(false);
  const [memberForm, setMemberForm] = useState({ userId: "" });

  // --- Data Fetching ---
  useEffect(() => {
    const apiCall = async () => {
      try {
        const response = await axios.get(withBaseUrl("/api/departments"));
        setData(response.data.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    apiCall();
  }, [refresh]);

  // --- Delete Logic ---
  const onDelete = async (id) => {
    try {
      const response = await axios.delete(
        withBaseUrl(`/api/departments/${id}`)
      );
      toast.success("Department Deleted Successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete department."
      );
      console.log(error);
    }
  };

  const fetchEmployees = async () => {
    if (employees.length > 0) return;
    try {
      const response = await axios.get(withBaseUrl("/api/users"));
      setEmployees(response.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load employees");
    }
  };

  const fetchDepartmentMembers = async (departmentId) => {
    setIsMembersLoading(true);
    try {
      const response = await axios.get(
        withBaseUrl(`/api/department-members/members/${departmentId}`)
      );
      setMembers(response.data.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to fetch department members"
      );
      setMembers([]);
    } finally {
      setIsMembersLoading(false);
    }
  };

  const openManageMembers = (department) => {
    setSelectedDepartment(department);
    setIsModalOpen(true);
    fetchEmployees();
    fetchDepartmentMembers(department.id);
  };

  const closeManageMembers = () => {
    setSelectedDepartment(null);
    setMembers([]);
    setMemberForm({ userId: "" });
    setIsModalOpen(false);
  };

  const handleAddMember = async (e) => {
    e.preventDefault();

    if (!selectedDepartment || !memberForm.userId) {
      toast.error("Select a member to add");
      return;
    }

    setIsMemberSubmitting(true);
    try {
      await axios.post(withBaseUrl("/api/department-members"), {
        department_id: selectedDepartment.id,
        user_id: memberForm.userId,
      });
      toast.success("Member added to department");
      setMemberForm({ userId: "" });
      fetchDepartmentMembers(selectedDepartment.id);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add member");
    } finally {
      setIsMemberSubmitting(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">All Departments </h2>

      <div className="space-y-3">
        {data.length === 0 ? (
          <p className="text-gray-500">No Departments found.</p>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition"
            >
              {/* Left Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  {item.name}
                </h3>
              </div>

              {/* Buttons (Right Section) */}
              <div className="flex flex-wrap gap-2 md:justify-end">
                {/* 1. New Manage Members Button */}
                <button
                  onClick={() => openManageMembers(item)}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 whitespace-nowrap w-full sm:w-auto"
                >
                  Manage Members
                </button>

                {/* 2. Edit Button (Assuming onEdit is now defined or passed) */}
                <button
                  onClick={() => onEdit && onEdit(item)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 w-full sm:w-auto"
                >
                  Edit
                </button>

                {/* 3. Delete Button */}
                <button
                  onClick={() => onDelete(item.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 w-full sm:w-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <ModelWrapper open={isModalOpen} onClose={closeManageMembers}>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Manage Members
            </h3>
            <p className="text-sm text-gray-500">
              Department: {selectedDepartment?.name}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Assigned Members</h4>
            <div className="border rounded-lg divide-y">
              {isMembersLoading ? (
                <p className="p-4 text-sm text-gray-500">Loading members...</p>
              ) : members.length === 0 ? (
                <p className="p-4 text-sm text-gray-500">
                  No members assigned yet.
                </p>
              ) : (
                members.map((member) => (
                  <div
                    key={member.id || member.user_id}
                    className="p-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-gray-800 font-medium">
                        {member.name || member.user?.name || "Unnamed"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {member.email ||
                          member.user?.email ||
                          member.user?.username ||
                          "No email"}
                      </p>
                    </div>
                    {member.role && (
                      <span className="text-xs uppercase tracking-wide bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {member.role}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleAddMember}>
            <div>
              <label className="block text-sm font-medium mb-1">
                Add Member
              </label>
              <select
                value={memberForm.userId}
                onChange={(e) =>
                  setMemberForm({ ...memberForm, userId: e.target.value })
                }
                className="w-full border rounded-lg p-2"
                disabled={isMemberSubmitting}
              >
                <option value="">Select employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name || emp.full_name} ({emp.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeManageMembers}
                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-60"
                disabled={isMemberSubmitting}
              >
                {isMemberSubmitting ? "Adding..." : "Add Member"}
              </button>
            </div>
          </form>
        </div>
      </ModelWrapper>
    </div>
  );
};

export default AllDepartments;
