import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectRoute from "./components/ProtectRoute";
import Dashboard from "./components/Dashboard";
import CreateUser from "./components/CreateUser";
import AddProject from "./components/AddProject";
import AddDepartment from "./components/AddDepartment";
import Dashboard1 from "./components/Dashboard1";
import Projects from "./components/Projects";
import { RestartAlt } from "@mui/icons-material";
import { Toaster } from "react-hot-toast";
import PublicRoute from "./components/PublicRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/addProject" element={<AddProject />} />
          <Route path="/addDepartment" element={<AddDepartment />} />
          {/* <Route path="/dashboard1" element={<Dashboard1 />}>
            <Route path="project" element={<Projects />} />
          </Route> */}
          <Route
            path="/resetPassword"
            element={
              <ProtectRoute>
                <ResetPassword />
              </ProtectRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectRoute>
                <Dashboard />
              </ProtectRoute>
            }
          />
          <Route
            path="/dashboard1"
            element={
              <ProtectRoute>
                <Dashboard1 />
              </ProtectRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
