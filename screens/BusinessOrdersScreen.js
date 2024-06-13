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

const loggedInBusinessCode = "pasta_paradise";

export default function BusinessOrdersScreen() {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersRef = ref(FIRESTORE_DBDB, `orders/${loggedInBusinessCode}`);
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      const ordersList = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setOrders(ordersList);
    });

    return () => unsubscribe();
  }, []);
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("OrderDetails", {
          order: item,
          loggedInBusinessCode: loggedInBusinessCode,
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
          Orders Now
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
