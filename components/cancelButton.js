import { TouchableOpacity } from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function CancelButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      className="absolute w-24 ml-3 items-center top-14 left-3 bg-white py-1 rounded-full shadow-2xl"
    >
      <Icon.X strokeWidth={3} stroke={themeColors.bgColor(1)} />
    </TouchableOpacity>
  );
}
