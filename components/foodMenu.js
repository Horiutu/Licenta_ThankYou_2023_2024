import { View, Image, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function FoodMenu() {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Restaurant")}>
      <View className="mr-6 ml-6 bg-white rounded-3xl shadow-lg mb-2">
        <View className="flex-row">
          <View className="px-3 pb-4 ">
            <View className="flex-row items-center">
              <Text className="text-2xl font-bold pt-2">Piept de curcan</Text>
            </View>

            <View className="flex-row items-center">
              <Text className="text-slate-700 w-48">
                Descriereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
              </Text>
            </View>
          </View>
          <View className="ml-6 flex-column items-center justify-center">
            <Text className="font-bold text-3xl pt-2">50$</Text>
            <Text className="text-slate-700 text-lg pt-2">160g</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
