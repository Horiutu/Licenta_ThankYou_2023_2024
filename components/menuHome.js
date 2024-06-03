import React, { useState, useCallback } from "react";
import { View, Text, TextInput, Image } from "react-native";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { debounce } from "lodash";

export default function MenuHome({ menus: initialMenus, restaurant }) {
  const placeholderText = `Search in ${restaurant.name}`;
  const [menus, setMenus] = useState(initialMenus);

  const debouncedHandleSearch = useCallback(
    debounce((val) => handleSearch(val), 300),
    []
  );

  const handleSearch = (val) => {
    if (val === "") {
      setMenus(initialMenus);
    } else {
      const newMenus = Object.keys(initialMenus).map((key) => {
        const newItemsKeys = Object.keys(initialMenus[key].items).filter(
          (itemKey) => {
            const currentItem = initialMenus[key].items[itemKey];
            return (
              currentItem.name.toLowerCase().includes(val.toLowerCase()) ||
              currentItem.description.toLowerCase().includes(val.toLowerCase())
            );
          }
        );

        const menu = {
          ...initialMenus[key],
          items: {},
        };

        newItemsKeys.forEach((item) => {
          if (initialMenus[key].items[item]) {
            menu.items[item] = initialMenus[key].items[item];
          }
        });

        return menu;
      });
      setMenus(newMenus.filter((menu) => Object.keys(menu.items).length > 0));
    }
  };

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
        <TextInput
          onChangeText={(val) => debouncedHandleSearch(val)}
          placeholder={placeholderText}
          className="ml-2 flex-1"
        />
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
