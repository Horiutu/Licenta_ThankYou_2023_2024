import { View, TouchableOpacity } from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function FAB({ linkTo }) {
  const navigation = useNavigation();
  return (
    <View className="absolute bottom-10 right-3 z-1">
      <TouchableOpacity
        onPress={() => navigation.navigate(linkTo)}
        style={{
          backgroundColor: themeColors.bgColor(1),
          shadowColor: "rgba(0, 0, 0, 1)",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
        className="ml-3 p-5 rounded-full items-center justify-center shadow-lg"
      >
        <Icon.ShoppingCart className="mr-1" strokeWidth={3} stroke="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}
