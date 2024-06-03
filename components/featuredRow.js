import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import RestaurantCard from "../components/restaurantCard";
import { useNavigation } from "@react-navigation/native";

export default function FeaturedRow({ title, restaurants, description }) {
  const navigation = useNavigation();
  return (
    <View>
      <View className="flex-row justify-between items-center px-4">
        <View className="ml-0.5">
          <Text className="font-bold text-lg text-2xl">{title}</Text>
          <Text className="text-gray-500 text-xs">{description}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("PopularAll")}
          className="mr-0.5"
        >
          <Text style={{ color: themeColors.text }} className="font-semibold">
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        className="overflow-visible py-5"
      >
        {restaurants.map((restaurant, index) => {
          return <RestaurantCard item={restaurant} key={index} />;
        })}
      </ScrollView>
    </View>
  );
}
