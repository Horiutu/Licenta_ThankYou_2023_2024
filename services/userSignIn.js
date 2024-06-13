import { signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { child, get, getDatabase, ref } from "firebase/database";

export const login = async (email, password, businessCode = "") => {
  try {
    let isBusinessAccount = false;

    if (businessCode && businessCode.length > 0) {
      const dbRef = ref(getDatabase());
      const snapshot = await get(child(dbRef, `businessCodes`));

      if (snapshot.exists()) {
        const data = snapshot.val();
        const businessData = data[businessCode];

        if (!businessData) {
          throw new Error("Business Code not found");
        }

        if (!businessData.emails.includes(email)) {
          throw new Error("The current account is not part of the business");
        }

        isBusinessAccount = true;
      } else {
        console.log("No data available");
      }
    }

    await AsyncStorage.setItem(
      "isBusinessAccount",
      JSON.stringify(isBusinessAccount)
    );
    const userCredential = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    const user = userCredential.user;
    await AsyncStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (err) {
    await AsyncStorage.removeItem("isBusinessAccount");
    console.error(err);
    throw err;
  }
};

const fireBaseLogout = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem("user");
  await AsyncStorage.removeItem("isBusinessAccount");
  await fireBaseLogout();
};

export const isUserAuthenticated = async () => {
  const user = await AsyncStorage.getItem("user");
  return user && user.length > 0;
};
