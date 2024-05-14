import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function MostPopularRestaurantCard({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Restaurant")}>
      <View className="mb-2 mx-4 bg-white items-center rounded-2xl shadow-lg py-3 flex-row">
        <Text
          className="font-bold text-xl ml-3"
          style={{ color: themeColors.text }}
        >
          #1
        </Text>
        <Text className="font-bold text-xl ml-3">Sushi Haven</Text>
        <Text className="font-bold text-xl ml-24"> 4.2</Text>
        <Image
          source={require("../assets/images/fullStar.png")}
          className="absolute right-10 h-4 w-5"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
