import { useEffect, useState } from "react";
import { fetchAllLeads, fetchSalesAgents } from "../API/api.fetch";
import { useSearchParams } from "react-router-dom";
import "../css/leadStatus.css";

const LeadStatus = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [leadsByStatus, setLeadsByStatus] = useState([]);
  const [salesAgents, setSalesAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const queryParams = Object.fromEntries(searchParams.entries());

  const [leadsStatus, setLeadsStatus] = useState(queryParams.status || "");
  const [selectedAgent, setSelectedAgent] = useState(
    queryParams.salesAgent || ""
  );
  const [selectedPriority, setSelectedPriority] = useState(
    queryParams.priority || ""
  );

  const handleStatusSelect = (e) => {
    setLeadsStatus(e.target.value);
    setSelectedAgent("");
    setSelectedPriority("");
    setSearchParams({ status: e.target.value });
  };

  const handleAgentSelect = (e) => {
    const agent = e.target.value;
    if (agent === "") {
      return;
    }
    setSelectedAgent(agent);
    setSelectedPriority("");

    setSearchParams({ status: queryParams.status, salesAgent: agent });
  };

  const handlePrioritySelect = (e) => {
    const priority = e.target.value;
    if (priority === "") {
      return;
    }

    setSelectedPriority(priority);
    setSelectedAgent("");

    setSearchParams({ status: queryParams.status, priority });
  };

  const handleSortFilter = (e) => {
    const isChecked = e.target.checked;

    const sortedLeads = [...leadsByStatus].sort((a, b) =>
      isChecked ? a.timeToClose - b.timeToClose : b.timeToClose - a.timeToClose
    );

    setLeadsByStatus(sortedLeads);
  };

  useEffect(() => {
    const fetchLeadsByStatusAsync = async () => {
      try {
        setLoading(true);
        const statusLeads = await fetchAllLeads(queryParams);
        if (statusLeads.length > 0) {
          setLeadsByStatus(statusLeads);
          setError(null);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchAgentsAsync = async () => {
      try {
        const agents = await fetchSalesAgents();
        if (agents.length > 0) {
          setSalesAgents(agents);
        }
      } catch (error) {
        setError(error.message || "Failed to fetch Agents");
      }
    };

    if (salesAgents.length < 1) {
      fetchAgentsAsync();
    }

    fetchLeadsByStatusAsync();
  }, [searchParams]);
  return (
    <div>
      <h5>Lead list by status</h5>
      <hr />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {leadsByStatus && (
        <div>
          <div>
            <label htmlFor="leadsStatus">Status: </label>
            <select
              id="leadsStatus"
              onChange={handleStatusSelect}
              value={leadsStatus}
              className="form-select lead-status-form-select ms-2"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {!error && (
            <div className="mt-3">
              <ol>
                {leadsByStatus.map((lead) => (
                  <li key={lead._id}>
                    {lead.name} - {lead.salesAgent.name} - {lead.priority} -{" "}
                    {lead.timeToClose} days to close
                  </li>
                ))}
              </ol>

              <div>
                <p>Filters: </p>
                <select
                  className="form-select lead-status-form-select"
                  onChange={handleAgentSelect}
                  value={selectedAgent}
                >
                  <option value="">Select Agent</option>
                  {salesAgents.length > 0 &&
                    salesAgents.map((agent) => (
                      <option key={agent._id} value={agent.name}>
                        {agent.name}
                      </option>
                    ))}
                </select>

                <span className="mx-2">Or</span>

                <select
                  className="form-select lead-status-form-select"
                  onChange={handlePrioritySelect}
                  value={selectedPriority}
                >
                  <option value="">Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="mt-4 d-flex align-items-center">
                <span>Sort by: </span>

                <label htmlFor="sortByTimeToClose">
                  <input
                    type="checkbox"
                    id="sortByTimeToClose"
                    className="ms-2"
                    onChange={handleSortFilter}
                  />{" "}
                  Time to close
                </label>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LeadStatus;
