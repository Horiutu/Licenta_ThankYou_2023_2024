import { View, Image, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export default function CreditCard() {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Restaurant")}>
      <View className="mr-6 ml-6 mb-4 py-4 bg-white rounded-2xl shadow flex-row">
        <Icon.CreditCard
          className="ml-5"
          strokeWidth={3}
          stroke={themeColors.bgColor(1)}
        />
        <Text className="ml-4 text-sm font-bold">**** **** **** 4541</Text>
        <TouchableOpacity className="ml-28">
          <Icon.Trash strokeWidth={3} stroke={themeColors.bgColor(1)} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
