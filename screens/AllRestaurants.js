import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import Categories from "../components/categories";
import FeaturedRow from "../components/featuredRow";
import RestaurantCard from "../components/restaurantCard";
import BackButtonBlack from "../components/backButtonBlack";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import LeaderBoardMostVisited from "../components/leaderboardVisited";
import { debounce } from "lodash";
import AllRestaurantCard from "../components/allRestaurantCard";

export default function AllRestaurantsScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const [restaurants, setRestaurants] = useState(params.restaurants);
  const [chipValue, setChipValue] = useState("");
  const [search, setSearch] = useState("");
  const countRestaurants = Object.keys(restaurants).length;
  const renderItem = ({ item }) => <AllRestaurantCard item={item} />;

  useEffect(() => {
    console.log("Set restaurans");
    setRestaurants(
      params.restaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) &&
          r.category.toLowerCase().includes(chipValue.toLowerCase())
      )
    );
  }, [chipValue]);

  const debouncedHandleSearch = useCallback(
    debounce((val) => handleSearch(val), 300),
    []
  );

  const handleSearch = (val) => {
    console.log("Set restaurans search");
    setRestaurants(
      params.restaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(val.toLowerCase()) &&
          r.category.toLowerCase().includes(chipValue.toLowerCase())
      )
    );
    setSearch(val);
  };

  const handleChipFilter = (val) => {
    setChipValue(val);
  };

  return (
    <View className="mb-6" style={{ flex: 1 }}>
      <BackButtonBlack />

      <Text
        style={{ fontSize: 44, color: themeColors.text }}
        className="font-bold ml-6 text-white mt-24"
      >
        Restaurants
      </Text>

      <View className="flex-row items-center space-x-2 px-4 pb-2 mt-2 ">
        <View className="flex-row flex-1 items-center p-3 rounded-full mx-2 border border-gray-300">
          <Icon.Search height="15" width="15" stroke="black" />
          <TextInput
            onChangeText={(val) => debouncedHandleSearch(val)}
            placeholder="Search restaurants"
            className="ml-2 flex-1"
          />
        </View>
      </View>
      <View
        // showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        style={{ marginBottom: 10 }}
        className="ml-2"
      >
        <Categories handleChipFilter={handleChipFilter} />
      </View>
      <View className="mt-1" style={{ flex: 1 }}>
        {countRestaurants === 0 ? (
          <View className="items-center">
            <Text className="font-semi text-black text-2xl">No results.</Text>
          </View>
        ) : (
          <FlatList
            data={restaurants}
            className="pb-4"
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ marginLeft: 24, marginRight: 24 }}
            // showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}
