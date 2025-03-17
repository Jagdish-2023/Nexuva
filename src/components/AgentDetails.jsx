import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchAllLeads } from "../API/api.fetch";
import "../css/agentDetails.css";

const AgentDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [agentLeads, setAgentLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const queryparams = Object.fromEntries(searchParams.entries());

  const [selectedStatus, setSelectedStatus] = useState(
    queryparams.status || ""
  );
  const [selectedPriority, setSelectedPriority] = useState(
    queryparams.priority || ""
  );

  const handleStatusSelect = (e) => {
    const status = e.target.value;

    if (status === "") {
      return;
    }

    setSearchParams({ salesAgent: queryparams.salesAgent, status });
    setSelectedStatus(status);
    setSelectedPriority("");
  };
  const handlePrioritySelect = (e) => {
    const priority = e.target.value;

    if (priority === "") {
      return;
    }

    setSearchParams({ salesAgent: queryparams.salesAgent, priority });
    setSelectedPriority(priority);
    setSelectedStatus("");
  };

  const handleSortFilter = (e) => {
    const isChecked = e.target.checked;

    const sortedLeads = [...agentLeads].sort((a, b) =>
      isChecked ? a.timeToClose - b.timeToClose : b.timeToClose - a.timeToClose
    );

    setAgentLeads(sortedLeads);
  };

  useEffect(() => {
    const fetchLeadsAsync = async () => {
      try {
        setLoading(true);
        const leads = await fetchAllLeads(queryparams);
        if (leads.length > 0) {
          setAgentLeads(leads);
        }

        setError(null);
      } catch (error) {
        setError(error.message || "Failed to fetc Leads");
      } finally {
        setLoading(false);
      }
    };

    fetchLeadsAsync();
  }, [searchParams]);

  return (
    <div>
      <h5>Lead list by Agent</h5>
      <hr />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {agentLeads && (
        <div>
          <p>Sales Agent: {queryparams.salesAgent}</p>

          <div>
            {!error && agentLeads && (
              <ol>
                {agentLeads.length > 0 &&
                  agentLeads.map((lead) => (
                    <li key={lead._id}>
                      {lead.name} - {lead.status} - {lead.priority} -{" "}
                      {lead.timeToClose} days to close
                    </li>
                  ))}
              </ol>
            )}
          </div>

          <div>
            <p>Filters: </p>
            <select
              className="form-select form-select-filter"
              onChange={handleStatusSelect}
              value={selectedStatus}
            >
              <option value="">Select Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </select>

            <span className="mx-2">Or</span>

            <select
              className="form-select form-select-filter"
              onChange={handlePrioritySelect}
              value={selectedPriority}
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="mt-3">
            <span>Sort by: </span>
            <label>
              <input type="checkbox" onChange={handleSortFilter} /> Time to
              close
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentDetails;
