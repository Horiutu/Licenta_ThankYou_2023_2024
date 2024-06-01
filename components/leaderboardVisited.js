import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { themeColors } from "../theme";
import firestore from "firebase/firestore";
import MostVisitedRestaurantCard from "./mostVisitedRestaurantCard";
import { useNavigation } from "@react-navigation/native";

export default function LeaderBoardMostVisited() {
  const navigation = useNavigation();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firestore()
          .collection("restaurants")
          .orderBy("number_of_visits", "desc")
          .get();
        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRestaurants(fetchedData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
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
      <View className="overflow-visible py-5">
        <FlatList
          vertical
          showsHorizontalScrollIndicator={false}
          data={restaurants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MostVisitedRestaurantCard item={item} />}
        />
      </View>
    </View>
  );
}
