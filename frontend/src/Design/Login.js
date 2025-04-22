import React, { useState } from "react";
import SuprAdmin from "./SuprAdmin";
import Design from "./Design";
import loginAsset from "../Asset/loginAsset.png";

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
        <div className="login-container">
          <div className="container">
            <div className="row justify-content-center align-items-center vh-100">
              <div className="col-md-6 p-5">
                <div className="card">
                  <div className="card-body px-4">
                    <form onSubmit={handleSubmit} className="p-5 pb-0">
                      <div className="login-text">
                        <h4 className="text-center">Smart Energy Meter</h4>
                        <h1 className="text-center ">System Login</h1>
                        <div className="d-flex justify-content-center mb-3 mt-5">
                          <img
                            src={loginAsset}
                            height="180px"
                            className="text-center"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control mt-1"
                          id="userName"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="Enter user name"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control mt-4"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block w-100 mt-4 custombtn"
                      >
                        Login
                      </button>
                      <p className="text-center mt-2 opacity-50">
                        {" "}
                        <small className="text-center">
                          &copy; 2025 Your Company
                        </small>
                      </p>
                    </form>
                    <div className="d-flex justify-content-center"></div>
                  </div>
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
