import { View, Image, Text, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export default function OrderUserCard({
  item,
  restaurant,
  orderStatus,
  orderId,
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

  const lastFourId = orderId.slice(-4);
  const reservationDate = new Date(item.date);

  const reservationExactDay = reservationDate.getDate();
  const reservationExactMonth = reservationDate.getMonth() + 1;

  const formattedDay = reservationExactDay.toString().padStart(2, "0");
  const formattedMonth = reservationExactMonth.toString().padStart(2, "0");

  const reservationUTCHour = reservationDate.getUTCHours();
  const reservationUTCMinutes = reservationDate.getUTCMinutes();

  const formattedHour = reservationUTCHour.toString().padStart(2, "0");
  const formattedMinutes = reservationUTCMinutes.toString().padStart(2, "0");

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "served":
        return "chartreuse";
      case "sent":
        return "orange";
      case "in progress":
        return "yellow";
      case "declined":
        return "red";
      case "paid":
        return "darkgreen";
      case "waiter is coming":
        return "aqua";
      default:
        return themeColors.text;
    }
  };

  const getStatusTextColor = (status) => {
    switch (status.toLowerCase()) {
      case "served":
        return "black";
      case "sent":
        return "white";
      case "in progress":
        return "black";
      case "declined":
        return "white";
      case "paid":
        return "white";
      case "waiter is coming":
        return "black";
      default:
        return themeColors.text;
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("UserOrderDetails", {
          order: item,
          restaurant: restaurant,
        })
      }
    >
      <View className="mr-6 mb-6 ml-6 bg-white rounded-3xl shadow-lg">
        <Image
          className="rounded-t-3xl"
          source={{ uri: url }}
          style={{
            resizeMode: "cover",
            height: 100,
            width: 345,
          }} //
        />
        <View className="px-3 pb-4 space-y-2">
          <View className="flex-row items-center ">
            <Text className="text-3xl font-bold pt-2">Order</Text>
            <Text className="ml-2 text-3xl text-black font-bold pt-2">#</Text>
            <Text
              style={{ color: themeColors.text }}
              className="ml-0.5 text-3xl font-bold pt-2"
            >
              {lastFourId}
            </Text>
          </View>

          <View className="flex-row items-top space-x-1">
            <Icon.MapPin
              className="mt-1"
              strokeWidth={2}
              stroke={"black"}
              width={15}
              height={15}
            />
            <Text className="text-black text-sm">
              {restaurant.name}, {restaurant.location.address}
            </Text>
          </View>
        </View>
        <View className="flex-row -mt-4 items-baseline">
          <Text
            style={{ position: "absolute", right: 88 }}
            className="text-gray-700 font-bold text-sm bottom-2.5"
          >
            {formattedDay}.{formattedMonth}
          </Text>
          <Text
            className="absolute right-4 text-2xl font-bold "
            style={{ color: themeColors.text }}
          >
            {formattedHour}:{formattedMinutes}
          </Text>
          <Text className="ml-3.5 mt-1 font-semibold text-gray-700 text-lg pb-2">
            Total amount:
          </Text>
          <Text
            style={{ color: themeColors.text }}
            className="ml-1 mt-1 font-bold text-lg pb-2"
          >
            {item.totalAmount}
          </Text>
          <Text
            style={{ color: themeColors.text }}
            className="ml-1 mt-1 font-bold text-lg pb-2"
          >
            lei
          </Text>
        </View>
        <View
          style={{ backgroundColor: getStatusColor(orderStatus) }}
          className="mx-3 mb-3 rounded-lg"
        >
          <View className="flex-row">
            <Text
              style={{ color: getStatusTextColor(orderStatus) }}
              className="ml-3 font-bold text-lg"
            >
              Status:
            </Text>
            <Text
              style={{ color: getStatusTextColor(orderStatus) }}
              className="ml-3 font-semi text-lg"
            >
              {orderStatus}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
