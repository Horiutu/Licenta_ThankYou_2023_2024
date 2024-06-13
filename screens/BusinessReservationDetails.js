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
import StatusReservation from "../components/statusReservation";

export default function ReservationDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { reservation, loggedInBusinessCode } = route.params;
  const lastFourId = reservation.id.slice(-4);

  console.log(loggedInBusinessCode);

  const resID = reservation.id;

  let displayText = "No special requests";
  if (reservation.specialRequest) {
    displayText = reservation.specialRequest;
  }

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
  return (
    <SafeAreaView className="bg-stone-900 flex-1">
      <BackButtonRed />
      <View className="mt-12 mb-4">
        <Text style={{ fontSize: 44 }} className="font-bold ml-3 text-white">
          {" "}
          Reservation
        </Text>
        <View className="flex-row">
          <Text style={{ fontSize: 44 }} className="font-bold ml-5 text-white">
            #
          </Text>
          <Text
            style={{ fontSize: 44, color: themeColors.text }}
            className="font-bold ml-1 text-white"
          >
            {lastFourId}
          </Text>
        </View>
      </View>
      <View className="ml-3 flex-row">
        <Text
          style={{ color: themeColors.text }}
          className="ml-3 font-bold text-2xl mb-3"
        >
          Name:
        </Text>
        <Text className="ml-3 text-white font-bold text-2xl mb-3">
          {reservation.userName}
        </Text>
      </View>
      <View className="ml-3 flex-row">
        <Text
          style={{ color: themeColors.text }}
          className="ml-3 font-bold text-2xl mb-3"
        >
          Nr. of persons:
        </Text>
        <Text className="ml-3 text-white font-bold text-2xl mb-3">
          {reservation.numberOfPersons}
        </Text>
      </View>
      <View className="ml-3 flex-row">
        <Text
          style={{ color: themeColors.text }}
          className="ml-3 font-bold text-2xl mb-3"
        >
          Special request:
        </Text>
      </View>
      <View className="mx-3">
        <Text className="ml-3 text-white font-bold text-sm mb-3">
          {reservation.specialRequest}
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
          {formattedReservationDay}.{formattedReservationMonth}{" "}
          {formattedReservationHour}:{formattedReservationMinutes}
        </Text>
      </View>
      <StatusReservation
        reservationId={resID}
        loggedInBusinessCode={loggedInBusinessCode}
      />
    </SafeAreaView>
  );
}
