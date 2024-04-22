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
import BackButton from "../components/backButton";
import ReservationCard from "../components/reservationCard";
import { logout } from "../services/userSignIn";
import withAuthRedirect from "../navigation/withAuthRedirect";
import MostVisitedRestaurantCard from "../components/mostVisitedRestaurantCard";
import BackButtonBlack from "../components/backButtonBlack";

export default function PopularRestaurantsAllScreeen() {
  const navigation = useNavigation();
  return (
    <ScrollView className="bg-white flex-1">
      <BackButtonBlack />

      <Text
        style={{ fontSize: 44, color: themeColors.text }}
        className="font-bold ml-6 text-white mt-24"
      >
        Popular
      </Text>

      <Text style={{ fontSize: 20 }} className="font-thin ml-6 text-black mb-6">
        Most Recently Appreciated
      </Text>
    </ScrollView>
  );
}
