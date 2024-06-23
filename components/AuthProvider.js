import React, { useState, useEffect, createContext } from "react";
import { initializeApp, getApps } from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../services/config";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "./spinner";

if (getApps().length < 1) {
  initializeApp(firebaseConfig);
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("user");
      if (!user) {
        setIsLoading(false);
      }
      const parsedUser = JSON.parse(user);

      setCurrentUser(parsedUser);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
