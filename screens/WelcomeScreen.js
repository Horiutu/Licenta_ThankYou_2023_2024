import {SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, TextInput} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";


export default function WelcomeScreen() {
    const navigation= useNavigation();
    return(
        <View className="mx-4">
                <View className="ml-2 py-4 pt-44">
                    <Text style={{color: themeColors.text}} className="font-bold text-red-500 text-4xl pt-64"> Welcome</Text>
                </View>

                <View className="mx-4 ">
                    <TouchableOpacity onPress={()=>navigation.navigate('Login')}
                    style={{textColor: themeColors.bgColor(1)}}
                            className="border border-4 border-red-500 items-center px-4 py-2 rounded-lg">
                            <Text style={{color: themeColors.text}} className="font-semibold text-2xl">Log In</Text>
                    </TouchableOpacity>
                </View>

                <View className="mx-4 pt-4 pb-2">
                    <TouchableOpacity onPress={()=>navigation.navigate('Register')}
                            style={{backgroundColor: themeColors.bgColor(1)}}
                            className="bg-red-500 items-center px-4 py-3 rounded-lg">
                            <Text className="font-semibold text-white text-2xl">Register</Text>
                    </TouchableOpacity>
                </View>

                <View className="items-center pt-8">
                    <Text className="text-gray-600 justify-center">Or scan QR only</Text>
                </View>

                <View className="mx-4 pt-2 pb-2">
                    <TouchableOpacity onPress={()=>navigation.navigate('Home')}
                            className="border border-4 border-black-500 items-center px-4 py-2 rounded-lg">
                            <Text className="font-semibold text-black text-2xl">Scan QR</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}
