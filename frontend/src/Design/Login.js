import React, { useState } from "react";
import SuprAdmin from "./SuprAdmin";
import Design from "./Design";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userName === "user" && password === "user") {
      setMessage(2);
    } else if (userName === "superAdmin" && password === "superAdmin") {
      setMessage(1);
    } else {
      setMessage(0);
      setPassword("");
      setUserName("");
    }
  };

  return (
    <div>
      {message === 0 && (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="text-center">Login</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="userName">User Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter user name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      Login
                    </button>
                  </form>
                </div>
                <div className="card-footer text-center">
                  <small>&copy; 2024 Your Company</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {message === 1 && <SuprAdmin />}
      {message === 2 && <Design />}
    </div>
  );
}
