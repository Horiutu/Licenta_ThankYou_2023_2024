import {SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, TextInput} from "react-native";
import React from "react";
import { LoginSVG } from "../assets/images/login.svg";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";


export default function LoginScreen() {
    const navigation= useNavigation();
    return(
        <SafeAreaView className="flex-1 justify-center"> 
                
            <TouchableOpacity 
                onPress={()=>navigation.goBack()}
                className="absolute w-14 ml-3 items-center top-14 left-3 bg-gray-50 p-1 rounded-full shadow">
                    <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)}/>
            </TouchableOpacity>
            
            <View className="px-25 ml-3">
                           
                <Text className="font-bold ml-3 text-4xl mb-30 mt-10"> Log In</Text>
        
                <View className="flex-row ml-4 mr-7 border-neutral-300 p-1 mt-6 border-b-2 pb-2 ">
                    <Icon.Mail className="mr-3" width={30} height={30} stroke={themeColors.bgColor(1)}/>
                    <TextInput autoCapitalize="none" keyboardType="email-address" placeholder="Email"/>
                </View>

                <View className="flex-row ml-4 mr-7 border-neutral-300 p-1 mt-6 border-b-2 pb-2 ">
                    <Icon.Lock className="mr-3" width={30} height={30} stroke={themeColors.bgColor(1)}/>
                    <TextInput style={{width: '80%', flex: 1, paddingVertical: 0}} placeholder="Password" secureTextEntry={true}/>
                    <TouchableOpacity>
                        <Text style={{color: themeColors.text}} className="font-semibold mt-2">Forgot?</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="absolute bottom-36 w-full z-50">
                <TouchableOpacity
                style={{backgroundColor: themeColors.bgColor(1)}}
                onPress={()=>navigation.navigate('Home')}
                className="flex-row justify-center items-center mx-7 rounded-r-lg rounded-l-lg py-3 shadow-lg shadow">
                    <View>
                        <Text className="flex-1 text-center font-extrabold text-white text-lg">
                            Log In
                        </Text>
                    </View>
                </TouchableOpacity>

                <View className="py-2 items-center">
                    <Text className="text-gray-600">Or, if you don't have an account... </Text>
                </View>

                <TouchableOpacity onPress={()=>navigation.navigate('Register')}
                className="items-center">
                        <Text style={{color: themeColors.text}} className="font-bold text-2xl mt-2">Register</Text>
                </TouchableOpacity>

            </View>
            
           
        </SafeAreaView>
    )
}
