import { useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function MostVisitedRestaurantCard({ item, index }) {
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

  let positionText = "";

  positionText = `#${index + 1} `;

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Restaurant", { ...item, url })}
    >
      <View
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }}
        className="mb-2 mx-4 bg-white rounded-2xl py-3 flex-row items-center"
      >
        <Text
          className="font-bold text-xl ml-3"
          style={{ color: themeColors.text }}
        >
          {positionText}
        </Text>
        <Text className="font-bold text-xl ml-3">{item.name}</Text>
        <View style={{ flexDirection: "row" }} className="absolute right-6">
          <Text
            style={{ color: themeColors.text }}
            className="font-bold text-xl ml-16"
          >
            {item.statistics.number_of_visits}
          </Text>
          <Text className="ml-1 mt-2">visits</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
