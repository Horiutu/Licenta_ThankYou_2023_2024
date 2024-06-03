import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import BackButtonBlack from "../components/backButtonBlack";
import CreditCard from "../components/creditcards";
import PaymentHistoryCard from "../components/paymentHistoryCard";

export default function UserFinanceScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-white flex-1 justify-start">
      <BackButtonBlack />

      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        className="mt-12 mb-6"
      >
        <Text
          style={{ fontSize: 44, color: themeColors.text }}
          className="font-bold ml-6 text-white"
        >
          Finance
        </Text>
      </View>

      <View className="ml-6 pb-2">
        <Text className="text-2xl font-thin">Your payments</Text>
      </View>

      <ScrollView className="pt-2">
        <PaymentHistoryCard />
        <PaymentHistoryCard />

        <PaymentHistoryCard />

        <PaymentHistoryCard />

        <PaymentHistoryCard />

        <PaymentHistoryCard />

        <PaymentHistoryCard />

        <PaymentHistoryCard />
      </ScrollView>
    </SafeAreaView>
  );
}
