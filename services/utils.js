import { sendEmailVerification } from "firebase/auth";
import { FIREBASE_AUTH } from "../services/config";

export const emailVerification = async () => {
  try {
    await sendEmailVerification(FIREBASE_AUTH.currentUser);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Email verification error: ", errorCode, errorMessage);
    throw error;
  }
};
