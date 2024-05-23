import { TouchableOpacity } from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function CartButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Cart")}
      className="absolute w-24 ml-3 items-center top-14 right-6 py-1 rounded-full shadow-2xl"
      style={{ backgroundColor: themeColors.bgColor(1) }}
    >
      <Icon.ShoppingCart strokeWidth={2} stroke="white" />
    </TouchableOpacity>
  );
}
