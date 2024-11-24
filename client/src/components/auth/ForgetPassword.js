import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import BackToLogin from "../ui/BackToLogin";
import { MdOutlineAttachEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import LoadingButton from "../ui/LoadingButton";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const emailChanger = (e) => {
    setEmail(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(api().forgetPassword, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      setLoading(false);
      if (response.ok && result?.status) {
        toast.success(result?.message || "OTP sent successfully!");
        localStorage.setItem("passToken", result?.token);
        localStorage.setItem('email',email)
        console.log(result);
        navigate("/otp/verify"); // Navigate to OTP verification page
      } else {
        throw new Error(result?.message || "Something went wrong");
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
            <MdOutlineAttachEmail />
            <p className="auth-heading">Forgot your password?</p>
            <p className="auth-title">
              Enter your registered email, and we'll send a 6-digit OTP
            </p>
          </div>
          <div className="auth-item">
            <label>Email *</label>
            <Input
              required
              onChange={emailChanger}
              placeholder="Enter your email"
              type="email"
              value={email}
            />
          </div>
          <div className="auth-action">
            <Button>
              
              <LoadingButton loading={loading} title="Send OTP" />
            </Button>
          </div>
          <BackToLogin />
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
