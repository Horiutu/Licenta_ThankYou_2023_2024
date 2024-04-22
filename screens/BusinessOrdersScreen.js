import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import withAuthRedirect from "../navigation/withAuthRedirect";

export default function BusinessOrdersScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-stone-900 flex-1 justify-center">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute w-24 ml-3 items-center top-14 left-3 bg-white py-1 rounded-full"
      >
        <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
      </TouchableOpacity>

      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        className="absolute top-28"
      >
        <Text
          style={{ fontSize: 44, color: themeColors.text }}
          className="font-bold ml-3 text-white"
        >
          {" "}
          Orders
        </Text>
      </View>
    </SafeAreaView>
  );
}
