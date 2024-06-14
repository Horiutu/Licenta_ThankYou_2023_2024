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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "../components/spinner";
import ItemBusinessCard from "../components/businessItemCard";

export default function BusinessReservationsScreen() {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [businessCode, setBusinessCode] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("businessInfo")
      .then((res) => setBusinessCode(JSON.parse(res).businessId))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (businessCode !== "") {
      const itemRef = ref(FIRESTORE_DBDB, `reservations/${businessCode}`);
      const unsubscribe = onValue(itemRef, (snapshot) => {
        const data = snapshot.val();
        const itemsList = data
          ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
          : [];
        setItems(itemsList);
      });

      return () => unsubscribe();
    }
  }, [businessCode]);

  if (businessCode === "") {
    return <Spinner />;
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <ItemBusinessCard item={item} />
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
          style={{ fontSize: 44, color: themeColors.text }}
          className="font-bold ml-3 text-white"
        >
          Menu Items
        </Text>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
