import React, { useContext, useEffect } from "react";
import { AuthContext } from "../api/auth/AuthContext";
import { initializeFCM } from "../notifications/fcm"; // tu función que espera el userId

export const FCMWrapper = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user._id) {
      initializeFCM(user._id);
    }
  }, [user]);

  return null;
};
