import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function Spinner(props) {
  return (
    <View className="flex-row flex-1 justify-center items-center" {...props}>
      <ActivityIndicator size="large" />
    </View>
  );
}
