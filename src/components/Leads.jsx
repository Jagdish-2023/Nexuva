import "../css/lead.css";
import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { fetchAllLeads } from "../API/api.fetch";

const Leads = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  const [selectedAgent, setSelectedAgent] = useState(
    queryParams.salesAgent || ""
  );
  const [selectedStatus, setSelectedStatus] = useState(
    queryParams.status || ""
  );

  const handleFilter = (key, value) => {
    setSearchParams({ [key]: value });

    if (key === "salesAgent") {
      setSelectedAgent(value);
      setSelectedStatus("");
    } else {
      setSelectedStatus(value);
      setSelectedAgent("");
    }
  };

  const handleSortFilter = (e) => {
    const sortValue = e.target.value;

    const priorityOrderInNum = { High: 2, Medium: 1, Low: 0 };
    let sortedLeads = [];

    if (sortValue === "") return;

    if (sortValue === "Priority") {
      sortedLeads = [...leads].sort(
        (a, b) =>
          priorityOrderInNum[b.priority] - priorityOrderInNum[a.priority]
      );
      setLeads(sortedLeads);
    } else {
      sortedLeads = [...leads].sort((a, b) => a.timeToClose - b.timeToClose);
      setLeads(sortedLeads);
    }
  };

  useEffect(() => {
    const fetchLeadsAsync = async () => {
      try {
        const allLeads = await fetchAllLeads(queryParams);

        if (allLeads.length > 0) {
          setLeads(allLeads);
          setError(null);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeadsAsync();
  }, [searchParams]);
  return (
    <div>
      <h5>Lead Overview</h5>
      <hr />
      {error && <p>{error}</p>}
      {loading && <p>Loading......</p>}

      {leads.length > 0 && (
        <div>
          {!error && (
            <ol>
              {leads.map((lead) => (
                <li key={lead._id}>
                  <Link to={`/leads/${lead._id}`} className="react-Links">
                    {lead.name} - {lead.status} - {lead.salesAgent.name} -{" "}
                    {lead.timeToClose} days to close
                  </Link>
                </li>
              ))}
            </ol>
          )}

          <div className="mt-5">
            <h6>Filters:</h6>
            <div className="row flex-column gap-2">
              <div className="d-flex align-items-center col-md-3">
                <div className="me-2">
                  <label htmlFor="agentFilter" className="formLabel">
                    Filter by Sales Agent:{" "}
                  </label>
                </div>
                <select
                  id="agentFilter"
                  className="form-select"
                  onChange={(e) => handleFilter("salesAgent", e.target.value)}
                  value={selectedAgent}
                >
                  <option value="">Select</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Bob Johnson">Bob Johnson</option>
                  <option value="Alice Smith">Alice Smith</option>
                  <option value="Loice Lane">Loice Lane</option>
                </select>
              </div>

              <div className="d-flex align-items-center col-md-3">
                <div className="me-2">
                  <label htmlFor="statusFilter" className="formLabel">
                    Filter by Status:{" "}
                  </label>
                </div>
                <select
                  id="statusFilter"
                  className="form-select"
                  onChange={(e) => handleFilter("status", e.target.value)}
                  value={selectedStatus}
                >
                  <option value="">Select</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                </select>
              </div>

              {/* <div className="d-flex align-items-center col-md-3">
                <div className="me-2">
                  <label htmlFor="tagsFilter" className="formLabel">
                    Filter by tags:{" "}
                  </label>
                </div>
                <select
                  id="tagsFilter"
                  className="form-select"
                  onChange={(e) => handleFilter("tags", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="High Value">High Value</option>
                  <option value="Follow-up">Follow-up</option>
                </select>
              </div>

              <div className="d-flex align-items-center col-md-3">
                <div className="me-2">
                  <label htmlFor="sourceFilter" className="formLabel">
                    Filter by Source:{" "}
                  </label>
                </div>
                <select
                  id="sourceFilter"
                  className="form-select"
                  onChange={(e) => handleFilter("source", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                </select>
              </div> */}

              <div className="d-flex align-items-center col-md-3">
                <div className="me-2">
                  <label htmlFor="sortFilter" className="formLabel">
                    Sort by:{" "}
                  </label>
                </div>
                <select
                  id="sortFilter"
                  className="form-select"
                  onChange={handleSortFilter}
                >
                  <option value="">Select</option>
                  <option value="Priority">Priority</option>
                  <option value="Time to Close">Time to close</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <button
              className="btn btn-warning"
              onClick={() => navigate("/add-new-lead")}
            >
              Create a new Lead
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
