import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProfileAsync } from "../API/api.fetch";
import { handleLogout } from "./Sidebar";
import "../App.css";

const Profile = () => {
  const storageToken = localStorage.getItem("nexuvaToken");
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProfileData = async () => {
    setLoading(true);
    try {
      const profileData = await fetchProfileAsync();
      if (profileData) {
        setData(profileData);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!storageToken) {
      navigate("/");
    } else {
      getProfileData();
    }
  }, [navigate, storageToken]);
  return (
    <div>
      {storageToken && (
        <>
          <Sidebar />
          <main className="px-5 py-3 main-container">
            <h5>Your Profile</h5>
            <hr />
            <div>
              {loading && <p>Loading...</p>}
              {error && <p>Error</p>}
              {data && (
                <>
                  <div>
                    <p>
                      <strong>Name: </strong>
                      {data.name}
                    </p>
                    <p>
                      <strong>Email: </strong>
                      {data.email}
                    </p>
                  </div>

                  <div className="mt-5">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default Profile;
