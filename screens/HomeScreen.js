import {View, Text, TextInput, ScrollView, SafeAreaView, TouchableOpacity} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import Categories from "../components/categories";
import FeaturedRow from "../components/featuredRow";
import { featured } from "../constants/index";
import ScanQR from "../components/scanQR";
import { useState } from 'react';
import DropDownMenu from '../components/dropdownmenuhome';
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
    const navigation = useNavigation();
    return(
        <SafeAreaView className="bg-white">
            <StatusBar barStyle="dark-content"/>
            <View className="flex-row items-center space-x-2 px-4 pb-2">
                <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
                    <Icon.Search height="15" width="15" stroke="black"/>
                    <TextInput placeholder='Search restaurants' className="ml-2 flex-1"/>
                    <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
                        <Icon.MapPin height="15" width="15" stroke="black"/>
                        <Text className="text-black">Location</Text>
                    </View>
                </View>
                <View style={{backgroundColor: themeColors.bgColor(1)}} className="ml-3 p-3 rounded-full">
                    <TouchableOpacity onPress={()=> navigation.navigate('UserProfile')}>  
                        <Icon.User height="15" width="25" strokeWidth={2.5} stroke= "white"/>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} 
            contentContainerStyle={{
                paddingBottom: 20
            }}>
                <Categories/>
            </ScrollView>

            <View className="mt-1">
                {
                    [featured].map((item, index)=>{
                        return(
                            <FeaturedRow
                            key={index}
                            title={item.title}
                            restaurants={item.restaurants}
                            description={item.description}
                            />
                        )
                    }
                    )
                }

            </View>

            <View className="bg-white mt-80 shadow shadow-lg">
                <ScanQR/>
            </View>
            
        </SafeAreaView>
    )
}