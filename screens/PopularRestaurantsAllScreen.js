import { ScrollView } from "react-native";

import { themeColors } from "../theme";
import MostVisitedRestaurantCard from "../components/mostVisitedRestaurantCard";
import BackButtonBlack from "../components/backButtonBlack";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import MostPopularRestaurantCard from "../components/mostPopularRestaurantCard";
import { useNavigation } from "@react-navigation/native";
import { child, get, getDatabase, ref } from "firebase/database";

export default function PopularRestaurantsAllScreeen() {
  const navigation = useNavigation();

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `restaurants`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const restaurantsArr = [];
          const data = snapshot.val();
          try {
            Object.keys(data).forEach((key) => restaurantsArr.push(data[key]));
            console.log(restaurantsArr);
            restaurantsArr.sort(
              (a, b) => b.statistics.rating - a.statistics.rating
            );
          } catch (error) {
            console.error(error);
          }
          setRestaurants(restaurantsArr);
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
      <BackButtonBlack />

      <Text
        style={{ fontSize: 44, color: themeColors.text }}
        className="font-bold ml-6 text-white mt-24"
      >
        Popular
      </Text>

      <Text style={{ fontSize: 20 }} className="font-thin ml-6 text-black mb-6">
        Most Appreciated Restaurants
      </Text>
      <View className="">
        <FlatList
          className="pt-2"
          vertical
          showsHorizontalScrollIndicator={false}
          data={restaurants}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <MostPopularRestaurantCard item={item} index={index} />
          )}
        ></FlatList>
      </View>
    </View>
  );
}
