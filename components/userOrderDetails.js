import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import BackButtonBlack from "../components/backButtonBlack";
import { getDatabase, ref, update } from "firebase/database";
import { FIRESTORE_DBDB } from "../services/config";
import { rest } from "lodash";

export default function UserOrderDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { order, restaurant } = route.params;

  const [orderStatus, setOrderStatus] = useState(order.status);

  const updateStatus = (newStatus) => {
    const statusRef = ref(
      FIRESTORE_DBDB,
      `orders/${restaurant.id}/${order.orderId}`
    );
    update(statusRef, {
      status: newStatus,
    })
      .then(() => {
        setOrderStatus(newStatus);
        console.log("Status updated successfully");
      })
      .catch((error) => {
        console.error("Error updating status: ", error);
      });
  };

  const handlePayNow = () => {
    updateStatus("Paid");
  };

  const lastFourId = order.orderId.slice(-4);

  const orderDate = new Date(order.date);
  const formattedOrderHour = orderDate
    .getUTCHours()
    .toString()
    .padStart(2, "0");
  const formattedOrderMinutes = orderDate
    .getUTCMinutes()
    .toString()
    .padStart(2, "0");
  const formattedDay = orderDate.getDate().toString().padStart(2, "0");
  const formattedMonth = (orderDate.getMonth() + 1).toString().padStart(2, "0");

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
        <Text style={{ fontSize: 44 }} className="font-bold ml-6 text-black">
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

      <View className="ml-3 flex-row mt-3">
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

      {orderStatus === "Served" && (
        <View className="mx-6">
          <TouchableOpacity
            className="rounded-full"
            style={{ backgroundColor: themeColors.bgColor(1) }}
            onPress={handlePayNow}
          >
            <View className="items-center p-2">
              <Text className="ml-2 text-white font-bold">Pay Now</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {orderStatus === "Paid" && (
        <View className="mx-6 flex-row">
          <Text style={{ color: "darkgreen" }} className="font-bold text-xl">
            You already paid this order
          </Text>
          <Image
            className="ml-2"
            source={require("../assets/images/checkmark.png")}
            style={{
              resizeMode: "cover",
              height: 25,
              width: 25,
              tintColor: "darkgreen",
            }}
          />
        </View>
      )}

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
