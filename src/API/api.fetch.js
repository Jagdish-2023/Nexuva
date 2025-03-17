import axios from "axios";

//GET
export async function fetchSalesAgents() {
  try {
    const response = await axios.get("https://nexuva-be.vercel.app/agents");

    return response.data;
  } catch (error) {
    if (error.status === 404) {
      throw new Error("Error: Sales Agents not found.");
    }
    console.error("Error: ", error);
  }
}

export async function fetchAllLeads(queryParams) {
  try {
    const response = await axios.get("https://nexuva-be.vercel.app/leads", {
      params: queryParams,
    });

    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    if (error.status === 404) {
      throw new Error("Error: Leads not found");
    }
  }
}

export async function fetchLeadDetails(leadId) {
  try {
    const response = await axios.get(
      `https://nexuva-be.vercel.app/leads/${leadId}`
    );
    return response.data;
  } catch (error) {
    if (error.status === 404) {
      throw new Error("Lead not found");
    }
    console.error("Error: ", error.message);
  }
}

//POST
export async function addNewLead(newLead) {
  try {
    const response = await axios.post(
      "https://nexuva-be.vercel.app/leads",
      newLead
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error: ", error);
  }
}

export async function updateLead({ leadId, leadToUpdate }) {
  try {
    const response = await axios.post(
      `https://nexuva-be.vercel.app/leads/${leadId}`,
      leadToUpdate
    );
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
  }
}

export async function addNewComment({ leadId, commentData }) {
  try {
    const response = await axios.post(
      `https://nexuva-be.vercel.app/leads/${leadId}/comments`,
      commentData
    );
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.error("Error ", error);
  }
}

export async function addNewAgent(newAgentData) {
  try {
    const response = await axios.post(
      "https://nexuva-be.vercel.app/agents",
      newAgentData
    );

    return response.data;
  } catch (error) {
    if (error.status === 409) {
      throw new Error(error.response.data.error);
    }

    console.error("Error: ", error);
  }
}
