import { View, Image, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";

export default function MostVisitedRestaurantCard() {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Restaurant")}>
      <View className="mb-2 mx-4 bg-white rounded-2xl shadow-lg py-3 flex-row">
        <Text
          className="font-bold text-xl ml-3"
          style={{ color: themeColors.text }}
        >
          #1
        </Text>
        <Text className="font-bold text-xl ml-3">Sushi Haven</Text>
        <Text className="font-bold text-xl ml-16"> 1,087</Text>
        <Text className="ml-1 mt-2">visits</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
