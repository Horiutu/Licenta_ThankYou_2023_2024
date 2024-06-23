import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import BackButtonBlack from "../components/backButtonBlack";
import BackButtonWhite from "../components/backButtonWhite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../services/userSignIn";

export default function BusinessHomeScreen() {
  const navigation = useNavigation();

  // FIXME: remove this piece of code
  // useEffect(() => {
  //   (async () => {
  //     await logout();
  //   })();
  // }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setLoading(!loading);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <SafeAreaView className="bg-stone-900 flex-1 justify-center">
      <View className="flex-1">
        <View
          style={{ flexDirection: "row", alignItems: "center" }}
          className="mt-2 py-8"
        >
          <Text style={{ fontSize: 44 }} className="font-bold ml-3 text-white">
            {" "}
            Your
          </Text>
          <Text style={{ fontSize: 44 }} className="font-thin text-white">
            {" "}
            Business
          </Text>
        </View>

        {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("BusinessAppearance")}
            className="pb-3"
          >
            <Text
              style={{ color: themeColors.text }}
              className="font-bold ml-6 text-3xl"
            >
              Notifications
            </Text>
          </TouchableOpacity>
          <Icon.Bell
            className="ml-2 mb-2"
            strokeWidth={3}
            stroke={themeColors.bgColor(1)}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("BusinessMenu")}
            className="pb-3"
          >
            <Text
              style={{ color: themeColors.text }}
              className="font-bold ml-6 text-3xl"
            >
              Menu
            </Text>
          </TouchableOpacity>
          <Icon.BookOpen
            className="ml-3 mb-2"
            strokeWidth={3}
            stroke={themeColors.bgColor(1)}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("BusinessSchedule")}
            className="pb-3"
          >
            <Text
              style={{ color: themeColors.text }}
              className="font-bold ml-6 text-3xl"
            >
              Schedule
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
            onPress={() => navigation.navigate("BusinessDetails")}
            className="pb-3"
          >
            <Text
              style={{ color: themeColors.text }}
              className="font-bold ml-6 text-3xl"
            >
              Details
            </Text>
          </TouchableOpacity>
          <Icon.Clipboard
            className="ml-3 mb-3"
            strokeWidth={3}
            stroke={themeColors.bgColor(1)}
          />
        </View> */}

        <TouchableOpacity
          onPress={() => navigation.navigate("BusinessOrders")}
          className="pt-10 pb-3"
        >
          <Text
            style={{ color: themeColors.text2 }}
            className="font-bold ml-6 text-3xl"
          >
            Orders Now
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("BusinessReservations")}
          className="pb-2"
        >
          <Text
            style={{ color: themeColors.text2 }}
            className="font-bold ml-6 text-3xl"
          >
            Reservations
          </Text>
        </TouchableOpacity>

        <View
          className="absolute bottom-20 ml-6"
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
      </View>
    </SafeAreaView>
  );
}
