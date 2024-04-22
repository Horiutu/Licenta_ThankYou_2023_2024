import { signInWithEmailAndPassword } from "firebase/auth";
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
    console.log("User signed in: ", user);
    await AsyncStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const logout = async (email, password) => {
  try {
    await AsyncStorage.removeItem("user");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getUserData = async () => await AsyncStorage.getItem("user");

export const isUserAuthenticated = async () => {
  const user = await getUserData();
  return user && user.length > 0;
};
