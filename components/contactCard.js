import { View, Image, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { TouchableOpacity } from "react-native";

export default function ContactCard() {
  const navigation = useNavigation();
  return (
    <View
      className="bg-white"
      style={{
        borderTopColor: themeColors.bgColor(1),
        borderTopWidth: 2,
        borderBottomColor: themeColors.bgColor(1),
        borderBottomWidth: 2,
      }}
    >
      <Text
        className="font-bold text-xl ml-8 mt-4"
        style={{ color: themeColors.text }}
      >
        Contact
      </Text>
      <View
        className="ml-8 mt-2"
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Icon.Phone strokeWidth={2} stroke={themeColors.bgColor(1)} />
        <Text className="font-semi text-sm ml-2">0740404040</Text>
      </View>
      <View
        className="ml-8 mt-2 mb-4"
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Icon.MapPin strokeWidth={2} stroke={themeColors.bgColor(1)} />
        <Text className="font-semi text-sm ml-2">
          Str. Peru, Timisoara, Timis
        </Text>
        <TouchableOpacity className="absolute right-6">
          <Text style={{ color: themeColors.text }} className="font-bold">
            Open on Maps
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
