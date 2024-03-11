import {View, Text, TextInput, ScrollView, SafeAreaView, TouchableOpacity} from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import BackButton from "../components/backButton";
import ReservationCard from "../components/reservationCard";

export default function UserProfileScreen() {
    const navigation= useNavigation();
    return(
        
        <SafeAreaView className="bg-white flex-1"> 
                <BackButton/>
                
                <View style={{ flexDirection: 'row', alignItems: 'center' }} className="mt-14 pb-8">
                    <Text style={{fontSize: 44}} className="font-bold ml-3 text-black"> Your</Text>
                    <Text style={{fontSize: 44}} className="font-thin text-black"> Profile</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('UserAppearance')} className="pb-3">
                        <Text style={{color: themeColors.text}} className="font-bold ml-6 text-3xl">
                        Appearance
                        </Text>
                    </TouchableOpacity >
                    <Icon.Droplet className="ml-2 mb-2"strokeWidth={3} stroke={themeColors.bgColor(1)}/>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('UserReservations')} className="pb-3">
                        <Text style={{color: themeColors.text}} className="font-bold ml-6 text-3xl">
                        Reservations
                        </Text>
                    </TouchableOpacity>
                    <Icon.Clock className="ml-3 mb-2"strokeWidth={3} stroke={themeColors.bgColor(1)}/>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('UserFinance')} className="pb-3">
                        <Text style={{color: themeColors.text}} className="font-bold ml-6 text-3xl">
                        Finance
                        </Text>
                    </TouchableOpacity>
                    <Icon.DollarSign className="ml-3 mb-3"strokeWidth={3} stroke={themeColors.bgColor(1)}/>
                </View>

                <View className="ml-6 pt-6 pb-2">
                    <Text className="text-2xl font-thin font-s">Your next reservation</Text>
                </View>

                <ReservationCard/>
                
                <View style={{ flexDirection: 'row', alignItems: 'center'}} className="absolute bottom-20">
                    <TouchableOpacity onPress={()=>navigation.navigate('UserSettings')} className="pb-3">
                        <Text style={{color: themeColors.text}} className="font-bold ml-6 text-3xl">
                        Settings
                        </Text>
                    </TouchableOpacity>
                    <Icon.Settings className="ml-3 mb-3"strokeWidth={3} stroke={themeColors.bgColor(1)}/>
                </View>

        </SafeAreaView>
    )
}