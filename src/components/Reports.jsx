import { useState, useEffect } from "react";
import { fetchAllLeads, fetchSalesAgents } from "../API/api.fetch";
import {
  Chart as ChartJS,
  Legend,
  Title,
  Tooltip,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  Legend,
  Tooltip,
  Title,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
);

const pieChartOptions = {
  plugins: { legend: { position: "bottom" } },
};

const closedLeadsBarChartOptions = {
  plugins: { legend: { position: "bottom" } },
};

const leadsStatusBarChartOptions = {
  responsive: true,
  plugins: {
    title: { display: true, text: "Leads by Status" },
    legend: { position: "bottom" },
  },
};

const Reports = () => {
  const [salesAgents, setSalesAgents] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const allStatus = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Closed",
  ];

  const totalClosedLead = leads.filter(
    (lead) => lead.status === "Closed"
  ).length;
  const totalLeadInPipeline = leads.filter(
    (lead) => lead.status !== "Closed"
  ).length;

  const leadsClosedAndInPipelineByAgents = (stage) => {
    const allClosedAndInPipelineLeads = salesAgents.map((agent) => {
      const totalLeads = leads.filter((lead) => {
        if (stage === "Closed") {
          return (
            lead.salesAgent.name === agent.name && lead.status === "Closed"
          );
        } else {
          return (
            lead.salesAgent.name === agent.name && lead.status !== "Closed"
          );
        }
      });
      return totalLeads.length;
    });

    return allClosedAndInPipelineLeads;
  };

  const calculateTotalStatusLead = () => {
    return allStatus.map((status) => {
      return leads.filter((lead) => lead.status === status).length;
    });
  };

  const totalClosedAndInPipelineData = {
    labels: ["Closed", "Pipeline"],
    datasets: [
      {
        label: "Leads",
        data: [totalClosedLead, totalLeadInPipeline],
        backgroundColor: ["red", "green"],
      },
    ],
  };

  const closedLeadsByAgentData = {
    labels: salesAgents.map((agent) => agent.name),
    datasets: [
      {
        label: "Closed",
        data: leadsClosedAndInPipelineByAgents("Closed"),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Pipeline",
        data: leadsClosedAndInPipelineByAgents("Pipeline"),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const leadsStatusData = {
    labels: allStatus,
    datasets: [
      {
        label: "Status",
        data: calculateTotalStatusLead(),
        backgroundColor: "rgba(216, 185, 136, 1)",
      },
    ],
  };

  useEffect(() => {
    const fetchLeadsAsync = async () => {
      try {
        setLoading(true);
        const allLeads = await fetchAllLeads();
        const allAgents = await fetchSalesAgents();
        if (allLeads.length > 0) {
          setLeads(allLeads);
        }
        if (allAgents.length > 0) {
          setSalesAgents(allAgents);
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
      <h5>Report Overview</h5>
      <hr />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!error && !loading && leads && salesAgents && (
        <div>
          <div>
            <h6>Total Leads closed and in Pipeline: </h6>
            <div style={{ width: "300px", margin: "auto" }}>
              <Pie
                data={totalClosedAndInPipelineData}
                options={pieChartOptions}
                width={300}
                height={300}
              />
            </div>
            <hr />
          </div>

          <div>
            <h6>Leads closed by Sales Agent:</h6>
            <div style={{ width: "500px", margin: "auto" }}>
              <Bar
                data={closedLeadsByAgentData}
                options={closedLeadsBarChartOptions}
              />
            </div>
            <hr />
          </div>

          <div>
            <h6>Lead Status Distribution:</h6>
            <div style={{ width: "500px", margin: "auto" }}>
              <Bar
                data={leadsStatusData}
                options={leadsStatusBarChartOptions}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
