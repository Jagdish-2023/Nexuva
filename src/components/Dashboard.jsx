import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchAllLeads } from "../API/api.fetch";
import "../css/dashboard.css";

const Dashboard = () => {
  const naviagte = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchLeadsAsync();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {leads.length > 0 && !error && (
        <div>
          <section>
            <h5>Leads:</h5>

            <ol>
              {leads.map((lead) => (
                <li key={lead._id}>{lead.name}</li>
              ))}
            </ol>
          </section>
          <hr />

          <section>
            <h5>Lead Status:</h5>
            <div>
              <div>
                <p>
                  New: {leads.filter((lead) => lead.status === "New").length}{" "}
                  Leads
                </p>
              </div>
              <div>
                <p>
                  Contacted:{" "}
                  {leads.filter((lead) => lead.status === "Contacted").length}{" "}
                  Leads
                </p>
              </div>
              <div>
                <p>
                  Qualified:{" "}
                  {leads.filter((lead) => lead.status === "Qualified").length}{" "}
                  Leads
                </p>
              </div>
            </div>

            <div className="mt-2">
              <p>
                <strong>Quick Filters: </strong>
                {
                  <Link
                    className="react-Links-dashboard ms-3"
                    to={"/lead-status?status=New"}
                  >
                    New
                  </Link>
                }
                {
                  <Link
                    className="react-Links-dashboard ms-3"
                    to={"/lead-status?status=Contacted"}
                  >
                    Contacted
                  </Link>
                }
                {
                  <Link
                    className="react-Links-dashboard ms-3"
                    to={"/lead-status?status=Closed"}
                  >
                    Closed
                  </Link>
                }
              </p>
            </div>
          </section>

          <hr />

          <section>
            <button
              className="btn btn-warning"
              onClick={() => naviagte("/add-new-lead")}
            >
              Add new Lead
            </button>
          </section>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
