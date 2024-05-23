import { View, Text, ScrollView, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { useState } from "react";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export default function StatusOrder() {
  const navigation = useNavigation();

  return (
    <View className="mt-2 ml-3">
      <Text
        style={{ color: themeColors.text }}
        className="ml-3 font-bold text-2xl mb-3"
      >
        Choose Status
      </Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          className="p-2 rounded-full shadow bg-stone-800 ml-3"
          style={{ borderWidth: 2, borderColor: "#FF7C00" }}
        >
          <Text style={{ color: "#FF7C00" }} className="px-2">
            Recieved
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full shadow bg-stone-800 ml-2"
          style={{ borderWidth: 2, borderColor: "#FFF301" }}
        >
          <Text style={{ color: "#FFF301" }} className="px-2">
            In Progress
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full shadow bg-stone-800 ml-2 "
          style={{ borderWidth: 2, borderColor: "#17FF00" }}
        >
          <Text style={{ color: "#17FF00" }} className="px-2">
            Completed
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
