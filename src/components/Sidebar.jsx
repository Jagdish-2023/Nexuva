import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import "../css/sidebar.css";

export const handleLogout = () => {
  localStorage.removeItem("nexuvaToken");
  window.location.href = "/";
};

const Sidebar = () => {
  const location = useLocation();
  const urlPath = location.pathname;
  const navigate = useNavigate();

  return (
    <>
      <div
        className="position-fixed p-0 section-bg-color d-none d-md-block vh-100"
        style={{ width: "250px" }}
      >
        <div className="sidebar-title-bg">
          <p className="fs-4 m-0 py-2 text-center text-light">Nexuva</p>
        </div>

        {urlPath === "/" || urlPath === "/dashboard" ? (
          <div className="navbar-nav flex-column p-3 align-items-center gap-1">
            <NavLink className="nav-link" to="/leads">
              Leads
            </NavLink>

            <NavLink className="nav-link" to="/agents">
              Agents
            </NavLink>
            <NavLink className="nav-link" to="/reports">
              Reports
            </NavLink>
            <NavLink className="nav-link" to="/profile">
              Setting
            </NavLink>

            <div className="mt-3">
              <span
                onClick={handleLogout}
                className="text-danger"
                style={{ cursor: "pointer" }}
              >
                Logout
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-4 text-center">
            <p>
              <Link
                className="dashboard-back-link p-3"
                to="/dashboard"
              >{`< Back to Dashboard`}</Link>
            </p>
          </div>
        )}
      </div>

      <nav className="navbar d-md-none" style={{ backgroundColor: "#edf0ff" }}>
        <div className="container-fluid">
          <NavLink className="navbar-brand">Nexuva</NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSidebar"
            aria-controls="offcanvasSidebar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start d-md-none"
        id="offcanvasSidebar"
        // tabIndex="-1"
        aria-labelledby="offcanvasSidebarLabel"
        style={{ width: "300px" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasSidebarLabel">
            Nexuva
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <nav className="navbar-nav flex-column">
            <NavLink
              onClick={() => navigate("/leads")}
              data-bs-dismiss="offcanvas"
              className={`nav-link ${
                urlPath === "/leads" && "nav-link-active"
              }`}
            >
              Leads
            </NavLink>
            <NavLink
              onClick={() => navigate("/agents")}
              data-bs-dismiss="offcanvas"
              className={`nav-link ${
                urlPath === "/agents" && "nav-link-active"
              }`}
            >
              Agents
            </NavLink>
            <NavLink
              onClick={() => navigate("/reports")}
              data-bs-dismiss="offcanvas"
              className={`nav-link ${
                urlPath === "/reports" && "nav-link-active"
              }`}
            >
              Reports
            </NavLink>
            <NavLink
              onClick={() => navigate("/profile")}
              data-bs-dismiss="offcanvas"
              className={`nav-link ${
                urlPath === "/profile" && "nav-link-active"
              }`}
            >
              Setting
            </NavLink>

            <div className="mt-3">
              <span
                className="text-danger"
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                Logout
              </span>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
