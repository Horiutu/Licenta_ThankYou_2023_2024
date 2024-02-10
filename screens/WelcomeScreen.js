import {SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, TextInput} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";


export default function WelcomeScreen() {
    const navigation= useNavigation();
    return(
        <SafeAreaView className="bg-stone-900">
            <View className="bg-cyan-900 flex-1 pb-9">
                <Image source={require("../assets/images/Restaurant.jpeg")}
                    style={{
                        resizeMode: 'cover',
                        height: 400,
                        width: 600,
                    }}
                    />
            </View>
            <View className="mt-80 pt-2 bg-stone-900 rounded-3xl h-full"> 
                <View className="py-6 items-center justify-center">
                    <Text style={{color: themeColors.text}} className=" font-light text-red-500 text-4xl pt-2 justify-center"> Welcome</Text>
                </View>

                <View className="mx-6 py-2">
                    <TouchableOpacity onPress={()=>navigation.navigate('Login')}
                            style={{backgroundColor: themeColors.bgColor(1)}}
                            className="bg-red-500 items-center py-3 rounded-lg">
                            <Text className="font-bold text-white text-2xl">Log In</Text>
                    </TouchableOpacity>
                </View>

                <View className="mx-6 py-0.5">
                    <TouchableOpacity onPress={()=>navigation.navigate('Register')}
                            style={{backgroundColor: themeColors.bgColor(1)}}
                            className="bg-red-500 items-center py-3">
                            <Text className="font-bold text-white text-2xl">Register</Text>
                    </TouchableOpacity>
                </View>

                <View className="pt-4 items-center">
                    <TouchableOpacity onPress={()=>navigation.navigate('LogInBusinessScreen')}>
                        <Text style={{color: themeColors.text}} className="text-2xl">Business Log In</Text>
                    </TouchableOpacity>
                </View>

                <View className="items-center pt-6">
                    <Text className="text-gray-400 justify-center">Or scan QR only</Text>
                </View>

                <View className="mx-6 pt-2">
                    <TouchableOpacity onPress={()=>navigation.navigate('Home')}
                            className="border border-2 border-white items-center py-2 rounded-lg">
                            <Text className="font-semibold text-white text-2xl">Scan QR</Text>
                    </TouchableOpacity>
                </View>
             </View>
        </SafeAreaView>
    )
}
