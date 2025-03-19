import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const urlPath = location.pathname;

  function showPageHeaderName() {
    if (urlPath === "/" || urlPath === "/dashboard") return "Nexuva Dashboard";
    if (urlPath === "/add-new-lead") return "Add new Lead";
    if (urlPath === "/leads") return "Lead List";
    if (urlPath === "/agents") return "Sales Agent Management";
    if (urlPath === "/lead-status") return "Leads by Status";
    if (urlPath === "/agent-details") return "Leads by Sales Agent";
    if (urlPath === "/reports") return "Nexuva CRM Reports";
    if (urlPath.startsWith("/leads/")) return "Lead Management";
  }
  return (
    <header className="py-3" style={{ backgroundColor: "#6947e2" }}>
      <h1 className="text-center text-light">{showPageHeaderName()}</h1>
    </header>
  );
};

export default Header;
