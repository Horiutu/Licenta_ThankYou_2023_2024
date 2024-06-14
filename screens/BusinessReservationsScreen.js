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
import { FIRESTORE_DBDB } from "../services/config";
import { ref, onValue } from "firebase/database";
import ReservationBusinessCard from "../components/businessReservationCard";
import OrderBusinessCard from "../components/ordersBusiness";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "../components/spinner";

export default function BusinessReservationsScreen() {
  const navigation = useNavigation();
  const [reservations, setReservations] = useState([]);
  const [businessCode, setBusinessCode] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("businessInfo")
      .then((res) => setBusinessCode(JSON.parse(res).businessId))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (businessCode !== "") {
      const reservationRef = ref(
        FIRESTORE_DBDB,
        `reservations/${businessCode}`
      );
      const unsubscribe = onValue(reservationRef, (snapshot) => {
        const data = snapshot.val();
        const reservationsList = data
          ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
          : [];
        setReservations(reservationsList);
      });

      return () => unsubscribe();
    }
  }, [businessCode]);

  if (businessCode === "") {
    return <Spinner />;
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ReservationDetails", {
          reservation: item,
          loggedInBusinessCode: businessCode,
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
