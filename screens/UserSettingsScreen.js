import {
  View,
  Text,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import BackButtonBlack from "../components/backButtonBlack";

export default function UserSettingsScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-white flex-1 justify-center">
      <BackButtonBlack />

      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        className="absolute top-28"
      >
        <Text
          style={{ fontSize: 44, color: themeColors.text }}
          className="font-bold ml-3 text-white"
        >
          {" "}
          Settings
        </Text>
      </View>
    </SafeAreaView>
  );
}
