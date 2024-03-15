import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../services/config";

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

export const emailVerification = async () => {
  const user = FIREBASE_AUTH.currentUser;
  try {
    await sendEmailVerification(FIREBASE_AUTH.currentUser, {
      handleCodeInApp: true,
      url: "noreply@thank-you-by-ch.firebaseapp.com",
    }).then(() => showEmailAlert(user.email));
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Email verification error: ", errorCode, errorMessage);
    throw error;
  }
};
