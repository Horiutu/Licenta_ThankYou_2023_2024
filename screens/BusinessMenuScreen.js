import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import FoodMenu from "../components/foodMenu";

export default function BusinessMenuScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-stone-900 flex-1">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute w-24 ml-3 items-center top-14 left-3 bg-white py-1 rounded-full"
      >
        <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
      </TouchableOpacity>

      <View className="absolute top-28">
        <Text
          style={{ fontSize: 44, color: themeColors.text }}
          className="font-bold ml-6 text-white pb-8"
        >
          Menu
        </Text>
      </View>

      <ScrollView className="top-36">
        <FoodMenu />
        <FoodMenu />
        <FoodMenu />
        <FoodMenu />
        <FoodMenu />
        <FoodMenu />
        <FoodMenu />
        <FoodMenu />
        <FoodMenu />
        <FoodMenu />
        <FoodMenu />
        <FoodMenu />
        <FoodMenu />
        <FoodMenu />
        <FoodMenu />
      </ScrollView>
    </SafeAreaView>
  );
}
