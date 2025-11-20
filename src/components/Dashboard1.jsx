import React, { useEffect, useState } from "react";
import { Drawer, IconButton, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  People as PeopleIcon,
  Business as BusinessIcon,
  Folder as FolderIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";

import Cookie from "js-cookie";

// Import admin components
import Employees from "./admin/Employees";
import Departments from "./admin/Departments";
import Projects from "./admin/Projects";

// Import user components
import MyProjects from "./user/MyProjects";
import MyDetails from "./user/MyDetails";
import MyDepartment from "./user/MyDepartment";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const deriveRoleLabel = (rawRole) => {
  if (!rawRole) return "User";
  const normalized = rawRole.toString().trim().toLowerCase();

  if (
    normalized === "admin" ||
    normalized === "administrator" ||
    normalized === "superadmin"
  ) {
    return "Admin";
  }

  if (
    normalized === "hr" ||
    normalized === "human_resources" ||
    normalized === "human resources"
  ) {
    return "HR";
  }

  return "User";
};

const Dashboard1 = () => {
   
  const navigate = useNavigate();  
  const [role, setRole] = useState("Admin");
  const [active, setActive] = useState("myprojects");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const cacheRole = (resolvedRole) => {
      if (!resolvedRole || typeof window === "undefined") return;
      try {
        localStorage.setItem("userRole", resolvedRole);
      } catch (error) {
        console.warn("Unable to persist role in localStorage", error);
      }
    };

    const applyRole = (incomingRole) => {
      if (!incomingRole) return;
      const derived = deriveRoleLabel(incomingRole);
      setRole(derived);
      cacheRole(derived);
    };

    try {
      if (typeof window !== "undefined") {
        const storedRole = localStorage.getItem("userRole");
        if (storedRole) {
          applyRole(storedRole);
          return;
        }
      }
    } catch (error) {
      console.warn("Unable to access localStorage", error);
    }

    try {
      const token = Cookies.get("token");
      if (token) {
        const decoded = jwtDecode(token);
        const possibleRole =
          decoded?.role ??
          decoded?.userRole ??
          decoded?.data?.role ??
          decoded?.user?.role;
        if (possibleRole) {
          applyRole(possibleRole);
        }
      }
    } catch (error) {
      console.error("Failed to derive role from token", error);
    }
  }, []);

  const isAdminView = role === "Admin" || role === "HR";

  useEffect(() => {
    setActive(isAdminView ? "employees" : "myprojects");
  }, [isAdminView]);

  // Sample user data - replace with actual user data from context/API
  const userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: role,
    avatar: null, // You can add avatar URL here
  };

  const commonUserMenu = [
    { key: "myprojects", label: "My Projects", icon: <FolderIcon /> },
    { key: "mydetails", label: "My Details", icon: <PersonIcon /> },
    { key: "mydepartment", label: "My Department", icon: <BusinessIcon /> },
  ];

  const adminMenu = [
    { key: "employees", label: "All Employees", icon: <PeopleIcon /> },
    { key: "departments", label: "Departments", icon: <BusinessIcon /> },
    { key: "projects", label: "Projects", icon: <FolderIcon /> },
    { key: "profile", label: "Profile", icon: <PersonIcon /> },
  ];

  const menu = isAdminView ? adminMenu : commonUserMenu;

  const handleMenuClick = (key) => {
    setActive(key);
    setOpen(false); // Close drawer on mobile when item is selected
  };

  const handleLogout = () => {
    alert("Logout clicked");
    Cookie.remove('token');
    navigate("/");
  };

  const MenuItem = ({ item, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
        isActive
          ? "bg-blue-600 text-white shadow-md"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <span className={`mr-3 ${isActive ? "text-white" : "text-gray-500"}`}>
        {item.icon}
      </span>
      <span className="font-medium">{item.label}</span>
    </button>
  );

  const SidebarContent = () => (
    <div className="w-64 h-full bg-white shadow-lg flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <DashboardIcon className="text-blue-600 mr-2" fontSize="large" />
          <h2 className="text-xl font-bold text-gray-900">HRMS Dashboard</h2>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 p-4 overflow-y-auto">
        {menu.map((item) => (
          <MenuItem
            key={item.key}
            item={item}
            isActive={active === item.key}
            onClick={() => handleMenuClick(item.key)}
          />
        ))}
      </div>

      {/* Profile Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
          <Avatar
            className="bg-blue-600 mr-3"
            src={userProfile.avatar}
            alt={userProfile.name}
          >
            {userProfile.name.charAt(0)}
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {userProfile.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {userProfile.email}
            </p>
            <p className="text-xs text-blue-600 font-medium">
              {userProfile.role}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200 font-medium"
        >
          <LogoutIcon className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <IconButton
          onClick={() => setOpen(true)}
          className="bg-white shadow-lg hover:bg-gray-50"
        >
          <MenuIcon />
        </IconButton>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <SidebarContent />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 256,
          },
        }}
      >
        <div className="relative h-full">
          {/* Close Button for Mobile */}
          <IconButton
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 z-10"
            sx={{ display: { md: "none" } }}
          >
            <CloseIcon />
          </IconButton>
          <SidebarContent />
        </div>
      </Drawer>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        <div className="mt-12 md:mt-0">
          {/* Admin Views */}
          {active === "employees" && <Employees />}
          {active === "departments" && <Departments />}
          {active === "projects" && <Projects />}

          {/* User Views */}
          {active === "myprojects" && <MyProjects />}
          {active === "mydetails" && <MyDetails />}
          {active === "mydepartment" && <MyDepartment />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard1;
