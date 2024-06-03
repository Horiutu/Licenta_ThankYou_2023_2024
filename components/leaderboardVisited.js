import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { themeColors } from "../theme";
import MostVisitedRestaurantCard from "./mostVisitedRestaurantCard";
import { useNavigation } from "@react-navigation/native";
import { child, get, getDatabase, ref } from "firebase/database";
export default function LeaderBoardMostVisited() {
  const navigation = useNavigation();
  const [Toprestaurants, setTopRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dbRef = ref(getDatabase());
    let top3 = [];
    get(child(dbRef, `restaurants`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const restaurantsArr = [];
          const data = snapshot.val();
          try {
            Object.keys(data).forEach((key) => restaurantsArr.push(data[key]));
            console.log(restaurantsArr);
            restaurantsArr.sort(
              (a, b) =>
                b.statistics.number_of_visits - a.statistics.number_of_visits
            );
            top3 = restaurantsArr.slice(0, 4);
          } catch (error) {
            console.error(error);
          }
          setTopRestaurants(top3);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center px-4">
        <View className="ml-0.5">
          <Text className="font-bold text-lg text-2xl">Leaderboard</Text>
          <Text className="text-gray-500 text-xs">
            Most Visited Restaurants
          </Text>
        </View>
        <TouchableOpacity
          className="mr-0.5"
          onPress={() => navigation.navigate("LeaderboardAll")}
        >
          <Text style={{ color: themeColors.text }} className="font-semibold">
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <View className="">
        <FlatList
          className="pt-2"
          vertical
          showsHorizontalScrollIndicator={false}
          data={Toprestaurants}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <MostVisitedRestaurantCard item={item} index={index} />
          )}
        ></FlatList>
      </View>
    </View>
  );
}
