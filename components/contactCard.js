import {
  View,
  Text,
  Linking,
  Alert,
} from "react-native";
import React from "react";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ContactCard({ location, phone_number, schedule }) {
  const navigation = useNavigation();
  const openGoogleMaps = (searchQuery) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      searchQuery
    )}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Error", "Google Maps is not available");
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <View
      className="bg-white"
      style={{
        borderTopColor: themeColors.bgColor(1),
        borderTopWidth: 2,
        borderBottomColor: themeColors.bgColor(1),
        borderBottomWidth: 2,
      }}
    >
      <Text
        className="font-bold text-xl ml-8 mt-4"
        style={{ color: themeColors.text }}
      >
        Contact
      </Text>
      <View
        className="ml-8 mt-2"
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Icon.Phone strokeWidth={2} stroke={themeColors.bgColor(1)} />
        <Text className="font-semi text-sm ml-2">{phone_number}</Text>
      </View>
      <View
        className="ml-8 mt-2"
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Icon.MapPin strokeWidth={2} stroke={themeColors.bgColor(1)} />
        <Text className="font-semi text-sm ml-2">{location.address}</Text>
      </View>
      <View
        className="ml-8 mt-2 mb-4"
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Icon.Clock strokeWidth={2} stroke={themeColors.bgColor(1)} />
        <Text className="font-semi text-sm ml-2">{schedule}</Text>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        className="ml-8 mb-6"
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("ReservationPage")}
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="py-1 px-8 rounded-lg"
        >
          <Text className="text-white text-lg">Reserve</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="ml-4"
          onPress={() => openGoogleMaps(location.address)}
        >
          <Text
            style={{ color: themeColors.text }}
            className="text-base font-bold"
          >
            Open on Maps
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
