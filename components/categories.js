import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";
import { categories } from "../constants/index";
import { themeColors } from "../theme";

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <View className="mt-2">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible w-15 h-15"
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {categories.map((category, index) => {
          let isActive = category.id == activeCategory;
          let btnClass = isActive ? "bg-gray-600" : "bg-gray-200";
          let textClass = isActive
            ? "font-semibold text-gray-800"
            : "text-gray-500";

          return (
            <View key={index} className="flex justify-center items-center mr-2">
              <TouchableOpacity
                className="p-2 rounded-full shadow bg-white "
                style={{ borderWidth: 2, borderColor: themeColors.bgColor(1) }}
                onPress={() => setActiveCategory(category.id)}
              >
                <Text style={{ color: themeColors.text }} className="px-2">
                  {category.name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
