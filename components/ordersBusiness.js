import { View, Text } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function OrderBusinessCard({ order }) {
  const navigation = useNavigation();
  const orderDate = new Date(order.date);

  const orderUTCHour = orderDate.getUTCHours();
  const orderUTCMinutes = orderDate.getUTCMinutes();

  const formattedOrderHour = orderUTCHour.toString().padStart(2, "0");
  const formattedOrderMinutes = orderUTCMinutes.toString().padStart(2, "0");

  const orderExactDay = orderDate.getDate();
  const orderExactMonth = orderDate.getMonth() + 1;

  const formattedDay = orderExactDay.toString().padStart(2, "0");
  const formattedMonth = orderExactMonth.toString().padStart(2, "0");

  const lastFourId = order.id.slice(-4);

  const getBorderColor = (status) => {
    switch (status) {
      case "Sent":
        return "orange";
      case "In progress":
        return "yellow";
      case "Served":
        return "green";
      case "Paid":
        return "purple";
      case "Declined":
        return "red";
      case "Waiter is coming":
        return "aqua";
      default:
        return themeColors.bgColor(1);
    }
  };

  return (
    <View>
      <View
        style={{ borderWidth: 2, borderColor: getBorderColor(order.status) }}
        className="mt-2 items-center mr-6 ml-6 mb-1 py-4 bg-stone-800 rounded-2xl shadow flex-row"
      >
        <View style={{ flexDirection: "row" }}>
          <Text className="ml-4 text-lg text-white font-bold">Order</Text>
          <Text
            style={{ color: themeColors.text }}
            className="ml-2 text-lg text-white font-bold"
          >
            #{lastFourId}
          </Text>
        </View>
        <View className="flex-row absolute right-4">
          <Text
            style={{ color: themeColors.text2 }}
            className="ml-4 text-lg text-white font-bold"
          >
            {formattedOrderHour}:{formattedOrderMinutes}
          </Text>
        </View>
        <View className="flex-row absolute right-20">
          <Text
            style={{ color: themeColors.text }}
            className="text-lg text-white font-bold"
          >
            {formattedDay}.{formattedMonth}
          </Text>
        </View>
      </View>
    </View>
  );
}
