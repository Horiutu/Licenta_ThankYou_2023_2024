import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { themeColors } from "../theme";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-stone-900">
      <View className="bg-cyan-900 flex-1 pb-9">
        <Image
          source={require("../assets/images/Restaurant.jpeg")}
          style={styles.imageCover}
        />
      </View>
      <View className="mt-80 pt-2 bg-stone-900 rounded-3xl h-full">
        <View className="py-6 items-center justify-center">
          <Text
            style={{ color: themeColors.text }}
            className=" font-light text-red-500 text-4xl pt-2 justify-center"
          >
            {" "}
            Welcome
          </Text>
        </View>

        <View className="mx-6 py-2">
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{ backgroundColor: themeColors.bgColor(1) }}
            className="bg-red-500 items-center py-2 rounded-lg"
          >
            <Text className="font-semi text-white text-2xl">Log In</Text>
          </TouchableOpacity>
        </View>

        <View className="mx-6 py-0.5">
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={{ backgroundColor: themeColors.bgColor(1) }}
            className="bg-red-500 items-center rounded-lg py-2"
          >
            <Text className="font-semi text-white text-2xl">Register</Text>
          </TouchableOpacity>
        </View>

        <View className="pt-4 items-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("LogInBusinessScreen")}
          >
            <Text style={{ color: themeColors.text }} className="text-2xl">
              Business Log In
            </Text>
          </TouchableOpacity>
        </View>

        <View className="items-center mt-10">
          <Image
            source={require("../assets/images/Logo_TY.png")}
            style={{
              height: 60,
              width: 100,
              tintColor: themeColors.bgColor(1),
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageCover: {
    resizeMode: "cover",
    height: 400,
    width: 600,
  },
  redButtons: {},
});
