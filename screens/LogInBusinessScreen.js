import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LoginSVG } from "../assets/images/login.svg";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { isUserAuthenticated, login, logout } from "../services/userSignIn";
import { emailVerification } from "../services/utils";

export default function LogInBusinessScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessCode, setBusinessCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);

  useEffect(() => {
    isUserAuthenticated()
      .then((isLoggedIn) => setIsUserLogged(isLoggedIn))
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }, [isUserLogged, loading]);

  useEffect(() => {
    isUserAuthenticated()
      .then((isLoggedIn) => setIsUserLogged(isLoggedIn))
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }, [isUserLogged, loading]);

  const handleLogin = async () => {
    try {
      const user = await login(email, businessCode, password);
      if (user) {
        if (!user.emailVerified) {
          alert(
            "Please verify the account by clicking on the link received on email."
          );
          await emailVerification();
          await logout();
        }
      }
      setLoading(!loading);
    } catch (err) {
      setLoading(false);
      if (
        err.code === "auth/user-not-found" &&
        err.code === "auth/wrong-password"
      ) {
        alert("Invalid email or password. Please try again.");
      } else if (err.code === "auth/too-many-requests") {
        alert(
          "Too many unsuccessful request login attempts. Please try again later!"
        );
      } else {
        alert("Sign-in error: " + err.message);
      }
    }
  };

  return (
    <SafeAreaView className="bg-stone-900 flex-1 justify-center">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute w-16 ml-3 items-center top-14 left-3 bg-white p-1 rounded-full"
      >
        <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
      </TouchableOpacity>

      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        className="ml-2"
      >
        <Text className="font-bold ml-3 text-white text-4xl"> Log In</Text>
        <Text className="font-thin text-white text-4xl"> Business</Text>
      </View>

      <View className="px-25 ml-3">
        <View className="flex-row ml-4 mr-7 border-neutral-300 p-1 mt-6 border-b-2 pb-2 ">
          <Icon.Mail
            className="mr-3"
            width={30}
            height={30}
            stroke={themeColors.bgColor(1)}
          />
          <TextInput
            style={{ color: "white" }}
            placeholderTextColor="white"
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View className="flex-row ml-4 mr-7 border-neutral-300 p-1 mt-6 border-b-2 pb-2 ">
          <Icon.Key
            className="mr-3"
            width={30}
            height={30}
            stroke={themeColors.bgColor(1)}
          />
          <TextInput
            style={{ color: "white" }}
            placeholderTextColor="white"
            autoCapitalize="none"
            placeholder="Business Code"
            value={businessCode}
            onChangeText={setBusinessCode}
          />
        </View>

        <View className="flex-row ml-4 mr-7 border-neutral-300 p-1 mt-6 border-b-2 pb-2 ">
          <Icon.Lock
            className="mr-3"
            width={30}
            height={30}
            stroke={themeColors.bgColor(1)}
          />
          <TextInput
            style={{
              color: "white",
              width: "80%",
              flex: 1,
              paddingVertical: 0,
            }}
            placeholderTextColor="white"
            placeholder="Business Password"
            secureTextEntry={true}
          />
          <TouchableOpacity>
            <Text
              style={{ color: themeColors.text }}
              className="font-semibold mt-2"
            >
              Forgot?
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="absolute bottom-48 w-full z-50">
        <TouchableOpacity
          style={{ backgroundColor: themeColors.bgColor(1) }}
          onPress={handleLogin}
          className="flex-row justify-center items-center mx-7 rounded-r-lg rounded-l-lg py-3"
        >
          <View>
            <Text className="flex-1 text-center font-extrabold text-white text-lg">
              Log In
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
