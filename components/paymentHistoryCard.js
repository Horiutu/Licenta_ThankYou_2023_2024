import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export default function PaymentHistoryCard() {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Restaurant")}>
      <View className="mx-6 my-2 py-4 bg-white rounded-2xl shadow-lg flex-row">
        <Icon.FileText
          className="ml-5 absolute bottom-4"
          strokeWidth={3}
          stroke={themeColors.bgColor(1)}
        />
        <Text className="ml-14 text-lg font-bold">18.04.2024</Text>

        <Text className="ml-20 text-lg">8110,99 </Text>

        <Text className="text-lg">lei</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
