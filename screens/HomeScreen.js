import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import Categories from "../components/categories";
import FeaturedRow from "../components/featuredRow";
import { featured } from "../constants/index";
import { useNavigation } from "@react-navigation/native";
import LeaderBoardMostVisited from "../components/leaderboardVisited";
import { getDatabase, ref, child, get } from "firebase/database";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [restaurants, setRestaurants] = useState([]);
  const countRestaurants = Object.keys(restaurants).length;

  useEffect(() => {
    const dbRef = ref(getDatabase());

    get(child(dbRef, `restaurants`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const restaurantsArr = [];
          const data = snapshot.val();
          Object.keys(data).forEach((key) => restaurantsArr.push(data[key]));
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
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="flex-row items-center space-x-2 px-4 pb-2">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <Icon.Search height="15" width="15" stroke="black" />
          <TextInput placeholder="Search restaurants" className="ml-2 flex-1" />
        </View>
        <View
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="ml-3 p-3 rounded-full"
        >
          <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
            <Icon.User
              height="15"
              width="25"
              strokeWidth={2.5}
              stroke="white"
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        <Categories />
      </ScrollView>
      <View className="mt-1">
        {countRestaurants === 0 ? (
          <View className="items-center">
            <Text className="font-semi text-black text-2xl">Loading...</Text>
          </View>
        ) : (
          <FeaturedRow
            title="Popular"
            description="Most recently appreciated"
            restaurants={restaurants}
          />
        )}
      </View>
      <LeaderBoardMostVisited />
      <View className="bg-white">
        <TouchableOpacity
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="bg-red-500 items-center py-2 rounded-lg mx-4 rounded-b-3xl"
          onPress={() => navigation.navigate("QR")}
        >
          <Text className="font-semi text-white text-2xl">Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
