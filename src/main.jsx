import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Dashboard from "./components/Dashboard";
import AddLeadForm from "./components/AddLeadForm";
import LeadDetails from "./components/LeadDetails";
import Leads from "./components/Leads";
import Agents from "./components/Agents";
import AgentDetails from "./components/AgentDetails";
import Reports from "./components/Reports";
import Profile from "./components/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/leads",
    element: <Leads />,
  },
  {
    path: "/agents",
    element: <Agents />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
  {
    path: "/add-new-lead",
    element: <AddLeadForm />,
  },
  {
    path: "/leads/:leadId",
    element: <LeadDetails />,
  },
  {
    path: "/agent-details",
    element: <AgentDetails />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
