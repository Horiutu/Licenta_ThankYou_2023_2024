import {
  View,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { TouchableOpacity } from "react-native";

export default function MenuHome() {
  const navigation = useNavigation();
  return (
    <View
      className="bg-white items-center"
      style={{
        borderBottomColor: themeColors.bgColor(1),
        borderBottomWidth: 2,
      }}
    >
      <Text className="font-bold text-4xl mt-4">Menu</Text>
      <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300 mx-6 mt-2">
        <Icon.Search height="15" width="15" stroke="black" />
        <TextInput
          placeholder="Search in Papa Johns "
          className="ml-2 flex-1"
        />
      </View>
    </View>
  );
}
