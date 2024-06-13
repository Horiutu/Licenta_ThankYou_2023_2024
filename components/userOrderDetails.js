import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import React from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import BackButtonBlack from "../components/backButtonBlack";
import BackButtonWhite from "../components/backButtonWhite";
import OrderBusinessCard from "../components/ordersBusiness";
import BackButtonRed from "../components/backButtonRed";
import StatusOrder from "../components/setOrderStatus";
import PayNowButton from "./payNowButton";

export default function UserOrderDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { order } = route.params;

  const lastFourId = order.orderId.slice(-4);

  const orderDate = new Date(order.date);

  const orderUTCHour = orderDate.getUTCHours();
  const orderUTCMinutes = orderDate.getUTCMinutes();

  const formattedOrderHour = orderUTCHour.toString().padStart(2, "0");
  const formattedOrderMinutes = orderUTCMinutes.toString().padStart(2, "0");

  const orderExactDay = orderDate.getDate();
  const orderExactMonth = orderDate.getMonth() + 1;

  const formattedDay = orderExactDay.toString().padStart(2, "0");
  const formattedMonth = orderExactMonth.toString().padStart(2, "0");

  return (
    <SafeAreaView className="bg-white flex-1">
      <BackButtonBlack />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomColor: themeColors.bgColor(1),
          borderBottomWidth: 2,
        }}
        className="mt-12 mb-4 pb-2"
      >
        <Text style={{ fontSize: 44 }} className="font-bold ml-3 text-black">
          {" "}
          Order
        </Text>
        <Text style={{ fontSize: 44 }} className="font-bold ml-3 text-black">
          #
        </Text>
        <Text
          style={{ fontSize: 44, color: themeColors.text }}
          className="font-bold ml-1 text-white"
        >
          {lastFourId}
        </Text>
      </View>

      <View className="ml-3 flex-row">
        <Text
          style={{ color: themeColors.text }}
          className="ml-3 font-bold text-2xl mb-3"
        >
          Date:
        </Text>
        <Text className="ml-3 font-bold text-2xl mb-3">
          {formattedDay}.{formattedMonth} {formattedOrderHour}:
          {formattedOrderMinutes}
        </Text>
      </View>
      <View className="ml-3 flex-row">
        <Text
          style={{ color: themeColors.text }}
          className="ml-3 font-bold text-2xl mb-3"
        >
          Total amount:
        </Text>
        <Text className="ml-3 text-black font-bold text-2xl mb-4">
          {order.totalAmount} lei
        </Text>
      </View>

      <View className="mx-6">
        <PayNowButton />
      </View>

      <View
        style={{ borderTopColor: themeColors.text, borderTopWidth: 2 }}
        className="mt-6"
      >
        <Text
          style={{
            color: themeColors.text,
          }}
          className="mt-4 ml-6 font-semibold text-4xl mb-2.5"
        >
          Ordered Items
        </Text>
      </View>
      <ScrollView className="px-4">
        {order.cartItems.map((item, index) => (
          <View
            key={index}
            className="p-4 m-2 rounded-lg"
            style={{ borderColor: themeColors.text, borderWidth: 1 }}
          >
            <Text
              style={{ color: themeColors.text }}
              className="text-xl text-black font-bold mb-1"
            >
              {item.name}
            </Text>
            <Text className="text-sm text-black font-bold">
              {item.description}
            </Text>

            <View className="flex-row">
              <Text
                style={{ color: themeColors.text }}
                className="text-sm text-black font-bold"
              >
                Quantity:
              </Text>
              <Text
                style={{ color: themeColors.text }}
                className="ml-2 text-sm text-black font-bold"
              >
                {item.quantity}
              </Text>
            </View>
            <View className="flex-row mt-2">
              <Text className="text-lg text-black font-bold">Price:</Text>
              <Text
                style={{ color: themeColors.text }}
                className="ml-2 text-lg text-black font-bold"
              >
                {item.price}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
