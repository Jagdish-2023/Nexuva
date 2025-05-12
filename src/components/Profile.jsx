import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProfileAsync } from "../API/api.fetch";
import { handleLogout } from "./Sidebar";

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
        <div className="row mx-0" style={{ height: "100vh" }}>
          <Sidebar />
          <section className="col-md-10 px-5 py-3">
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
          </section>
        </div>
      )}
    </div>
  );
};

export default Profile;
