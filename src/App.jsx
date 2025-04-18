import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import AddLeadForm from "./components/AddLeadForm";
import LeadDetails from "./components/LeadDetails";
import Leads from "./components/Leads";
import Agents from "./components/Agents";
import LeadStatus from "./components/LeadStatus";
import AgentDetails from "./components/AgentDetails";
import Reports from "./components/Reports";

function App() {
  return (
    <Router>
      {/* <Header /> */}

      <div className="row mx-0" style={{ height: "100vh" }}>
        <Sidebar />

        <section className="col-md-10 px-5 py-3">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-new-lead" element={<AddLeadForm />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/leads/:leadId" element={<LeadDetails />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/lead-status" element={<LeadStatus />} />
            <Route path="/agent-details" element={<AgentDetails />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
