import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../services/config";
import { emailVerification } from "./utils";

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    await emailVerification();

    const user = userCredential.user;
    console.log("User registred:", user);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
