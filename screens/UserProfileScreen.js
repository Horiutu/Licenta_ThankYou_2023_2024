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
import ReservationCard from "../components/reservationCard";
import { logout } from "../services/userSignIn";
import withAuthRedirect from "../navigation/withAuthRedirect";
import BackButtonBlack from "../components/backButtonBlack";

export default function UserProfileScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate("Login");
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <BackButtonBlack />

      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        className="mt-14 pb-8"
      >
        <Text style={{ fontSize: 44 }} className="font-bold ml-3 text-black">
          {" "}
          Your
        </Text>
        <Text style={{ fontSize: 44 }} className="font-thin text-black">
          {" "}
          Profile
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserAppearance")}
          className="pb-3"
        >
          <Text
            style={{ color: themeColors.text }}
            className="font-bold ml-6 text-3xl"
          >
            Appearance
          </Text>
        </TouchableOpacity>
        <Icon.Droplet
          className="ml-2 mb-2"
          strokeWidth={3}
          stroke={themeColors.bgColor(1)}
        />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserReservations")}
          className="pb-3"
        >
          <Text
            style={{ color: themeColors.text }}
            className="font-bold ml-6 text-3xl"
          >
            Reservations
          </Text>
        </TouchableOpacity>
        <Icon.Clock
          className="ml-3 mb-2"
          strokeWidth={3}
          stroke={themeColors.bgColor(1)}
        />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserFinance")}
          className="pb-3"
        >
          <Text
            style={{ color: themeColors.text }}
            className="font-bold ml-6 text-3xl"
          >
            Finance
          </Text>
        </TouchableOpacity>
        <Icon.DollarSign
          className="ml-3 mb-3"
          strokeWidth={3}
          stroke={themeColors.bgColor(1)}
        />
      </View>

      <View className="ml-6 pt-6 pb-2">
        <Text className="text-2xl font-thin font-s">Your next reservation</Text>
      </View>

      <ReservationCard />

      <View
        className="mt-8 ml-6"
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <TouchableOpacity onPress={handleLogout} className="">
          <Text
            style={{ color: themeColors.text }}
            className="font-bold text-3xl"
          >
            Logout
          </Text>
        </TouchableOpacity>
        <Icon.CornerDownLeft
          className="ml-3"
          strokeWidth={3}
          stroke={themeColors.bgColor(1)}
        />
      </View>
    </SafeAreaView>
  );
}
