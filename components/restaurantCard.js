import { View, Image, Text, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { themeColors } from "../theme";

export default function RestaurantCard({ item }) {
  const navigation = useNavigation();
  const [url, setUrl] = useState("");

  useEffect(() => {
    const storage = getStorage();
    const storageRef = ref(storage, item.image);

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
      onPress={() =>
        navigation.navigate("SessionRestaurantScreen", { ...item, url })
      }
    >
      <View className="mr-6 bg-white rounded-3xl shadow-lg">
        <Image className="h-36 w-64 rounded-t-3xl" source={{ uri: url }} />
        <View className="px-3 pb-4 space-y-2">
          <Text className="text-lg font-bold pt-2">{item.name}</Text>
          <View className="flex-row items-center space-x-1">
            <Image
              source={require("../assets/images/starRed.png")}
              className="h-4 w-4"
            />
            <Text className="text-xs">
              <Text className="text-gray font-semibold">
                {item.statistics.rating}
              </Text>{" "}
              ·{" "}
              <Text className="font-semibold text-gray">
                {item.statistics.number_of_reviews} reviews
              </Text>{" "}
              · <Text className="font-semibold text-gray">{item.category}</Text>
            </Text>
          </View>
          <View className="flex-row items-center space-x-1">
            <Icon.MapPin
              strokeWidth={2}
              stroke={themeColors.bgColor(1)}
              width={15}
              height={15}
            />
            <Text className="text-gray-700 text-xs">
              {" "}
              {item.location.address}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
