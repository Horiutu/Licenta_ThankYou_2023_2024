import { View, ScrollView, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import withAuthRedirect from "../navigation/withAuthRedirect";
import BackButtonWhite from "../components/backButtonWhite";
import ContactCard from "../components/contactCard";
import MenuHome from "../components/menuHome";
import SessionMenuHome from "../components/sessionMenuHome";
import CancelButton from "../components/cancelButton";
import CartButton from "../components/cartButton";

export default function RestaurantScreen() {
  const { params: item } = useRoute();

  return (
    <View>
      <ScrollView>
        <View className="relative">
          <Image className="w-full h-72" source={{ uri: item?.url }} />
          <CancelButton />
        </View>
        <View
          style={{
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            borderBottomColor: themeColors.bgColor(1),
            borderBottomWidth: 2,
          }}
          className="bg-white -mt-12 pt-6"
        >
          <View className="px-5">
            <Text className="ml-3 text-3xl font-bold pb-2">{item.name}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="px-3 pb-4 space-y-2">
                <View className="flex-row items-center space-x-1">
                  <Image
                    source={require("../assets/images/starRed.png")}
                    className="h-4 w-4"
                  />
                  <Text className="text-xs">
                    <Text className="text-gray font-semibold">
                      {item.statistics.rating}
                    </Text>{" "}
                    ·{" "}
                    <Text className="font-semibold text-gray">
                      {item.statistics.number_of_reviews} reviews
                    </Text>{" "}
                    ·{" "}
                    <Text className="font-semibold text-gray">
                      {item.category}
                    </Text>
                  </Text>
                </View>
                <View>
                  <Text className="text-slate-900">According to Google</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <SessionMenuHome menus={item.menus} restaurantName={item.name} />
      </ScrollView>
      <CartButton />
    </View>
  );
}
