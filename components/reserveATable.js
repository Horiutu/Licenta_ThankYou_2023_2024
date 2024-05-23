import {
  View,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Linking,
  Alert,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { TouchableOpacity } from "react-native";
import NumberSelector from "./numberPicker";
import DateSelector from "./datePicker";

export default function ReserveATable() {
  const navigation = useNavigation();

  return (
    <View
      className="bg-white"
      style={{
        borderTopColor: themeColors.bgColor(1),
        borderTopWidth: 2,
        borderBottomColor: themeColors.bgColor(1),
        borderBottomWidth: 2,
      }}
    >
      <View className="flex-row ml-7 mr-7 border-red-500 mt-8 border-b-2 pb-1 mb-2">
        <Icon.User
          className="mr-3"
          width={30}
          height={30}
          stroke={themeColors.bgColor(1)}
        />
        <TextInput placeholderTextColor="black" placeholder="Name" />
      </View>
      <View
        className="ml-6  mb-2"
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Icon.User
          className=""
          width={30}
          height={30}
          stroke={themeColors.bgColor(1)}
        />
        <Icon.User
          className=""
          width={30}
          height={30}
          stroke={themeColors.bgColor(1)}
        />
        <NumberSelector text="Nr. of persons" />
      </View>

      <View className="ml-7 mb-2">
        <DateSelector />
      </View>

      <View className="flex-row ml-7 mr-7 border-red-500 border-b-2 pb-1 mb-2">
        <Icon.Plus
          className="mr-3"
          width={30}
          height={30}
          stroke={themeColors.bgColor(1)}
        />
        <TextInput placeholderTextColor="black" placeholder="Special Request" />
      </View>
      <View
        className="items-center mt-6 justify-center"
        style={{ marginBottom: 400 }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: themeColors.bgColor(1),
            paddingHorizontal: 95,
          }}
          className="py-1 rounded-lg"
        >
          <Text className="font-bold text-white text-lg">Send the request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
