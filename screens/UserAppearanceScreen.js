import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import BackButtonBlack from "../components/backButtonBlack";
import NotificationCard from "../components/notificationCard";

export default function UserAppearanceScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-white flex-1 justify-center">
      <BackButtonBlack />

      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        className="mt-14"
      >
        <Text
          style={{ fontSize: 44, color: themeColors.text }}
          className="font-bold ml-3 text-white"
        >
          {" "}
          Notifications
        </Text>
        <Icon.Bell
          className="ml-2"
          height={40}
          width={30}
          strokeWidth={3}
          stroke={themeColors.bgColor(1)}
        />
      </View>
      <ScrollView className="mt-4">
        <NotificationCard />
      </ScrollView>
    </SafeAreaView>
  );
}
