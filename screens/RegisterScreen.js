import {SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, TextInput} from "react-native";
import React from "react";
import { LoginSVG } from "../assets/images/login.svg";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";

export default function RegisterScreen() {
    const navigation= useNavigation();
    
    return(
        <SafeAreaView className="bg-stone-900 flex-1 justify-center"> 
                
            <TouchableOpacity 
                onPress={()=>navigation.goBack()}
                className="absolute w-16 ml-3 items-center top-14 left-3 bg-gray-50 p-1 rounded-full">
                    <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)}/>
            </TouchableOpacity>
            
            <View className="px-25 mb-64 ml-3 ">
                <Text className="font-bold ml-3 text-white text-4xl mb-30 mt-10"> Register</Text>
        
                <View className="flex-row ml-4 mr-7 border-neutral-300 p-1 mt-6 border-b-2 pb-2 ">
                    <Icon.Mail className="mr-3" width={30} height={30} stroke={themeColors.bgColor(1)}/>
                    <TextInput style={{ color: 'white' }} autoCapitalize="none" placeholderTextColor='white' autoCompleteType="email" keyboardType="email-address" placeholder="Email"/>
                </View>

                <View className="flex-row ml-4 mr-7 border-neutral-300 p-1 mt-6 border-b-2 pb-2 ">
                    <Icon.User className="mr-3" width={30} height={30} stroke={themeColors.bgColor(1)}/>
                    <TextInput style={{ color: 'white' }} autoCapitalize="words" placeholderTextColor='white' autoCompleteType="name" keyboardType="name-phone-pad" placeholder="Full Name"/>
                </View>

                <View className="flex-row ml-4 mr-7 border-neutral-300 p-1 mt-6 border-b-2 pb-2 ">
                    <Icon.Lock className="mr-3" width={30} height={30} stroke={themeColors.bgColor(1)}/>
                    <TextInput style={{color: 'white', width: '80%', flex: 1, paddingVertical: 0}} placeholderTextColor='white' placeholder="Password" secureTextEntry={true}/>
                </View>

                <View className="flex-row ml-4 mr-7 border-neutral-300 p-1 mt-6 border-b-2 pb-2 ">
                    <Icon.Lock className="mr-3" width={30} height={30} stroke={themeColors.bgColor(1)}/>
                    <TextInput style={{color: 'white', width: '80%', flex: 1, paddingVertical: 0}} placeholderTextColor='white' placeholder="Confirm Password" secureTextEntry={true}/>
                </View>
            </View>

            <View className="absolute bottom-56 mb-16 w-full z-50">
                <TouchableOpacity
                onPress={()=> navigation.navigate('Home')}
                className="bg-white flex-row pt-8 justify-center items-center mx-7 rounded-r-lg rounded-l-lg py-3">
                    <Image source={require("../assets/images/googlepng.png")}
                    style={{
                        height: 24,
                        width: 24,
                    }}
                    />
                </TouchableOpacity>
            </View>

            <View className="absolute bottom-56 pt-10 w-full z-50">
                <TouchableOpacity
                style={{backgroundColor: themeColors.bgColor(1)}}
                onPress={()=> navigation.navigate('Home')}
                className="flex-row justify-center items-center mx-7 rounded-r-lg rounded-l-lg py-3">
                    <View>
                        <Text className="flex-1 text-center font-extrabold text-white text-lg">
                            Register
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            
           
        </SafeAreaView>
    )
}
