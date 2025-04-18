import { useSearchParams, Link } from "react-router-dom";
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
      <h3>Lead list by Agent</h3>
      <hr />
      {loading && agentLeads.length < 1 && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {agentLeads.length > 0 && (
        <div>
          <h5>{queryparams.salesAgent}</h5>

          <div>
            {!error && agentLeads && (
              <>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2">
                    <div className="d-flex align-items-center">
                      <p className="m-0">Filters:</p>
                    </div>
                    <div>
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
                    </div>
                    <div>
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
                  </div>

                  <div>
                    <span>Sort by: </span>
                    <label>
                      <input type="checkbox" onChange={handleSortFilter} /> Time
                      to close
                    </label>
                  </div>
                </div>

                <section className="mt-2">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Lead Name</th>
                        <th>Status</th>
                        <th>Time to close</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {agentLeads.length > 0 &&
                        agentLeads.map((lead, index) => (
                          <tr key={lead._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{lead.name}</td>
                            <td>{lead.status}</td>
                            <td>{lead.timeToClose} days</td>
                            <td>
                              <Link to={`/leads/${lead._id}`}>Details</Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </section>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentDetails;
