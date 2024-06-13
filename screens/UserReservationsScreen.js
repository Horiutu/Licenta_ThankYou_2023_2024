import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import BackButtonBlack from "../components/backButtonBlack";
import ReservationCard from "../components/reservationCard";
import { useRoute } from "@react-navigation/native";

export default function UserReservationsScreen({ route }) {
  const navigation = useNavigation();
  const { reservations, allRestaurants } = route.params;

  // Sort reservations by date
  const sortedReservations = [...reservations].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
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
          Reservations
        </Text>
        <Icon.Clock
          className="ml-2 mb-2"
          strokeWidth={3}
          height={40}
          width={30}
          stroke={themeColors.bgColor(1)}
        />
      </View>

      <ScrollView className="mt-6">
        {sortedReservations.map((reservation) => {
          const restId = reservation.restaurantId;
          const restaurant = allRestaurants.find((r) => r.id === restId);
          return (
            <ReservationCard
              key={reservation.reservationId}
              item={reservation}
              restaurant={allRestaurants.find(
                (r) => r.id === reservation.restaurantId
              )}
              reservationStatus={reservation.status}
              reservationId={reservation.reservationId} // Pass the reservationId
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
