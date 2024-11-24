import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Outlet, Navigate } from "react-router-dom";
import api from "./utils/api";

const Super = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRouteAccess = async () => {
      try {
        setLoading(true);
        const response = await fetch(api().getAccess, {
          method: "POST",
          body: JSON.stringify({ token: localStorage.getItem("passToken") }),
          headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.message);
        }

        if (result?.status) {
          setIsAuth(true);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false); // ensure loading is false regardless of success or error
      }
    };

    getRouteAccess();
  }, []); // added dependency array to avoid infinite loops

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (isAuth) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Super;
