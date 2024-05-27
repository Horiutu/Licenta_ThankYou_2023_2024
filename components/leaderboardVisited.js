import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { themeColors } from "../theme";
import MostVisitedRestaurantCard from "./mostVisitedRestaurantCard";
import { useNavigation } from "@react-navigation/native";
import { FIRESTORE_DB } from "../services/config";

export default function LeaderBoardMostVisited({ restaurants }) {
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await FIRESTORE_DB()
        .collection("restaurants")
        .orderBy("visits", "desc")
        .get();
      const fetchedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRestaurants(fetchedData);
    };

    fetchData();
  }, []);
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
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MostVisitedRestaurantCard item={restaurant} />
          )}
        />
      </View>
    </View>
  );
}
