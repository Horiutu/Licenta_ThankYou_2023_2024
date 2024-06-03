import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export default function NotificationCard() {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Restaurant")}>
      <View
        style={{ shadowColor: "#dc143c" }}
        className="mt-2 items-center mr-6 ml-6 mb-2 py-4 bg-white shadow-sm rounded-2xl flex-row"
      >
        <Icon.Bell
          className="ml-5"
          strokeWidth={3}
          stroke={themeColors.bgColor(1)}
        />
        <Text className="ml-4 text-sm font-bold">Reservation confirmed!</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
