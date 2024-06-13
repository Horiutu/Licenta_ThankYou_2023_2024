import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import BackButtonRed from "../components/backButtonRed";
import OrderBusinessCard from "../components/ordersBusiness";
import { FIRESTORE_DBDB } from "../services/config";
import { ref, onValue } from "firebase/database";
import ReservationBusinessCard from "../components/businessReservationCard";

const loggedInBusinessCode = "taco_fiesta";

export default function BusinessReservationsScreen() {
  const navigation = useNavigation();
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    const reservationRef = ref(
      FIRESTORE_DBDB,
      `reservations/${loggedInBusinessCode}`
    );
    const unsubscribe = onValue(reservationRef, (snapshot) => {
      const data = snapshot.val();
      const reservationsList = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setReservations(reservationsList);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ReservationDetails", {
          reservation: item,
          loggedInBusinessCode: loggedInBusinessCode,
        })
      }
    >
      <ReservationBusinessCard reservation={item} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="bg-stone-900 flex-1">
      <BackButtonRed />
      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        className="mt-12 mb-4 ml-3"
      >
        <Text
          style={{ fontSize: 44, color: themeColors.text2 }}
          className="font-bold ml-3 text-white"
        >
          Reservations
        </Text>
      </View>
      <FlatList
        data={reservations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
