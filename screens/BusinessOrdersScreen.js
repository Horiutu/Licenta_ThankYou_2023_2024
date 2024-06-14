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

export default function BusinessOrdersScreen() {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [businessCode, setBusinessCode] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("businessInfo")
      .then((res) => setBusinessCode(JSON.parse(res).businessId))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (businessCode !== "") {
      const orderRef = ref(FIRESTORE_DBDB, `orders/${businessCode}`);
      const unsubscribe = onValue(orderRef, (snapshot) => {
        const data = snapshot.val();
        const ordersList = data
          ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
          : [];
        setOrders(ordersList);
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
        navigation.navigate("OrderDetails", {
          order: item,
          loggedInBusinessCode: businessCode,
        })
      }
    >
      <OrderBusinessCard order={item} />
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
          Orders
        </Text>
      </View>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
