import { View, Image, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";

export default function ReservationCard() {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Restaurant")}>
      <View className="mr-6 ml-6 bg-white rounded-3xl shadow-lg">
        <Image
          className="rounded-t-3xl"
          source={require("../assets/images/Restaurant2.webp")}
          style={{
            resizeMode: "cover",
            height: 150,
            width: 345,
          }}
        />
        <View className="px-3 pb-4 space-y-2">
          <View className="flex-row items-center">
            <Text className="text-2xl font-bold pt-2">Top View London</Text>
          </View>
          <View className="absolute bottom-2 right-4 flex-row">
            <Text className="pl-8 text-lg pt-2">02.03</Text>
            <Text className="pl-2 font-bold text-lg pt-2">18:00</Text>
          </View>
          <View className="flex-row items-center space-x-1">
            <Image
              source={require("../assets/images/fullStar.png")}
              className="h-4 w-4"
            />
            <Text className="text-xs">
              <Text className="text-gray"></Text>
              <Text className="text-gray-700"> (reviews)</Text> ·{" "}
              <Text className="font-semibold text-gray-700"></Text>
            </Text>
          </View>
          <View className="flex-row items-center space-x-1">
            <Icon.MapPin color="gray" width={15} height={15} />
            <Text className="text-gray-700 text-xs"> Nearby · </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
