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

export default function OrderDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { order, loggedInBusinessCode } = route.params;
  const lastFourId = order.id.slice(-4);
  const firstFourId = order.userId.slice(-4);
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
    <SafeAreaView className="bg-stone-900 flex-1">
      <BackButtonRed />
      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        className="mt-12 mb-4"
      >
        <Text style={{ fontSize: 44 }} className="font-bold ml-3 text-white">
          {" "}
          Order
        </Text>
        <Text style={{ fontSize: 44 }} className="font-bold ml-3 text-white">
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
          Name:
        </Text>
        <Text className="ml-3 text-white font-bold text-2xl mb-3">
          {firstFourId}
        </Text>
      </View>
      <View className="ml-3 flex-row">
        <Text
          style={{ color: themeColors.text }}
          className="ml-3 font-bold text-2xl mb-3"
        >
          Date:
        </Text>
        <Text
          style={{ color: themeColors.text2 }}
          className="ml-3 font-bold text-2xl mb-3"
        >
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
        <Text className="ml-3 text-white font-bold text-2xl mb-3">
          {order.totalAmount} lei
        </Text>
      </View>
      <StatusOrder
        orderId={order.id}
        loggedInBusinessCode={loggedInBusinessCode}
      />

      <View
        style={{ borderTopColor: themeColors.text, borderTopWidth: 2 }}
        className="mt-6"
      >
        <Text
          style={{
            color: themeColors.text2,
          }}
          className="mt-4 ml-6 font-bold text-4xl mb-2.5"
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
              className="text-xl text-white font-bold"
            >
              {item.name}
            </Text>
            <Text className="text-sm text-white font-semi mt-0.5">
              Item ID: {item.id}
            </Text>
            <View className="flex-row">
              <Text className="text-lg text-white font-bold">Quantity:</Text>
              <Text
                style={{ color: themeColors.text }}
                className="ml-2 text-lg text-white font-bold"
              >
                {item.quantity}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
