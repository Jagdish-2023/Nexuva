import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchAllLeads } from "../API/api.fetch";
import "../css/dashboard.css";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const storageToken = localStorage.getItem("nexuvaToken");
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [statusFilter, setStatusFilter] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [statusLoading, setstatusLoading] = useState(false);

  const handleStatusFilter = async () => {
    setstatusLoading(true);
    try {
      const queryParams = statusFilter ? { status: statusFilter } : {};
      const leadsByStatus = await fetchAllLeads(queryParams);

      if (leadsByStatus.length > 0) {
        setFilteredLeads(leadsByStatus);
      }
    } catch (error) {
      setError(error.message || "Failed to fetch Leads");
    } finally {
      setstatusLoading(false);
    }
  };

  const handleLeadStatus = (status) => {
    navigate(`/leads?status=${status}`);
  };

  const handleLeadCard = (leadId) => {
    navigate(`/leads/${leadId}`);
  };

  const fetchLeadsAsync = async () => {
    try {
      setLoading(true);

      const allLeads = await fetchAllLeads();
      if (allLeads.length > 0) {
        setLeads(allLeads);
      }
    } catch (error) {
      setError(error.message || "Failed to fetch Leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!storageToken) {
      navigate("/");
    }

    if (leads.length < 1) {
      fetchLeadsAsync();
    }

    if (statusFilter) {
      handleStatusFilter();
    }
  }, [leads, statusFilter, storageToken]);

  return (
    <div>
      {storageToken && (
        <div className="row mx-0" style={{ height: "100vh" }}>
          <Sidebar />

          <section className="col-md-10 px-5 py-3">
            <div>
              {loading && <p>Loading...</p>}

              {leads.length > 0 && (
                <div>
                  <section className="py-4">
                    <h2>Leads:</h2>

                    <div className="row">
                      {leads.map((lead, index) => {
                        if (index < 3) {
                          return (
                            <div key={lead._id} className="col-md-4">
                              <div
                                className="card bg-light"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleLeadCard(lead._id)}
                              >
                                <div className="card-body">
                                  <div className="mb-3">
                                    <div className="card-staus-container">
                                      <span className="text-warning">
                                        {lead.status}
                                      </span>
                                    </div>
                                  </div>
                                  <h4 className="card-title">{lead.name}</h4>
                                  <p className="card-text">
                                    Time to vlose: {lead.timeToClose} days
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </section>

                  <section className="py-5">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h2>Lead Status:</h2>
                      </div>
                      <div>
                        <select
                          className="form-select"
                          onChange={(e) => setStatusFilter(e.target.value)}
                        >
                          <option value="">Filter Status</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Proposal Sent">Proposal Sent</option>
                        </select>
                      </div>
                    </div>

                    <div className="row mt-1">
                      {!statusFilter && (
                        <>
                          <div className="col-md-4">
                            <div
                              className="card bg-light"
                              onClick={() => handleLeadStatus("New")}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="card-body">
                                <h5 className="card-title">New</h5>
                                <p>
                                  {
                                    leads.filter(
                                      (lead) => lead.status === "New"
                                    ).length
                                  }{" "}
                                  Leads
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div
                              className="card bg-light"
                              onClick={() => handleLeadStatus("Contacted")}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="card-body">
                                <h5 className="card-title">Contacted</h5>
                                <p>
                                  {
                                    leads.filter(
                                      (lead) => lead.status === "Contacted"
                                    ).length
                                  }{" "}
                                  Leads
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div
                              className="card bg-light"
                              onClick={() => handleLeadStatus("Closed")}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="card-body">
                                <h5 className="card-title">Closed</h5>
                                <p>
                                  {
                                    leads.filter(
                                      (lead) => lead.status === "Closed"
                                    ).length
                                  }{" "}
                                  Leads
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {statusFilter && filteredLeads.length > 0 && (
                        <div className="col-md-4">
                          <div
                            className="card bg-light"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleLeadStatus(filteredLeads[0].status)
                            }
                          >
                            <div className="card-body">
                              <h5 className="card-title">
                                {filteredLeads[0].status}
                              </h5>
                              <p>{filteredLeads.length} Leads</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {statusFilter &&
                        filteredLeads.length < 1 &&
                        !statusLoading && <div>Match not found</div>}
                    </div>
                  </section>

                  <section className="py-4">
                    <button
                      className="btn btn-warning"
                      onClick={() => navigate("/add-new-lead")}
                    >
                      Add new Lead
                    </button>
                  </section>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
