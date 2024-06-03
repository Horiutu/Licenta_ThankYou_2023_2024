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
import ReserveATable from "../components/reserveATable";
import CancelButton from "../components/cancelButton";
import BackButtonWhite from "../components/backButtonWhite";
import BackButtonRed from "../components/backButtonRed";
import { useRoute } from "@react-navigation/native";

export default function ReservationPageScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-white flex-1">
      <BackButtonBlack />

      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        className="mt-14 ml-4"
      >
        <Text style={{ fontSize: 44 }} className="font-bold text-black">
          {" "}
          Reserve
        </Text>
        <Text style={{ fontSize: 44 }} className="font-thin text-black">
          {" "}
          a table
        </Text>
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        className="mb-6 ml-5"
      >
        <Text style={{ fontSize: 30 }} className="font-bold text-black">
          {" "}
          at
        </Text>
        <Text style={{ fontSize: 30 }} className="font-thin text-black">
          {" "}
          {params.restaurant.name}
        </Text>
      </View>

      <ReserveATable restaurantId={params.restaurant.id} />
    </SafeAreaView>
  );
}
