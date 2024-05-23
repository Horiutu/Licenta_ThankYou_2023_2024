import {
  View,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { TouchableOpacity } from "react-native";
import ImageDisplay from "./imageDisplay";

export default function SessionMenuHome({ menus, restaurantName }) {
  const placeholderText = `Search in ${restaurantName}`;
  return (
    <View
      className="bg-white items-center pb-4"
      style={{
        borderBottomColor: themeColors.bgColor(1),
        borderBottomWidth: 2,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text className="font-bold text-4xl mb-2 mt-4">Menu</Text>
      </View>
      <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300 mx-6 mb-2 mt-2">
        <Icon.Search height="15" width="15" stroke="black" />
        <TextInput placeholder={placeholderText} className="ml-2 flex-1" />
      </View>

      {Object.keys(menus).map((key) => {
        const { name, items } = menus[key];

        const menuItemData = Object.keys(items).map((itemKey) => {
          const itemData = items[itemKey];
          return (
            <View>
              <Text
                className="font-bold text-xl ml-8 mt-2"
                style={{ color: themeColors.text }}
              >
                {itemData.name}
              </Text>
              <Text className="font-bold text-m mx-8 mt-2">
                {itemData.description}
              </Text>
              <ImageDisplay imageName={itemData.image} />
              <Text className="font-bold text-lg ml-8 mt-4 mb-2">
                {itemData.price} lei
              </Text>
              <TouchableOpacity
                style={{ backgroundColor: themeColors.bgColor(1) }}
                className="py-1 mx-8 items-center mb-4"
              >
                <Icon.Plus strokeWidth={2} stroke="white" />
              </TouchableOpacity>
            </View>
          );
        });

        return (
          <View>
            <Text
              className="font-bold text-2xl ml-8 mt-4"
              style={{ color: themeColors.text }}
            >
              {name}
            </Text>
            {menuItemData}
          </View>
        );
      })}
    </View>
  );
}
