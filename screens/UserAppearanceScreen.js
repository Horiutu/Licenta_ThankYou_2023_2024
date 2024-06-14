import { View, Text, ScrollView, SafeAreaView, Touchable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import BackButtonBlack from "../components/backButtonBlack";
import ReservationCard from "../components/reservationCard";
import { useRoute } from "@react-navigation/native";
import OrderUserCard from "../components/orderUserCard";
import * as Icon from "react-native-feather";
import { TouchableOpacity } from "react-native";

export default function UserAppearanceScreen({ route }) {
  const navigation = useNavigation();
  const { orders, allRestaurants } = route.params;

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <SafeAreaView className="bg-white flex-1">
      <BackButtonBlack />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomColor: themeColors.bgColor(1),
          borderBottomWidth: 2,
          marginTop: 50,
        }}
      >
        <Text
          style={{ fontSize: 44, color: themeColors.text }}
          className="font-bold ml-6 mb-2 text-white"
        >
          Orders
        </Text>
        <Icon.Bell
          className="ml-2 mb-2"
          strokeWidth={3}
          height={40}
          width={30}
          stroke={themeColors.bgColor(1)}
        />
      </View>

      <ScrollView className="mt-6">
        {sortedOrders.map((order) => {
          const restId = order.restaurantId;
          const restaurant = allRestaurants.find((r) => r.id === restId);

          return (
            <OrderUserCard
              key={order.orderId}
              item={order}
              restaurant={allRestaurants.find(
                (r) => r.id === order.restaurantId
              )}
              orderId={order.orderId}
              orderStatus={order.status}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
