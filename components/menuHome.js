import React from "react";
import { View, Text, TextInput, Image } from "react-native";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";

export default function MenuHome({ menus, restaurant }) {
  const placeholderText = `Search in ${restaurant.name}`;

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
            <View key={itemKey}>
              <Text
                className="font-bold text-xl ml-8 mt-2"
                style={{ color: themeColors.text }}
              >
                {itemData.name}
              </Text>
              <Text className="font-bold text-m mx-8 mt-2">
                {itemData.description}
              </Text>
              <Image
                className="w-10/12 h-52 self-center rounded-r-2xl mt-4"
                source={{ uri: itemData.imageUrl }}
              />
              <Text className="font-bold text-xl ml-8 mt-4 mb-4">
                {itemData.price} lei
              </Text>
            </View>
          );
        });

        return (
          <View key={key}>
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
