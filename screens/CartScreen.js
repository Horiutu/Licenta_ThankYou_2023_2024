import React, { useEffect } from "react";
import * as Icon from "react-native-feather";

import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart } from "../redux/cartSlice";
import { themeColors } from "../theme";
import BackButtonBlack from "../components/backButtonBlack";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CartScreen() {
  const cartItems = useSelector((state) => state.cart.items);
  const restaurantId = useSelector((state) => state.cart.restaurantId);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  console.log("Cart");

  useEffect(() => {
    console.log("useEffect Cart");
    (async () => {
      const userId = await AsyncStorage.getItem("user");
      const userEmail = await AsyncStorage.getItem("email");
      console.log(user);
    })();
  });

  const handleRemoveFromCart = (id) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center">
      <BackButtonBlack />
      <View
        className=" mt-14 items-center pb-4"
        style={{
          borderBottomColor: themeColors.bgColor(1),
          borderBottomWidth: 2,
          flexDirection: "row",
        }}
      >
        <Text style={{}} className="ml-6 mr-1 text-4xl font-bold">
          Your Order
        </Text>
        <Icon.Clipboard strokeWidth={3} stroke="black" />
      </View>
      <FlatList
        className=""
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="ml-6 mt-2 mr-6">
            <Text
              className="font-bold text-xl mt-2 mb-2"
              style={{ color: themeColors.text }}
            >
              {item.name}
            </Text>
            <Image
              className="w-25 h-32 rounded-r-2xl drop-shadow-md"
              source={{ uri: item.imageUrl }}
            />
            <Text className="font-bold text-lg mt-2">
              Quantity: {item.quantity}
            </Text>
            <Text className="font-bold text-lg">
              Total:{" "}
              {(parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2)}{" "}
              lei
            </Text>
            <View className="mr-40">
              <TouchableOpacity
                className="mb-3"
                onPress={() => handleRemoveFromCart(item.id)}
              >
                <Text
                  style={{ color: themeColors.text }}
                  className="font-bold text-sm"
                >
                  Remove from order
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View
        className="rounded-t-3xl"
        style={{ height: 70, backgroundColor: themeColors.bgColor(1) }}
      ></View>
      <View
        className="rounded-t-3xl"
        style={{
          alignItems: "center",

          backgroundColor: themeColors.bgColor(1),
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
        }}
      >
        <Text className="font-bold text-white text-lg mt-2">
          Total: {totalAmount.toFixed(2)} lei
        </Text>
        <View className="flex-row items-center">
          <TouchableOpacity>
            <Text className="font-bold mr-1 text-3xl">Send Order</Text>
          </TouchableOpacity>
          <Icon.Send strokeWidth={3} stroke="black" />
        </View>
      </View>
    </SafeAreaView>
  );
}
