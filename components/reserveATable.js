import {
  View,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Linking,
  Alert,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { TouchableOpacity } from "react-native";
import NumberSelector from "./numberPicker";
import DateSelector from "./datePicker";
import HourSelector from "./hourPicker";
import { useAuth2 } from "../hooks/useAuth2";
import { useState, useEffect } from "react";
import { child, set, getDatabase, ref } from "firebase/database";

export default function ReserveATable({ restaurantId }) {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("Name");
  const [userId, setUserId] = useState("");
  const [numberOfPersons, setNumberOfPersons] = useState(2);
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("user");
      console.debug("Auth object in reserve: ", JSON.parse(user).displayName);
      setUserName(JSON.parse(user).displayName);
      setUserId(JSON.parse(user).uid);
    })();
  }, []);

  const handleReservation = async () => {
    const reservationId = Date.now().toString();
    const reservation = {
      restaurantId,
      userId,
      date: date.toISOString(),
      hour,
      numberOfPersons,
      userName,
      specialRequest,
      status: "Pending",
    };

    console.log(reservation);

    try {
      const reservationRef = ref(
        getDatabase(),
        "reservations/" + restaurantId + "/" + reservationId
      );
      await set(reservationRef, reservation);
      Alert.alert("Reservation Successful", "Your reservation has been made.");
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Reservation Failed",
        "There was an error making your reservation."
      );
      console.error(error);
    }
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
      <View className="flex-row ml-7 mr-7 border-red-500 mt-8 border-b-2 pb-1 mb-2">
        <Icon.User
          className="mr-3"
          width={30}
          height={30}
          stroke={themeColors.bgColor(1)}
        />
        <TextInput
          placeholderTextColor="black"
          placeholder={userName}
          onChangeText={setUserName}
          value={userName}
        />
      </View>
      <View
        className="ml-6  mb-2"
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Icon.User
          className=""
          width={30}
          height={30}
          stroke={themeColors.bgColor(1)}
        />
        <Icon.User
          className=""
          width={30}
          height={30}
          stroke={themeColors.bgColor(1)}
        />
        <NumberSelector text="Nr. of persons" onChange={setNumberOfPersons} />
      </View>

      <View className="ml-7 mb-2">
        <DateSelector onChange={setDate} />
      </View>

      <View className="ml-7 mb-2">
        <HourSelector onChange={setHour} />
      </View>

      <View className="flex-row ml-7 mr-7 border-red-500 border-b-2 pb-1 mb-2">
        <Icon.Plus
          className="mr-3"
          width={30}
          height={30}
          stroke={themeColors.bgColor(1)}
        />
        <TextInput
          placeholderTextColor="black"
          placeholder="Special Request"
          onChangeText={setSpecialRequest}
          value={specialRequest}
        />
      </View>
      <View
        className="items-center mt-6 justify-center"
        style={{ marginBottom: 400 }}
      >
        <TouchableOpacity
          // onPress={() => navigation.goBack()}
          onPress={handleReservation}
          style={{
            backgroundColor: themeColors.bgColor(1),
            paddingHorizontal: 95,
          }}
          className="py-1 rounded-lg"
        >
          <Text className="font-bold text-white text-lg">Send the request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
