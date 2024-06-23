import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function ItemBusinessCard({ item }) {
  const navigation = useNavigation();

  return (
    <View>
      <View
        style={{ borderWidth: 2, borderColor: themeColors.bgColor(1) }}
        className="mt-2 items-center mr-6 ml-6 mb-1 py-4 bg-stone-800 rounded-2xl shadow flex-row"
      >
        <View style={{ flexDirection: "row" }}>
          <Text className="ml-4 text-lg text-white font-bold">Item</Text>
          <Text
            style={{ color: themeColors.text }}
            className="ml-2 text-lg text-white font-bold"
          >
            Item #{item.id}
          </Text>
        </View>
        <View className="flex-row absolute right-4">
          <Text
            style={{ color: themeColors.text2 }}
            className="ml-4 text-lg text-white font-bold"
          ></Text>
        </View>
        <View className="flex-row absolute right-20">
          <Text
            style={{ color: themeColors.text }}
            className="text-lg text-white font-bold"
          ></Text>
        </View>
      </View>
    </View>
  );
}
