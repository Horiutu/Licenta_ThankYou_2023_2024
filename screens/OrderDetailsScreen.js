import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import BackButtonBlack from "../components/backButtonBlack";
import BackButtonWhite from "../components/backButtonWhite";
import OrderBusinessCard from "../components/ordersBusiness";
import BackButtonRed from "../components/backButtonRed";
import StatusOrder from "../components/setOrderStatus";

export default function OrderDetailsScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-stone-900 flex-1">
      <BackButtonRed />
      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        className="mt-12 mb-4"
      >
        <Text
          style={{ fontSize: 44, color: themeColors.text }}
          className="font-bold ml-3 text-white"
        >
          {" "}
          Order #1002
        </Text>
      </View>
      <StatusOrder />
      <ScrollView className="">
        <Text></Text>
      </ScrollView>
    </SafeAreaView>
  );
}
