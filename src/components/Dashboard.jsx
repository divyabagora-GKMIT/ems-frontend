import React, { useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CreateUser from "./CreateUser";
import AddDepartment from "./AddDepartment";
import AddProject from "./AddProject";
import ModelWrapper from "./ModelWrapper";
import Employees from "./Employees";
import AllDepartments from "./AllDepartments";
import AllProjects from "./AllProjects";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import ProfileData from "./ProfileData";
import MyProjects from "./MyProjects";
import MyDepartments from "./MyDepartments";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = Cookie.get("token");
  const decodeToken = jwtDecode(token);
  console.log(decodeToken);
  let role = "";
  if (decodeToken.role != 1) {
    role = "User";
  } else {
    role = "Admin";
  }

  const isAdmin = role === "Admin" || role === "HR";

  const [active, setActive] = useState(
    role === "User" ? "myprojects" : "employees"
  );

  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => setRefresh((prev) => !prev);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editData, setEditData] = useState(null);

  const commonUserMenu = [
    { key: "myprojects", label: "My Projects" },
    { key: "mydepartment", label: "My Department" },
    { key: "profile", label: "Profile" },
  ];

  const adminMenu = [
    { key: "employees", label: "All Employees" },
    { key: "departments", label: "Departments" },
    { key: "projects", label: "Projects" },
    { key: "profile", label: "Profile" }, 
  ];

  const menu = role === "User" ? commonUserMenu : adminMenu;

  const handleLogout = () => {
    Cookie.remove("token");
    navigate("/");
  };


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* MOBILE MENU BUTTON */}
      <div className="md:hidden p-2 fixed top-2 left-2 z-50">
        <IconButton onClick={() => setOpen(true)}>
          <MenuIcon />
        </IconButton>
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:flex w-64 bg-white shadow-md p-4 flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-4">EMS Dashboard</h2>

          {menu.map((item) => (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`text-left p-2 rounded mb-1 w-full hover:bg-blue-100 ${
                active === item.key ? "bg-blue-200" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <div className="w-64 p-4 bg-white min-h-full flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-4">EMS Dashboard</h2>

            {menu.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setActive(item.key);
                  setOpen(false);
                }}
                className={`text-left p-2 rounded mb-1 w-full hover:bg-blue-100 ${
                  active === item.key ? "bg-blue-200" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleLogout}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </Drawer>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 p-6 mt-10 md:mt-0">
        {/* ================== ADMIN / HR VIEWS ================== */}

        {active === "employees" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold">Employees</h1>

              {isAdmin && (
                <button
                  onClick={() => {
                    setEditData(null);
                    setModalType("user");
                    setModalOpen(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  + Add User
                </button>
              )}
            </div>

            <Employees
              refresh={refresh}
              onEdit={(employee) => {
                setEditData(employee);
                setModalType("user");
                setModalOpen(true);
              }}
            />
          </div>
        )}

        {active === "departments" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold">Departments</h1>

              {isAdmin && (
                <button
                  onClick={() => {
                    setEditData(null);
                    setModalType("department");
                    setModalOpen(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  + Add Department
                </button>
              )}
            </div>

            <AllDepartments 
              refresh={refresh} 
              onEdit={(department) => {
                setEditData(department);
                setModalType("department");
                setModalOpen(true);
              }}
            />
          </div>
        )}

        {active === "projects" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold">Projects</h1>

              {isAdmin && (
                <button
                  onClick={() => {
                    setEditData(null);
                    setModalType("project");
                    setModalOpen(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  + Add Project
                </button>
              )}
            </div>

            <AllProjects 
              refresh={refresh}
              onEdit={(project) => {
                setEditData(project);
                setModalType("project");
                setModalOpen(true);
              }}
            />
          </div>
        )}

        {active === "profile" && (
          <div>
            <h1 className="text-xl font-semibold mb-2">Profile</h1>
            <ProfileData user={decodeToken}  />
          </div>
        )}

        {/* ================== USER VIEWS ================== */}

        {active === "mydepartment" && (
          <div>
            <h1 className="text-xl font-semibold mb-2">My Department</h1>
            <MyDepartments/>
          </div>
        )}

        {active === "myprojects" && (
          <div>
            <h1 className="text-xl font-semibold mb-2">My Projects</h1>
            <MyProjects/>
          </div>
        )}

        {/* {active === "profile" && (
          <div>
            <h1 className="text-xl font-semibold mb-2">My Profile</h1>
            <p>Your project list here…</p>
          </div>
        )} */}
      </div>

      {/* ================== MODAL ================== */}
      <ModelWrapper open={modalOpen} onClose={() => {
        setModalOpen(false);
        setEditData(null);
      }}>
        {modalType === "user" && (
          <CreateUser
            onClose={() => {
              setModalOpen(false);
              setEditData(null);
            }}
            handleRefresh={handleRefresh}
            initialData={editData}
          />
        )}
        {modalType === "department" && (
          <AddDepartment
            onClose={() => {
              setModalOpen(false);
              setEditData(null);
            }}
            handleRefresh={handleRefresh}
            initialData={editData}
          />
        )}
        {modalType === "project" && (
          <AddProject
            onClose={() => {
              setModalOpen(false);
              setEditData(null);
            }}
            handleRefresh={handleRefresh}
            initialData={editData}
          />
        )}
      </ModelWrapper>
    </div>
  );
};

export default Dashboard;
