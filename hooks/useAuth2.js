import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useAuth2 = () => {
  const [user, setAuth] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuth(user);
      } else {
        setAuth(null);
      }
    });
    return unsubscribe;
  }, []);

  return user;
};
