import { useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function MostPopularRestaurantCard({ item, index }) {
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
        <View
          style={{ flexDirection: "row" }}
          className="items-center absolute right-6"
        >
          <Text
            style={{ color: themeColors.text }}
            className="font-bold text-xl ml-16"
          >
            {item.statistics.rating}
          </Text>
          <Image
            source={require("../assets/images/starRed.png")}
            className="ml-1 h-4 w-4"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
