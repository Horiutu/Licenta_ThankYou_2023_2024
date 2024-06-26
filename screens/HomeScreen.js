import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import Categories from "../components/categories";
import FeaturedRow from "../components/featuredRow";
import { useNavigation } from "@react-navigation/native";
import LeaderBoardMostVisited from "../components/leaderboardVisited";
import { child, get, getDatabase, ref } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as refStorage,
} from "firebase/storage";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const countRestaurants = Object.keys(restaurants).length;

  useEffect(() => {
    const dbRef = ref(getDatabase());

    get(child(dbRef, `restaurants`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const restaurantsArr = [];
          const data = snapshot.val();
          const storage = getStorage();

          try {
            Object.keys(data).forEach(async (restaurantId) => {
              const restaurantData = data[restaurantId];
              const { menus } = restaurantData;

              for (const menuKey of Object.keys(menus)) {
                const menu = menus[menuKey];

                await Promise.all(
                  Object.keys(menu?.items).map(async (key) => {
                    const item = menu.items[key];
                    item.imageUrl = await getDownloadURL(
                      refStorage(storage, item.image)
                    );
                  })
                );
              }

              const imageUrl = restaurantData.image;
              const storageRef = refStorage(storage, imageUrl);

              getDownloadURL(storageRef).then((url) => {
                const xhr = new XMLHttpRequest();
                xhr.responseType = "blob";
                xhr.onload = function (event) {
                  const blob = xhr.response;
                };
                xhr.open("GET", url);
                xhr.send();
              });
            });
          } catch (error) {
            console.error(error);
          }

          Object.keys(data).forEach((key) => restaurantsArr.push(data[key]));
          restaurantsArr.sort(
            (a, b) => b.statistics.rating - a.statistics.rating
          );
          top3 = restaurantsArr.slice(0, 3);
          setRestaurants(top3);
          setAllRestaurants(restaurantsArr);
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
        <TouchableOpacity
          className="flex-row flex-1 items-center p-3 rounded-full"
          style={{ backgroundColor: themeColors.bgColor(1) }}
          onPress={() =>
            navigation.navigate("AllRestaurants", {
              restaurants: allRestaurants,
            })
          }
        >
          <View style={{ flexDirection: "row" }} className="items-left">
            <Text className="ml-2 text-white flex-1">
              Search all restaurants
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="ml-3 p-3 rounded-full"
        >
          <TouchableOpacity
            onPress={() =>
              countRestaurants > 0 &&
              navigation.navigate("UserProfile", { allRestaurants })
            }
          >
            <Icon.User
              height="15"
              width="25"
              strokeWidth={2.5}
              stroke="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-1">
        {countRestaurants === 0 ? (
          <View className="items-center">
            <Text className="font-semi text-black text-2xl">Loading...</Text>
          </View>
        ) : (
          <FeaturedRow
            title="Popular"
            description="Most Appreciated Restaurants"
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
          <Text className="font-semi text-white text-xl">Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
