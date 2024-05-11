import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import BackButtonBlack from "../components/backButtonBlack";
import ResReservationCard from "../components/resresCard";
import withAuthRedirect from "../navigation/withAuthRedirect";

export default function UserReservationsScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-white flex-1">
      <BackButtonBlack />

      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        className="absolute top-28"
      >
        <Text
          style={{ fontSize: 44, color: themeColors.text }}
          className="font-bold ml-6 text-white"
        >
          Reservations
        </Text>
      </View>

      <ScrollView className="mt-32">
        <ResReservationCard />
        <ResReservationCard />
        <ResReservationCard />
        <ResReservationCard />
      </ScrollView>
    </SafeAreaView>
  );
}
