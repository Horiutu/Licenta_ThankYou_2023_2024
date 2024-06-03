import { View, Image, Text, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export default function ReservationCard({ item, restaurant }) {
  const navigation = useNavigation();
  const [url, setUrl] = useState("");

  useEffect(() => {
    const storage = getStorage();
    const storageRef = ref(storage, restaurant.image);

    getDownloadURL(storageRef).then((url) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = function (event) {
        const blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();
      setUrl(url);
    });
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Restaurant", { ...restaurant, url })}
    >
      <View className="mr-6 ml-6 bg-white rounded-3xl shadow-lg">
        <Image
          className="rounded-t-3xl"
          source={{ uri: url }}
          style={{
            resizeMode: "cover",
            height: 150,
            width: 345,
          }}
        />
        <View className="px-3 pb-4 space-y-2">
          <View className="flex-row items-center">
            <Text className="text-2xl font-bold pt-2">{restaurant.name}</Text>
          </View>
          <View className="absolute bottom-2 right-4 flex-row">
            <Text className="pl-8 text-lg pt-2">{item.date}</Text>
            <Text className="pl-2 font-bold text-lg pt-2">18:00</Text>
          </View>
          <View className="flex-row items-center space-x-1">
            <Image
              source={require("../assets/images/fullStar.png")}
              className="h-4 w-4"
            />
            <Text className="text-xs">
              <Text className="text-gray">
                {" "}
                {restaurant.statistics.rating}{" "}
              </Text>
              <Text className="text-gray-700">
                {" "}
                ({restaurant.statistics.number_of_reviews} reviews)
              </Text>{" "}
              · <Text className="font-semibold text-gray-700"></Text>
            </Text>
          </View>
          <View className="flex-row items-center space-x-1">
            <Icon.MapPin color="gray" width={15} height={15} />
            <Text className="text-gray-700 text-xs">
              {" "}
              {restaurant.location.address}{" "}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
