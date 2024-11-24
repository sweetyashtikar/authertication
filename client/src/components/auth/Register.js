import React, { useState } from "react";
import "../auth/auth.css";
import Input from "../ui/Input";
import { FaFolderPlus } from "react-icons/fa";
import Button from "../ui/Button";
import BackToLogin from "../ui/BackToLogin";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";
import LoadingButton from "../ui/LoadingButton";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const nameChange = (e) => {
    setName(e.target.value);
  };

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
      const response = await fetch(api().registerUser, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      setLoading(false);
      if (!response.ok) {
        throw new Error(result?.message);
      }

      if (result?.status) {
        toast.success(result?.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="auth-main">
      <form onSubmit={submitHandler}>
        <div className="auth-container">
          <div className="auth-header">
            <FaFolderPlus />
            <p className="auth-heading">Welcome</p>
            <p className="auth-title">Create a new account</p>
          </div>
          <div className="auth-item">
            <label>Name *</label>
            <Input
              onChange={nameChange}
              type="text"
              required
              placeholder="Enter Your Name"
            />
          </div>
          <div className="auth-item">
            <label>Email *</label>
            <Input
              onChange={emailChange}
              type="email"
              required
              placeholder="Enter Your Email"
            />
          </div>
          <div className="auth-item">
            <label>Password *</label>
            <Input
              onChange={passwordChange}
              type="password"
              required
              placeholder="Enter Your Password"
            />
          </div>
          <div className="auth-action">
            <Button>
              <LoadingButton loading={loading} title="Register" />
            </Button>
          </div>
          <div>
            <BackToLogin />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
