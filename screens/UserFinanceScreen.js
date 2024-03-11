import {View, Text, TextInput, ScrollView, SafeAreaView, TouchableOpacity} from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import BackButton from "../components/backButton";
import CreditCard from "../components/creditcards";

export default function UserFinanceScreen() {
    const navigation= useNavigation();
    return(
        <SafeAreaView className="bg-white flex-1 justify-start"> 
           
           <BackButton/>

            <View style={{ flexDirection: 'row', alignItems: 'center' }} className="my-12">
                <Text style={{fontSize: 44, color: themeColors.text}} className="font-bold ml-6 text-white">Finance</Text>
            </View>

            <View className="ml-6 pb-2">
                    <Text className="text-2xl font-thin font-s">Your cards</Text>
            </View>

            <CreditCard/>

            <View className="ml-6 pb-2">
                    <Text className="text-2xl font-thin font-s">Your payments</Text>
            </View>

        </SafeAreaView>
    )
}