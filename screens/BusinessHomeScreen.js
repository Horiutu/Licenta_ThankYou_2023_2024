import {View, Text, TextInput, ScrollView, SafeAreaView, TouchableOpacity} from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";



export default function BusinessHomeScreen() {
    
    return(
        <SafeAreaView className="bg-stone-900 flex-1 justify-center"> 
            <TouchableOpacity 
                    onPress={()=>navigation.goBack()}
                    className="absolute w-24 ml-3 items-center top-14 left-3 bg-white py-1 rounded-full">
                        <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)}/>
            </TouchableOpacity>

            <View className="flex-1">
                <View style={{ flexDirection: 'row', alignItems: 'center' }} className="mt-14 py-8">
                    <Text className="font-bold ml-4 text-white text-4xl"> Your</Text>
                    <Text className="font-thin text-white text-4xl"> Business</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity className="pb-3">
                        <Text style={{color: themeColors.text}} className="font-bold ml-6 text-3xl">
                        Appearance
                        </Text>
                    </TouchableOpacity>
                    <Icon.Droplet className="ml-2 mb-2"strokeWidth={3} stroke={themeColors.bgColor(1)}/>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity className="pb-3">
                        <Text style={{color: themeColors.text}} className="font-bold ml-6 text-3xl">
                        Menu
                        </Text>
                    </TouchableOpacity>
                    <Icon.BookOpen className="ml-3 mb-2"strokeWidth={3} stroke={themeColors.bgColor(1)}/>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity className="pb-3">
                        <Text style={{color: themeColors.text}} className="font-bold ml-6 text-3xl">
                        Schedule
                        </Text>
                    </TouchableOpacity>
                    <Icon.Clock className="ml-3 mb-2"strokeWidth={3} stroke={themeColors.bgColor(1)}/>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity className="pb-3">
                        <Text style={{color: themeColors.text}} className="font-bold ml-6 text-3xl">
                        Details
                        </Text>
                    </TouchableOpacity>
                    <Icon.Clipboard className="ml-3 mb-3"strokeWidth={3} stroke={themeColors.bgColor(1)}/>
                </View>

                <TouchableOpacity className="absolute bottom-44 pb-3">
                    <Text style={{color: themeColors.text2}} className="font-bold ml-6 text-3xl">
                    Orders Now
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity className="absolute bottom-32 pb-3">
                    <Text style={{color: themeColors.text2}} className="font-bold ml-6 text-3xl">
                    Reservations                    
                    </Text>
                </TouchableOpacity>
                
                <View style={{ flexDirection: 'row', alignItems: 'center'}} className="absolute bottom-20">
                    <TouchableOpacity className="pb-3">
                        <Text style={{color: themeColors.text}} className="font-bold ml-6 text-3xl">
                        Settings
                        </Text>
                    </TouchableOpacity>
                    <Icon.Settings className="ml-3 mb-3"strokeWidth={3} stroke={themeColors.bgColor(1)}/>
                </View>
            </View>
        </SafeAreaView>
    )
}