import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Link, useNavigate } from "react-router-dom"; // Ensure useNavigate is used for redirection
import { IoIosLogIn } from "react-icons/io";
import api from "../utils/api";
import toast from "react-hot-toast";
import LoadingButton from "../ui/LoadingButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate for redirection
  const [loading, setLoading] = useState(false);
  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(api().loginUser, {
        // Ensure api().loginUser returns a valid endpoint
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      setLoading(false);
      if (!response.ok) {
        throw new Error(result?.message || "Something went wrong");
      }

      if (result?.status) {
        toast.success(result?.message || "Login successful!");
        console.log(result);
        localStorage.setItem("accessToken", result?.token);
        navigate("/dashboard"); // Redirect to dashboard or any page after successful login
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <div className="auth-main">
      <form onSubmit={submitHandler}>
        <div className="auth-container">
          <div className="auth-header">
            <IoIosLogIn />
            <p className="auth-heading">Welcome back</p>
            <p className="auth-title">Login to continue</p>
          </div>
          <div className="auth-item">
            <label>Email *</label>
            <Input
              onChange={emailChange}
              type="email"
              required
              placeholder="Enter email"
            />
          </div>
          <div className="auth-item">
            <label>Password *</label>
            <Input
              onChange={passwordChange}
              type="password"
              required
              placeholder="Enter password"
            />
          </div>
          <div className="auth-action">
            <Button>
              <LoadingButton loading={loading} title="Login" />
            </Button>
          </div>
          <div className="auth-options">
            <Link to="/register">Create new account?</Link>
            <Link to="/forget/password">Forgot password?</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
