import { View, ScrollView, Image, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import BackButtonWhite from "../components/backButtonWhite";
import ContactCard from "../components/contactCard";
import MenuHome from "../components/menuHome";

export default function RestaurantScreen() {
  const { params: item } = useRoute();

  return (
    <View>
      <ScrollView>
        <View className="relative">
          <Image className="w-full h-72" source={{ uri: item.url }} />
          <BackButtonWhite />
        </View>
        <View
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
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
        <ContactCard
          location={item.location}
          phone_number={item.phone_number}
          schedule={item.schedule}
          restaurant={item}
          openHour={item.openHour}
          closingHour={item.closingHour}
          openMinutes={item.openMinutes}
          closingMinutes={item.closingMinutes}
        />
        <MenuHome menus={item.menus} restaurant={item} />
      </ScrollView>
    </View>
  );
}
