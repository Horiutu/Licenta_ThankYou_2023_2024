import { Text, ScrollView } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import MostVisitedRestaurantCard from "../components/mostVisitedRestaurantCard";
import BackButtonBlack from "../components/backButtonBlack";
import MostPopularRestaurantCard from "../components/mostPopularRestaurantCard";

export default function PopularRestaurantsAllScreeen({
  title,
  restaurants,
  description,
}) {
  const navigation = useNavigation();
  const { params: item } = useRoute();
  return (
    <ScrollView className="bg-white flex-1">
      <BackButtonBlack />

      <Text
        style={{ fontSize: 44, color: themeColors.text }}
        className="font-bold ml-6 text-white mt-24"
      >
        Popular
      </Text>

      <Text style={{ fontSize: 20 }} className="font-thin ml-6 text-black mb-6">
        Most Recently Appreciated
      </Text>
    </ScrollView>
  );
}
