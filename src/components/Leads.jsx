import "../css/lead.css";
import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { fetchAllLeads } from "../API/api.fetch";
import Sidebar from "./Sidebar";
import "../App.css";

const Leads = () => {
  const storageToken = localStorage.getItem("nexuvaToken");
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
    if (!value) {
      window.location.href = "/leads";
    }
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

  useEffect(() => {
    if (!storageToken) {
      navigate("/");
    } else {
      fetchLeadsAsync();
    }
  }, [searchParams, storageToken]);
  return (
    <>
      {storageToken && (
        <>
          <Sidebar />
          <main className="px-5 py-3 main-container">
            <div>
              <h3>Leads Overview</h3>
              <hr />
              {error && <p>{error}</p>}
              {loading && <p>Loading......</p>}

              {leads.length > 0 && (
                <div className="mt-4">
                  {!error && (
                    <>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-1">
                          <div className="d-flex align-items-center">
                            <p className="m-0">Filters:</p>
                          </div>
                          <div>
                            <select
                              id="agentFilter"
                              className="form-select"
                              onChange={(e) =>
                                handleFilter("salesAgent", e.target.value)
                              }
                              value={selectedAgent}
                            >
                              <option value="">Sales Agent</option>
                              <option value="John Doe">John Doe</option>
                              <option value="Bob Johnson">Bob Johnson</option>
                              <option value="Alice Smith">Alice Smith</option>
                              <option value="Loice Lane">Loice Lane</option>
                            </select>
                          </div>
                          <div>
                            <select
                              id="statusFilter"
                              className="form-select"
                              onChange={(e) =>
                                handleFilter("status", e.target.value)
                              }
                              value={selectedStatus}
                            >
                              <option value="">Status</option>
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                            </select>
                          </div>
                          <div>
                            <select
                              id="sortFilter"
                              className="form-select"
                              onChange={handleSortFilter}
                            >
                              <option value="">Sort by</option>
                              <option value="Priority">Priority</option>
                              <option value="Time to Close">
                                Time to close
                              </option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <button
                            className="btn btn-warning"
                            onClick={() => navigate("/add-new-lead")}
                          >
                            New Lead
                          </button>
                        </div>
                      </div>

                      <div className="row mt-3">
                        {leads.map((lead) => (
                          <div key={lead._id} className="col-md-4 mb-4">
                            <div className="card">
                              <div className="card-header d-flex justify-content-between align-items-center">
                                <h5>{lead.name}</h5>
                                <p
                                  className={`${
                                    lead.status === "Closed"
                                      ? "text-success"
                                      : "text-warning"
                                  }`}
                                >
                                  {lead.status}
                                </p>
                              </div>
                              <div className="card-body">
                                <p className="card-text">
                                  <strong>Sales Agent: </strong>
                                  {lead.salesAgent.name}
                                </p>
                                <p className="card-text">
                                  <strong>Priority: </strong>
                                  {lead.priority}
                                </p>
                                <p className="card-text">
                                  <strong>Time to close: </strong>
                                  {lead.timeToClose} days
                                </p>

                                <Link to={`/leads/${lead._id}`}>See More</Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default Leads;
