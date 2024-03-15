import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { LoginSVG } from "../assets/images/login.svg";
import { signUp, emailVerification } from "../services/userSignUp";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";

export default function RegisterScreen() {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("123456");
  const [fullName, setFullName] = useState("a");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const user = await signUp(email, password);
      if (user) {
        const id = user.uid;
        // await saveUserData(id, firstname, lastname);
      }
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use. Please choose a different email");
      } else if (error.code === "auth/weak-password") {
        alert("Weak password. Please choose another one");
      } else {
        alert("Signup error: " + error.message);
      }
    }
  };

  return (
    <SafeAreaView className="bg-stone-900 flex-1 justify-center">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute w-24 ml-3 items-center top-14 left-3 bg-gray-50 p-1 rounded-full"
      >
        <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
      </TouchableOpacity>

      <View className="px-25 mb-64 ml-3 ">
        <Text className="font-bold ml-3 text-white text-4xl mb-30 mt-10">
          {" "}
          Register
        </Text>

        <View className="flex-row ml-4 mr-7 border-neutral-300 p-1 mt-6 border-b-2 pb-2 ">
          <Icon.Mail
            className="mr-3"
            width={30}
            height={30}
            stroke={themeColors.bgColor(1)}
          />
          <TextInput
            style={{ color: "white" }}
            autoCapitalize="none"
            placeholderTextColor="white"
            autoCompleteType="email"
            keyboardType="email-address"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View className="flex-row ml-4 mr-7 border-neutral-300 p-1 mt-6 border-b-2 pb-2 ">
          <Icon.User
            className="mr-3"
            width={30}
            height={30}
            stroke={themeColors.bgColor(1)}
          />
          <TextInput
            style={{ color: "white" }}
            autoCapitalize="words"
            placeholderTextColor="white"
            autoCompleteType="name"
            keyboardType="name-phone-pad"
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
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
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
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
            placeholder="Confirm Password"
            secureTextEntry={true}
          />
        </View>
      </View>

      <View className="absolute bottom-56 mb-16 w-full z-50">
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="bg-white flex-row pt-8 justify-center items-center mx-7 rounded-r-lg rounded-l-lg py-3"
        >
          <Image
            source={require("../assets/images/googlepng.png")}
            style={{
              height: 24,
              width: 24,
            }}
          />
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-56 pt-10 w-full z-50">
        <TouchableOpacity
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="flex-row justify-center items-center mx-7 rounded-r-lg rounded-l-lg py-3"
          onPress={handleSignUp}
        >
          <View>
            <Text className="flex-1 text-center font-extrabold text-white text-lg">
              Register
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
