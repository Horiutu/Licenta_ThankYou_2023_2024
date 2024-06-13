import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { themeColors } from "../theme";

export default function PayNowButton() {
  return (
    <TouchableOpacity
      className="rounded-full"
      style={{ backgroundColor: themeColors.bgColor(1) }}
    >
      <View className=" items-center p-2">
        <Text className="ml-2 text-white font-bold">Pay Now</Text>
      </View>
    </TouchableOpacity>
  );
}
