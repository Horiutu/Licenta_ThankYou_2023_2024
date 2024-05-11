import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import MostVisitedRestaurantCard from "./mostVisitedRestaurantCard";
import { useNavigation } from "@react-navigation/native";

export default function LeaderBoardMostVisited() {
  const navigation = useNavigation();
  return (
    <View className="">
      <View className="flex-row justify-between items-center px-4">
        <View>
          <Text className="font-bold text-lg text-2xl">Leaderboard</Text>
          <Text className="text-gray-500 text-xs">
            Most Visited Restaurants
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("LeaderboardAll")}>
          <Text style={{ color: themeColors.text }} className="font-semibold">
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <View
        vertical
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 2,
        }}
        className="overflow-visible py-5"
      >
        <MostVisitedRestaurantCard />
        <MostVisitedRestaurantCard />
        <MostVisitedRestaurantCard />
      </View>
    </View>
  );
}
