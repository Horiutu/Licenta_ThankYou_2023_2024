import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { FIREBASE_AUTH } from "../services/config";
import BackButtonWhite from "../components/backButtonWhite";
import BackButtonRed from "../components/backButtonRed";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter an email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      Alert.alert("Success", "Password reset email sent!");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="bg-stone-900 flex-1 justify-center">
      <BackButtonRed />
      <View className="items-center">
        <Text className="font-bold ml-3 text-white text-2xl">
          Forgot your password?
        </Text>
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
            style={{
              color: "#fff",
              height: 30,
              width: "80%",
              paddingRight: 10,
            }}
            placeholder="Enter your email"
            placeholderTextColor="#fff"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          className="items-center mt-6"
          onPress={handlePasswordReset}
        >
          <Text
            style={{ color: themeColors.text }}
            className="font-semi text-2xl mt-2"
          >
            Reset Password
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
