import axios from "axios";

const getAuthHeaders = () => {
  const token = localStorage.getItem("nexuvaToken");

  const headers = {
    "Content-Type": "application/json",
  };

  if (!token) {
    return headers;
  }

  headers.Authorization = `Bearer ${token}`;
  return headers;
};

const removeLocalStorageToken = () => {
  localStorage.removeItem("nexuvaToken");
};

//GET
export async function fetchSalesAgents() {
  try {
    const response = await axios.get("https://nexuva-be.vercel.app/agents", {
      headers: getAuthHeaders(),
    });

    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("Sales Agents not found.");
    }
    if (error.response?.status === 401) {
      removeLocalStorageToken();
      throw new Error("Unauthorized");
    }
  }
}

export async function fetchAllLeads(queryParams) {
  try {
    const response = await axios.get("https://nexuva-be.vercel.app/leads", {
      params: queryParams,
      headers: getAuthHeaders(),
    });

    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    if (error.response?.status === 404) {
      throw new Error("Leads not found");
    }
    if (error.response?.status === 401) {
      removeLocalStorageToken();
      throw new Error("Unauthorized");
    }
  }
}

export async function fetchLeadDetails(leadId) {
  try {
    const response = await axios.get(
      `https://nexuva-be.vercel.app/leads/${leadId}`,
      {
        headers: getAuthHeaders(),
      }
    );

    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("Lead not found");
    }
    if (error.response?.status === 401) {
      removeLocalStorageToken();
      throw new Error("Unauthorized");
    }
  }
}

export async function fetchProfileAsync() {
  try {
    const response = await axios.get("https://nexuva-be.vercel.app/profile", {
      headers: getAuthHeaders(),
    });

    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("Profile not found");
    }
    if (error.response?.status === 401) {
      removeLocalStorageToken();
      throw new Error("Unauthorized");
    }
  }
}

//POST
export async function newUserSignupAsync(userData) {
  try {
    const response = await axios.post(
      "https://nexuva-be.vercel.app/auth/register",
      userData
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function signInUserAsync(logInData) {
  try {
    const response = await axios.post(
      "https://nexuva-be.vercel.app/auth/login",
      logInData
    );
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function addNewLead(newLead) {
  try {
    const response = await axios.post(
      "https://nexuva-be.vercel.app/leads",
      newLead,
      {
        headers: getAuthHeaders(),
      }
    );
  } catch (error) {
    if (error.response?.status === 401) {
      removeLocalStorageToken();
      throw new Error("Unauthorized");
    }
  }
}

export async function updateLead({ leadId, leadToUpdate }) {
  try {
    const response = await axios.post(
      `https://nexuva-be.vercel.app/leads/${leadId}`,
      leadToUpdate,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      removeLocalStorageToken();
      throw new Error("Unauthorized");
    }
  }
}

export async function addNewComment({ leadId, commentData }) {
  try {
    const response = await axios.post(
      `https://nexuva-be.vercel.app/leads/${leadId}/comments`,
      commentData,
      { headers: getAuthHeaders() }
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    if (error.response?.status === 401) {
      removeLocalStorageToken();
      throw new Error("Unauthorized");
    }
  }
}

export async function addNewAgent(newAgentData) {
  try {
    const response = await axios.post(
      "https://nexuva-be.vercel.app/agents",
      newAgentData,
      { headers: getAuthHeaders() }
    );

    return response.data;
  } catch (error) {
    if (error.response.status === 409) {
      throw new Error(error.response.data.error);
    }
    if (error.response?.status === 401) {
      removeLocalStorageToken();
      throw new Error("Unauthorized");
    }
  }
}
