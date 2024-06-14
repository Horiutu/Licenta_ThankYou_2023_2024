import { View, Text } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function ReservationBusinessCard({ reservation }) {
  const navigation = useNavigation();
  const lastFourId = reservation.id.slice(-4);

  const reservationDate = new Date(reservation.date);
  const reservationHour = new Date(reservation.hour);

  const reservationUTCHour = reservationHour.getUTCHours();
  const reservationUTCMinutes = reservationHour.getUTCMinutes();

  const formattedReservationHour = reservationUTCHour
    .toString()
    .padStart(2, "0");
  const formattedReservationMinutes = reservationUTCMinutes
    .toString()
    .padStart(2, "0");

  const reservationExactDay = reservationDate.getDate();
  const reservationExactMonth = reservationDate.getMonth() + 1;

  const formattedReservationDay = reservationExactDay
    .toString()
    .padStart(2, "0");
  const formattedReservationMonth = reservationExactMonth
    .toString()
    .padStart(2, "0");

  const getBorderColor = (status) => {
    switch (status) {
      case "Pending request":
        return "orange";
      case "Declined":
        return "red";
      case "Accepted":
        return "chartreuse";
      default:
        return themeColors.bgColor(1);
    }
  };

  return (
    <View>
      <View
        style={{
          borderWidth: 2,
          borderColor: getBorderColor(reservation.status),
        }}
        className="mt-2 items-center mr-6 ml-6 mb-1 py-4 bg-stone-800 rounded-2xl shadow flex-row"
      >
        <View style={{ flexDirection: "row" }}>
          <Text className="ml-4 text-lg text-white font-bold">Reservation</Text>
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
            {formattedReservationHour}:{formattedReservationMinutes}
          </Text>
        </View>
        <View className="flex-row absolute right-20">
          <Text
            style={{ color: themeColors.text }}
            className="text-lg text-white font-bold"
          >
            {formattedReservationDay}.{formattedReservationMonth}
          </Text>
        </View>
      </View>
    </View>
  );
}
