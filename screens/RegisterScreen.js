import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { signUp, emailVerification } from "../services/userSignUp";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import Spinner from "../components/spinner";
import BackButtonRed from "../components/backButtonRed";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const user = await signUp(email, password, name);
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
        alert("Signup error. Please try again");
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView className="bg-stone-900 flex-1 justify-center">
      <BackButtonRed />

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
            style={styles.input}
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
            style={styles.input}
            autoCapitalize="words"
            placeholderTextColor="white"
            autoCompleteType="name"
            keyboardType="name-phone-pad"
            placeholder="Name"
            value={name}
            onChangeText={setName}
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
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Icon.Eye width={30} height={30} stroke={themeColors.bgColor(1)} />
          </TouchableOpacity>
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
            secureTextEntry={!passwordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Icon.Eye width={30} height={30} stroke={themeColors.bgColor(1)} />
          </TouchableOpacity>
        </View>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      </View>

      <View className="absolute bottom-72 w-full">
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

const styles = StyleSheet.create({
  input: {
    color: "#fff",
    height: 30,
    width: "80%",
    paddingRight: 10,
  },
  error: {
    color: themeColors.text,
    marginTop: 12,
    textAlign: "center",
  },
});
