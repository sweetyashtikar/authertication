import React from "react";
import Spinner from "./Spinner";

const LoadingButton = ({ loading, title }) => {
  return (
    <div className="auth-inner">
      <span>{loading ? "please Wait ..." : title}</span>
      {loading && <Spinner />}
    </div>
  );
};

export default LoadingButton;
