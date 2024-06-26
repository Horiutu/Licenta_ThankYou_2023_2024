import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";

export default function SettingsScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-stone-900">
      <View className="bg-cyan-900 flex-1 pb-9">
        <Image
          source={require("../assets/images/Restaurant2.webp")}
          style={{
            resizeMode: "cover",
            height: 400,
            width: 600,
          }}
        />
      </View>
      <View className="mt-80 pt-2 bg-stone-900 rounded-3xl h-full">
        <View className="items-center pt-16">
          <Image
            source={require("../assets/images/checkmark.png")}
            style={{
              resizeMode: "cover",
              height: 75,
              width: 75,
            }}
          />
        </View>
        <View className="py-4 pb-14 items-center">
          <Text
            style={{ color: themeColors.text }}
            className=" font-light text-red-500 text-5xl pt-2 pr-2"
          >
            {" "}
            Settings
          </Text>
        </View>
        <View className="mx-6 py-0.5">
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={{ backgroundColor: themeColors.bgColor(1) }}
            className="bg-red-500 items-center py-3 rounded-lg"
          >
            <Text className="font-light text-white text-2xl">Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
