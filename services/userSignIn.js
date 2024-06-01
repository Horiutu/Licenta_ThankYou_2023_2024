import { signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    const user = userCredential.user;
    await AsyncStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const logout = async (email, password) => {
  try {
    const auth = getAuth();
    await signOut(auth);
    await AsyncStorage.removeItem("user");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const isUserAuthenticated = async () => {
  const user = await AsyncStorage.getItem("user");
  return user && user.length > 0;
};
