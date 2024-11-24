import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import BackToLogin from "../ui/BackToLogin";
import { RxUpdate } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import LoadingButton from "../ui/LoadingButton";

const UpdatePassword = () => {
  const navigate = useNavigate();

const [loading, setLoading]=useState(false)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // const token = localStorage.getItem("passToken");  // Retrieve token from localStorage
    // if (!token) {
    //   toast.error("No token found. Please request a new OTP.");
    //   return;
    // }

    try {
      setLoading(true)
      const response = await fetch(api().updatedPassword, {
        method: "POST",
        body: JSON.stringify({ password, confirmPassword, token:localStorage.getItem('passToken') }),
        headers: { "Content-Type": "application/json" },
      });

      // // Check if response is JSON or something else
      // if (!response.headers.get("content-type")?.includes("application/json")) {
      //   throw new Error("Unexpected response format. Please try again.");
      // }

      const result = await response.json();
setLoading(false)
      if (!response.ok) {
        throw new Error(result?.message || "Failed to update password");
      }


      if(result?.status){
      
      toast.success(result.message);
      navigate("/");
      localStorage.removeItem("email");
      localStorage.removeItem("passToken");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="auth-main">
      <form onSubmit={submitHandler}>
        <div className="auth-container">
          <div className="auth-header">
            <RxUpdate />
            <p className="auth-heading">New Password</p>
            <p className="auth-title">Enter at least 6 characters long password</p>
          </div>
          <div className="auth-item">
            <label>Password *</label>
            <Input
              onChange={passwordChange}
              type="password"
              required
              placeholder="New password"
            />
          </div>
          <div className="auth-item">
            <label>Confirm password *</label>
            <Input
              onChange={confirmPasswordChange}
              type="password"
              required
              placeholder="Confirm password"
            />
          </div>
          <div className="auth-action">
            <Button>
            <LoadingButton loading={loading} title="Update Password" />

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

export default UpdatePassword;
