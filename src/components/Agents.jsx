import { useEffect, useState } from "react";
import { fetchSalesAgents, addNewAgent } from "../API/api.fetch";
import { Link } from "react-router-dom";
import "../css/agents.css";

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isAddAgent, setIsAddAgent] = useState(false);
  const [agentName, setAgentName] = useState("");
  const [agentEmail, setAgentEmail] = useState("");

  const handleAgentSubmit = (e) => {
    e.preventDefault();

    const indexOfDot = agentEmail.indexOf(".");
    const indexOfAt = agentEmail.indexOf("@");

    if (indexOfAt === 0 || indexOfDot === 0) {
      return alert("Please enter a valid E-mail (e.g john@example.com)");
    }

    setIsAddAgent(false);
    setAgentName("");
    setAgentEmail("");

    const addAgentAsync = async () => {
      try {
        setLoading(true);
        const savedAgent = await addNewAgent({
          name: agentName,
          email: agentEmail,
        });
        setAgents((agents) => [...agents, savedAgent]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    addAgentAsync();
  };

  useEffect(() => {
    const fetchAgentsAsync = async () => {
      try {
        setLoading(true);
        const allAgents = await fetchSalesAgents();

        if (allAgents.length > 0) {
          setAgents(allAgents);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAgentsAsync();
  }, []);
  return (
    <div>
      <h5>{isAddAgent ? "Add new Agent" : "Sales Agent List"}</h5>
      <hr />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {agents.length > 0 && !isAddAgent && !error && (
        <div>
          <div>
            <ul>
              {agents.map((agent) => (
                <li key={agent._id}>
                  <Link
                    to={`/agent-details?salesAgent=${agent.name}`}
                    className="agents-links"
                  >
                    {agent.name} - {agent.email}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <hr />
            <button
              className="btn btn-warning"
              onClick={() => setIsAddAgent(true)}
            >
              Add a new Agent
            </button>
          </div>
        </div>
      )}

      {isAddAgent && (
        <div>
          <form onSubmit={handleAgentSubmit}>
            <div className="col-md-6">
              <label htmlFor="agentName">Agent Name: </label>
              <input
                type="text"
                id="agentName"
                className="form-control"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                required
                placeholder="Enter Agent's name"
              />
            </div>

            <div className="col-md-6 mt-2">
              <label htmlFor="agentEmail">Email Address: </label>
              <input
                type="text"
                id="agentEmail"
                className="form-control"
                value={agentEmail}
                onChange={(e) => setAgentEmail(e.target.value)}
                required
                placeholder="Enter a valid Email"
              />
            </div>

            <div className="mt-4">
              <button className="btn btn-warning">Add</button>
              <button
                type="button"
                className="btn btn-danger ms-2"
                onClick={() => setIsAddAgent(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Agents;
