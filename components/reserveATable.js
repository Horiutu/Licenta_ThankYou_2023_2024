import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import NumberSelector from "./numberPicker";
import DateSelector from "./datePicker";
import HourSelector from "./hourPicker";
import { useAuth } from "../hooks/useAuth";
import { getDatabase, ref, set, get, child } from "firebase/database";

export default function ReserveATable({ restaurantId }) {
  const navigation = useNavigation();
  const auth = useAuth();
  const [userName, setUserName] = useState("Name");
  const [userId, setUserId] = useState("");
  const [numberOfPersons, setNumberOfPersons] = useState(2);
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(new Date());
  const [specialRequest, setSpecialRequest] = useState("");
  const [restaurant, setRestaurant] = useState(null);
  const [openHour, setOpenHour] = useState(9);
  const [closingHour, setClosingHour] = useState(20);
  const [openMinutes, setOpenMinutes] = useState(0);
  const [closingMinutes, setClosingMinutes] = useState(0);
  const [status, setStatus] = useState("Pending request");

  useEffect(() => {
    (async () => {
      setUserName(auth.displayName);
      setUserId(auth.uid);

      const dbRef = ref(getDatabase());
      const snapshot = await get(child(dbRef, `restaurants/${restaurantId}`));
      if (snapshot.exists()) {
        const restaurantData = snapshot.val();
        setRestaurant(restaurantData);
        setOpenHour(restaurantData.openHour);
        setOpenMinutes(restaurantData.openMinutes);
        setClosingHour(restaurantData.closingHour);
        setClosingMinutes(restaurantData.closingMinutes);
      } else {
        console.log("No data available");
      }
    })();
  }, [auth, restaurantId]);

  const handleReservation = async () => {
    const reservationId = Date.now().toString();
    const reservation = {
      restaurantId,
      userId,
      date: date.toISOString(),
      hour: hour.toISOString(),
      numberOfPersons,
      userName,
      specialRequest,
      status,
    };

    try {
      const reservationRef = ref(
        getDatabase(),
        "reservations/" + restaurantId + "/" + reservationId
      );
      await set(reservationRef, reservation);
      Alert.alert("Reservation Sent", "Your reservation request has been sent");
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Reservation Failed",
        "There was an error making your reservation"
      );
      console.error(error);
    }
  };

  if (!restaurant) {
    return <Text>Loading...</Text>;
  }

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
      <View className="flex-row mt-8 ml-7 mr-7 border-red-500 border-b-2 pb-1 mb-2">
        <Icon.User
          className="mr-3"
          width={30}
          height={30}
          stroke={themeColors.bgColor(1)}
        />
        <TextInput
          style={{ width: "80%" }}
          placeholderTextColor="black"
          placeholder={userName}
          onChangeText={setUserName}
          value={userName}
        />
      </View>
      <View
        className="ml-6 mb-2"
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
        <HourSelector
          openHour={openHour}
          closingHour={closingHour}
          openMinutes={openMinutes}
          closingMinutes={closingMinutes}
          onChange={setHour}
        />
      </View>

      <View className="flex-row ml-7 mr-7 border-red-500 border-b-2 pb-1 mb-2">
        <Icon.Plus
          className="mr-3"
          width={30}
          height={30}
          stroke={themeColors.bgColor(1)}
        />
        <TextInput
          style={{ width: "80%" }}
          placeholderTextColor="black"
          placeholder="Special Request"
          onChangeText={setSpecialRequest}
          value={specialRequest}
          maxLength={45}
        />
      </View>
      <View
        className="items-center mt-6 justify-center"
        style={{ marginBottom: 400 }}
      >
        <TouchableOpacity
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
