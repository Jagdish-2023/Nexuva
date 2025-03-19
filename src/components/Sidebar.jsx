import { Link, NavLink, useLocation } from "react-router-dom";
import "../css/sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const urlPath = location.pathname;

  return (
    <section className="col-md-2 p-0 section-bg-color">
      <div className="sidebar-title-bg">
        <p className="fs-4 m-0 py-2 text-center text-light">Anvaya</p>
      </div>

      {urlPath === "/" || urlPath === "/dashboard" ? (
        <div className="d-flex flex-column p-3">
          <NavLink className="nav-link" to="/leads">
            | Leads
          </NavLink>

          <NavLink className="nav-link" to="/agents">
            | Agents
          </NavLink>
          <NavLink className="nav-link" to="/reports">
            | Reports
          </NavLink>
        </div>
      ) : (
        <div className="p-2">
          <small>
            <Link
              className="dashboard-back-link p-3"
              to="/dashboard"
            >{`< Back to Dashboard`}</Link>
          </small>
        </div>
      )}
    </section>
  );
};

export default Sidebar;
