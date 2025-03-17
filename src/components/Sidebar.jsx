import { Link, useLocation } from "react-router-dom";
import "../css/sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const urlPath = location.pathname;

  return (
    <section className="col-md-2 p-0">
      <div style={{ backgroundColor: "#6947e2" }}>
        <p className="fs-4 m-0 py-2 text-center text-light">Anvaya</p>
      </div>

      {urlPath === "/" || urlPath === "/dashboard" ? (
        <div className="d-flex flex-column p-2">
          <Link className="sidebar-links" to="/leads">
            | Leads
          </Link>

          <Link className="sidebar-links" to="/agents">
            | Agents
          </Link>
          <Link className="sidebar-links" to="/reports">
            | Reports
          </Link>
        </div>
      ) : (
        <div className="p-2">
          <small>
            <Link
              to="/dashboard"
              style={{ textDecoration: "none" }}
            >{`< Back to Dashboard`}</Link>
          </small>
        </div>
      )}
    </section>
  );
};

export default Sidebar;
