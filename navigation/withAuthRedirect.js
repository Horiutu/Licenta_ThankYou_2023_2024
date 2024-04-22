import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { isUserAuthenticated } from "../services/userSignIn";

const withAuthRedirect = (WrappedComponent) => {
  const AuthRedirect = (props) => {
    const navigation = useNavigation();

    useEffect(() => {
      isUserAuthenticated()
        .then((isAuthenticated) => {
          if (!isAuthenticated) {
            navigation.navigate("Login"); // Navigate to your login screen
          }
        })
        .catch((err) => {
          console.error(err);
          throw err;
        });
    }, []);
    return <WrappedComponent {...props} />;
  };

  return AuthRedirect;
};

export default withAuthRedirect;
