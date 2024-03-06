import {View, Text, TextInput, ScrollView, SafeAreaView, TouchableOpacity} from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import BackButton from "../components/backButton";

export default function UserReservationsScreen() {
    const navigation= useNavigation();
    return(
        <SafeAreaView className="bg-white flex-1 justify-center"> 
           
           <BackButton/>

            <View style={{ flexDirection: 'row', alignItems: 'center' }} className="absolute top-28">
                <Text style={{fontSize: 44, color: themeColors.text}} className="font-bold ml-3 text-white"> Reservations</Text>
            </View>

        </SafeAreaView>
    )
}