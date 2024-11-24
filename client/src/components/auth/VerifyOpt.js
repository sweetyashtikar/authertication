import React, { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import BackToLogin from "../ui/BackToLogin";
import { FaFingerprint } from "react-icons/fa";
import Timer from "./Timer";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import LoadingButton from "../ui/LoadingButton";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otpTime, setOtpTime] = useState(null);
  const [isExpire, setIsExpire] = useState(false);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);

  const inputRef = [ref1, ref2, ref3, ref4, ref5, ref6];

  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");

  const otpArray = [setOtp1, setOtp2, setOtp3, setOtp4, setOtp5, setOtp6];

  useEffect(() => {
    if (ref1.current) {
      ref1.current.focus();
    }
  }, []);

  const inputChange = (e, location) => {
    if (location < 5 && e.target.value) {
      inputRef[location + 1].current.focus();
    }
    otpArray[location](e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const finalotp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    setLoading(true); // Enable loading state when the request is made

    try {
      const response = await fetch(api().verifyOtp, {
        method: "POST",
        body: JSON.stringify({ otp: finalotp }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      setLoading(false); // Disable loading state after the response

      if (!response.ok) {
        throw new Error(result?.message);
      }

      if (result?.status) {
        setOtpTime(result?.sendTime);
        navigate("/update/pass"); // Navigate on success
      }
    } catch (error) {
      setLoading(false); // Disable loading if error occurs
      toast.error(error.message);
    }
  };

  const resendHandler = async () => {
    // Make sure resendHandler is defined here, outside of useEffect
    try {
      setLoading(true); // Set loading for resend
      const response = await fetch(api().forgetPassword, {
        method: "POST",
        body: JSON.stringify({ email: localStorage.getItem("email") }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      setLoading(false); // Disable loading after resend request

      if (!response.ok) {
        throw new Error(result?.message);
      }

      if (result?.status) {
        setOtpTime(1*60*1000); // Update OTP time after resend
        setIsExpire(false);
        localStorage.setItem('passToken',result?.token);
        toast.success("OTP resent successfully!");
      }
    } catch (error) {
      setLoading(false); // Disable loading if error occurs
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const getTime = async () => {
      try {
        const response = await fetch(api().getOtpTime, {
          method: "POST",
          body: JSON.stringify({ token: localStorage.getItem("passToken") }),
          headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.message);
        }

        if (result?.status) {
          const remainingTime =
            new Date(result?.sendTime).getTime() - new Date().getTime();

          if (remainingTime > 0) {
            setOtpTime(remainingTime);
          } else {
            setIsExpire(true);
          }
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    getTime();
  }, []);

  return (
    <div className="auth-main">
      <form onSubmit={submitHandler}>
        <div className="auth-container">
          <div className="auth-header">
            <FaFingerprint />
            <p className="auth-heading">Verify your OTP</p>
            <p className="auth-title">
              Enter the 6-digit OTP we just sent to your email
            </p>
          </div>
          <div className="auth-item">
            <label>OTP *</label>
            <div className="otp-input-container">
              <div>
                {inputRef.map((item, index) => {
                  return (
                    <input
                      required
                      key={index}
                      onChange={(e) => inputChange(e, index)}
                      ref={item}
                      onInput={(e) => {
                        if (e.target.value.length > 1) {
                          e.target.value = e.target.value.slice(0, 1);
                        }
                      }}
                      type="number"
                      className="ui-input otp-input"
                    />
                  );
                })}
              </div>
            </div>
            <div className="auth-action">
              <Button>
                <LoadingButton loading={loading} title="Verify" />
              </Button>
            </div>
            <div>
              {otpTime !== null && !isExpire ? (
                <Timer setIsExpire={setIsExpire} time={otpTime} />
              ) : (
                <span onClick={resendHandler} className="otp-resend-action">
                  Resend OTP
                </span>
              )}
            </div>
            <div className="auth-action">
              <BackToLogin />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtp;
