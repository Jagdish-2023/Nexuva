import { useState } from "react";
import "../css/login.css";
import nexuva from "../images/nexuva.png";

import { useNavigate } from "react-router-dom";
import { newUserSignupAsync, signInUserAsync } from "../API/api.fetch";

const Login = ({ path }) => {
  const navigate = useNavigate();
  const storageToken = localStorage.getItem("nexuvaToken");

  const [isSignup, setIsSignup] = useState(false);
  const [isAccountCreated, setIsAccountCreated] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerNewUser = async ({ fullName, email, password }) => {
    setIsLoading(true);
    try {
      const response = await newUserSignupAsync({
        name: fullName,
        email,
        password,
      });
      if (response.status === 201) {
        setIsSignup(false);
        setIsAccountCreated(true);
        setFullName("");
        setEmail("");
        setPassword("");
        setError(null);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signInUser = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const response = await signInUserAsync({ email, password });

      if (response.status === 200 && response.data?.token) {
        setEmail("");
        setPassword("");
        localStorage.setItem("nexuvaToken", response.data.token);
        navigate(path ? path : "/dashboard");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      return alert("Please enter the correct email");
    }

    if (password.length < 6) {
      return alert("Password should caontain more than 6 characters");
    }

    if (isSignup) {
      registerNewUser({ fullName, email, password });
    } else {
      signInUser({ email, password });
    }
  };

  const handleGuestLogin = () => {
    const email = "john@example.com";
    const password = "John@123";

    signInUser({ email, password });
  };

  return (
    <>
      {!storageToken && (
        <div
          className="row justify-content-center align-items-center bg-light m-0"
          style={{ height: "100vh" }}
        >
          <div className="col-md-3 border rounded-4 bg-white p-4">
            <div>
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={nexuva}
                  alt="brand-logo"
                  className="img-fluid"
                  style={{ width: "10%" }}
                />
              </div>
              {!isAccountCreated && (
                <div>
                  {" "}
                  <p className="fs-4 text-center m-0">
                    {isSignup
                      ? "Register a new account"
                      : "Log in to your account"}
                  </p>
                  <p className="text-center" style={{ marginTop: "0.5rem" }}>
                    Please enter your details
                  </p>{" "}
                </div>
              )}
            </div>

            {!isAccountCreated && (
              <form onSubmit={handleFormSubmit}>
                {isSignup && (
                  <div className="mt-5">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="form-control"
                        onChange={(e) => setFullName(e.target.value)}
                        value={fullName}
                        required
                      />
                      <br />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />
                      <br />
                    </div>

                    <div>
                      <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                      />
                    </div>
                  </div>
                )}

                {!isSignup && (
                  <div className="d-flex flex-column gap-3 mt-4">
                    <div>
                      <label htmlFor="email">*Email</label>
                      <br />
                      <input
                        id="email"
                        type="text"
                        placeholder="Enter your Email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="password">*Password</label>
                      <br />
                      <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="d-grid gap-2 mt-3">
                  <button className="btn btn-primary">
                    {isSignup ? "Sign Up" : "Sign In"}
                  </button>

                  <div className="d-flex align-items-center text-muted">
                    <hr className="flex-grow-1" />
                    <span className="mx-2">Or</span>
                    <hr className="flex-grow-1" />
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className={`btn btn-outline-primary ${
                        isSignup ? "w-100" : "w-50"
                      }`}
                      onClick={() => {
                        setFullName("");
                        setEmail("");
                        setPassword("");
                        setIsSignup((prev) => (prev ? false : true));
                        setError(null);
                      }}
                    >
                      {isSignup ? "Sign In" : "Sign Up"}
                    </button>
                    {!isSignup && (
                      <button
                        className="btn btn-outline-primary w-50"
                        onClick={handleGuestLogin}
                      >
                        Guest Login
                      </button>
                    )}
                  </div>
                </div>
              </form>
            )}

            {isAccountCreated && (
              <div>
                <p className="text-success fs-5 text-center">
                  Account registered successfully
                </p>
                <p
                  style={{ cursor: "pointer" }}
                  className="text-center"
                  onClick={() => {
                    setIsSignup(false);
                    setIsAccountCreated(false);
                  }}
                >
                  Return to Login
                </p>
              </div>
            )}

            {error && (
              <p className="text-danger text-center mt-1 mb-0">{error}</p>
            )}

            {isLoading && (
              <p className="text-center mt-1 mb-0">
                <small>Please Wait...</small>
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
