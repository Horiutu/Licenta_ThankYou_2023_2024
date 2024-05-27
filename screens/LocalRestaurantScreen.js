import { Image, ScrollView, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import BackButtonWhite from "../components/backButtonWhite";
import * as Linking from "expo-linking";
import { child, get, getDatabase, ref } from "firebase/database";
import { themeColors } from "../theme";
import {
  getDownloadURL,
  getStorage,
  ref as refStorage,
} from "firebase/storage";
import Menu from "../components/menu";
import FAB from "../components/fab";

export default function LocalRestaurantScreen() {
  const { params: item } = useRoute();
  const [data, setData] = useState(null);
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    const dbRef = ref(getDatabase());

    get(child(dbRef, `restaurants/${item.restaurantId}`))
      .then(async (snapshot) => {
        const storage = getStorage();

        if (snapshot.exists()) {
          const data = snapshot.val();

          for (const menuKey of Object.keys(data.menus)) {
            const menu = data.menus[menuKey];

            await Promise.all(
              Object.keys(menu.items).map(async (key) => {
                const item = menu.items[key];
                item.imageUrl = await getDownloadURL(
                  refStorage(storage, item.image)
                );
              })
            );
          }

          const imageUrl = data.image;
          const storageRef = refStorage(storage, imageUrl);

          getDownloadURL(storageRef).then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = function (event) {
              const blob = xhr.response;
            };
            xhr.open("GET", url);
            xhr.send();
            setRestaurantData({ ...data, url });
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeepLink = (event) => {
    let data = Linking.parse(event.url);
    setData(data);
  };

  useEffect(() => {
    const getInitialURL = async () => {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) {
        setData(Linking.parse(initialURL));
      }
    };

    Linking.addEventListener("url", handleDeepLink);

    if (!data) {
      getInitialURL();
    }

    return () => {
      Linking.removeEventListener("url");
    };
  }, []);

  if (!restaurantData) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <ScrollView>
        <View className="relative">
          <Image className="w-full h-72" source={{ uri: restaurantData.url }} />
          <BackButtonWhite linkTo="Home" />
        </View>
        <View
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="bg-white -mt-12 pt-6"
        >
          <View
            className="px-5"
            style={{
              borderBottomColor: themeColors.bgColor(1),
              borderBottomWidth: 2,
            }}
          >
            <Text className="ml-3 text-3xl font-bold pb-2">
              {restaurantData.name}
            </Text>
            <View className="flex-row space-x-2 my-1">
              <View className="px-3 pb-4 space-y-2">
                <View className="flex-row items-center space-x-1">
                  <Image
                    source={require("../assets/images/starRed.png")}
                    className="h-4 w-4"
                  />
                  <Text className="text-xs">
                    <Text className="text-gray font-semibold">
                      {restaurantData.statistics.rating}
                    </Text>{" "}
                    ·{" "}
                    <Text className="font-semibold text-gray">
                      {restaurantData.statistics.number_of_reviews} reviews
                    </Text>{" "}
                    ·{" "}
                    <Text className="font-semibold text-gray">
                      {restaurantData.category}
                    </Text>
                  </Text>
                </View>
                <View>
                  <Text className="text-slate-900">According to Google</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Menu menus={restaurantData.menus} restaurant={restaurantData} />
      </ScrollView>
      <FAB linkTo="Cart" />
    </View>
  );
}
