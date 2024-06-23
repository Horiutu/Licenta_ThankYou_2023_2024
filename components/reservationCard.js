import { View, Image, Text, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export default function ReservationCard({
  item,
  restaurant,
  reservationStatus,
  restaurantId,
}) {
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

  const reservationDate = new Date(item.date);
  const reservationHour = new Date(item.hour);
  const reservationNrPers = item.numberOfPersons;

  const reservationExactDay = reservationDate.getDate();
  const reservationExactMonth = reservationDate.getMonth() + 1;

  const formattedDay = reservationExactDay.toString().padStart(2, "0");
  const formattedMonth = reservationExactMonth.toString().padStart(2, "0");

  const reservationUTCHour = reservationHour.getUTCHours();
  const reservationUTCMinutes = reservationHour.getUTCMinutes();

  const formattedHour = reservationUTCHour.toString().padStart(2, "0");
  const formattedMinutes = reservationUTCMinutes.toString().padStart(2, "0");

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "green";
      case "pending request":
        return "orange";
      case "declined":
        return "red";
      default:
        return themeColors.text;
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Restaurant", { ...restaurant, url })}
    >
      <View className="mr-6 mb-6 ml-6 bg-white rounded-3xl shadow-lg">
        <Image
          className="rounded-t-3xl"
          source={{ uri: url }}
          style={{
            resizeMode: "cover",
            height: 100,
            width: 345,
          }}
        />
        <View className="px-3 pb-4 space-y-2">
          <View className="flex-row items-center flex-row">
            <Text className="text-2xl font-bold pt-2">{restaurant.name}</Text>
          </View>

          <View className="flex-row items-center space-x-1">
            <Image
              source={require("../assets/images/starRed.png")}
              className="h-4 w-4"
            />
            <Text className="text-xs">
              <Text className="font-semibold text-gray">
                {" "}
                {restaurant.statistics.rating}{" "}
              </Text>
              ·
              <Text className="font-semibold text-gray">
                {" "}
                {restaurant.statistics.number_of_reviews} reviews
              </Text>{" "}
              ·{" "}
              <Text className="font-semibold text-gray">
                {restaurant.category}
              </Text>
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
              {restaurant.location.address}{" "}
            </Text>
          </View>
        </View>
        <View className="flex-row -mt-4 items-baseline">
          <Text
            style={{ color: "black" }}
            className="absolute right-24 font-bold text-sm bottom-2.5"
          >
            {formattedDay}.{formattedMonth}
          </Text>
          <Text
            className="absolute right-4 text-2xl font-bold "
            style={{ color: themeColors.text }}
          >
            {formattedHour}:{formattedMinutes}
          </Text>
          <Text
            style={{ color: themeColors.text }}
            className="ml-3.5 mt-1 font-bold text-lg pb-2"
          >
            {reservationNrPers} person(s)
          </Text>
        </View>
        <View
          style={{ backgroundColor: getStatusColor(reservationStatus) }}
          className="mx-3 mb-3 rounded-lg"
        >
          <View className="flex-row">
            <Text className="ml-3 text-white font-bold text-lg">Status:</Text>
            <Text className="ml-3 text-white font-semi text-lg">
              {reservationStatus}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
