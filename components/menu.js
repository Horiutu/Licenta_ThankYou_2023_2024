import { View, Text, TextInput, Image } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";
import { useNavigation } from "@react-navigation/native";

export default function Menu({ menus, restaurant }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const placeholderText = `Search in ${restaurant.name}`;

  const handleAddToCart = (product) => {
    dispatch(addItemToCart({ product, restaurant }));
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
              <Text className="font-bold text-sm mx-8 mt-2">
                {itemData.description}
              </Text>
              <Image
                className="w-10/12 h-52 self-center rounded-r-2xl mt-4"
                source={{ uri: itemData.imageUrl }}
              />
              <Text className="font-bold text-xl ml-8 mt-4 mb-4">
                {itemData.price} lei
              </Text>
              <TouchableOpacity
                onPress={() => handleAddToCart({ ...itemData, id: itemKey })}
                style={{ backgroundColor: themeColors.bgColor(1) }}
                className="py-1 mx-8 items-center mb-8 rounded-lg"
              >
                <Icon.Plus strokeWidth={2} stroke="white" />
              </TouchableOpacity>
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
