import { useState, useEffect } from "react";
import Select from "react-select";
import { fetchSalesAgents, addNewLead, updateLead } from "../API/api.fetch";

const AddLeadForm = ({ leadData = {} }) => {
  const { lead, updateLeadState, updateLeadDetails } = leadData;
  const [salesAgents, setSalesAgents] = useState([]);

  const tags = [
    { value: "High Value", label: "High Value" },
    { value: "Follow-up", label: "Follow-up" },
  ];
  const [selectedTags, setSelectedTags] = useState(
    lead?.tags.map((tag) => ({ value: tag, label: tag })) || []
  );
  const [leadInfo, setLeadInfo] = useState({
    leadName: lead?.name || "",
    leadSource: lead?.source || "Website",
    salesAgent: lead?.salesAgent._id || "",
    leadStatus: lead?.status || "New",
    priority: lead?.priority || "High",
    timeToClose: lead?.timeToClose || 1,
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setLeadInfo((prev) => {
      if (name === "timeToClose") {
        return { ...prev, [name]: parseInt(value) };
      }
      return { ...prev, [name]: value };
    });
  };

  const addLeadFormHandler = (e) => {
    e.preventDefault();

    const newLead = {
      name: leadInfo.leadName,
      source: leadInfo.leadSource,
      salesAgent: leadInfo.salesAgent,
      status: leadInfo.leadStatus,
      tags: selectedTags.map((tag) => tag.value),
      timeToClose: leadInfo.timeToClose,
      priority: leadInfo.priority,
    };

    if (leadData.lead) {
      const updateLeadAsync = async () => {
        const updatedLead = await updateLead({
          leadToUpdate: newLead,
          leadId: lead._id,
        });

        updateLeadDetails(updatedLead);
        updateLeadState(false);
      };
      updateLeadAsync();
    } else {
      addNewLead(newLead);
    }

    setLeadInfo({
      leadName: "",
      leadSource: "Website",
      salesAgent: "",
      leadStatus: "New",
      priority: "High",
      timeToClose: 1,
    });
    setSelectedTags([]);
  };

  useEffect(() => {
    const getSalesAgentsAsync = async () => {
      const agents = await fetchSalesAgents();
      if (agents.length > 0) {
        setSalesAgents(agents);
      }
    };

    getSalesAgentsAsync();
  }, []);

  return (
    <div>
      <h5>{!lead ? "Add a new Lead" : "Update lead"}</h5>
      <hr />
      <div className="col-md-6">
        <form
          className="d-flex flex-column gap-4"
          onSubmit={addLeadFormHandler}
        >
          <div>
            <label htmlFor="leadName">Lead name:</label>
            <br />
            <input
              id="leadName"
              name="leadName"
              type="text"
              placeholder="Enter customer or company name"
              className="form-control"
              onChange={onChangeHandler}
              value={leadInfo.leadName}
              required
            />
          </div>

          <div>
            <label htmlFor="leadSource">Lead Source:</label>
            <br />
            <select
              name="leadSource"
              id="leadSource"
              className="form-select"
              onChange={onChangeHandler}
              value={leadInfo.leadSource}
            >
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Cold Call">Cold Call</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Email">Email</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="salesAgent">Assigned Sales Agent</label>
            <br />
            <select
              name="salesAgent"
              id="salesAgent"
              onChange={onChangeHandler}
              value={leadInfo.salesAgent}
              className="form-select"
              required
            >
              <option value="" disabled>
                Select a Agent
              </option>
              {salesAgents &&
                salesAgents.map((agent) => (
                  <option value={agent._id} key={agent._id}>
                    {agent.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="leadStatus">Lead status:</label>
            <br />
            <select
              name="leadStatus"
              id="leadStatus"
              className="form-select"
              onChange={onChangeHandler}
              value={leadInfo.leadStatus}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority">Priority:</label>
            <br />
            <select
              name="priority"
              id="priority"
              className="form-select"
              onChange={onChangeHandler}
              value={leadInfo.priority}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label htmlFor="tags">Tags:</label>
            <br />
            <Select
              id="tags"
              options={tags}
              isMulti
              value={selectedTags}
              onChange={(selectedTag) => setSelectedTags(selectedTag)}
              placeholder="Search or select tags.."
              required
            />
          </div>

          <div>
            <label htmlFor="timeToClose">Time to Close(in days):</label>
            <br />
            <input
              name="timeToClose"
              id="timeToClose"
              type="number"
              className="form-control"
              onChange={onChangeHandler}
              value={leadInfo.timeToClose}
            />
          </div>

          <div>
            <button className="btn btn-warning">
              {leadData.lead ? "Update" : "Create"}
            </button>

            {leadData?.lead && (
              <button
                type="button"
                className="btn btn-danger ms-2"
                onClick={() => updateLeadState(false)}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadForm;
