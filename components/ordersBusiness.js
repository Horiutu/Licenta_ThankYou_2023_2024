import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export default function OrderBusinessCard() {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("OrderDetails")}
    >
      <View
        style={{ borderWidth: 2, borderColor: themeColors.bgColor(1) }}
        className="mt-2 items-center mr-6 ml-6 mb-1 py-4 bg-stone-800 rounded-2xl shadow flex-row"
      >
        <Icon.Bell
          className="ml-5"
          strokeWidth={3}
          stroke={themeColors.bgColor(1)}
        />
        <View style={{ flexDirection: "row" }}>
          <Text className="ml-4 text-lg text-white font-bold">Order</Text>
          <Text
            style={{ color: themeColors.text }}
            className="ml-2 text-lg text-white font-bold"
          >
            #1002
          </Text>
          <Text className="ml-2 text-lg text-white font-bold">T14</Text>
          <Text
            style={{ color: themeColors.text }}
            className="ml-12 text-lg text-white font-bold"
          >
            00:00{" "}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
