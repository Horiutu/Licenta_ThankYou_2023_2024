import {View, ScrollView, Image, Text, TouchableOpacity} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors} from "../theme"

export default function RestaurantScreen() {
    const {params} = useRoute();
    let item = params;
    const navigation= useNavigation();
    return(
        <View>
            <ScrollView>
                <View className="relative">
                    <Image className="w-full h-72" source={item.image}/>
                    <TouchableOpacity 
                    onPress={()=>navigation.goBack()}
                    className="absolute w-14 items-center top-14 left-3 bg-gray-50 p-1 rounded-full shadow">
                        <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)}/>
                    </TouchableOpacity>
                </View>
                <View
                style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}}
                className="bg-white -mt-12 pt-6">
                    <View className="px-5">
                        <Text className="ml-3 text-3xl font-bold pb-2">{item.name}</Text>
                        <View className="flex-row space-x-2 my-1">
                            <View className="px-3 pb-4 space-y-2">
                            <View className="flex-row items-center space-x-1">
                                <Image source={require('../assets/images/fullStar.png')} className="h-4 w-4" />
                                <Text className="text-xs">
                                    <Text className="text-gray">{item.stars}</Text>
                                    <Text className="text-gray-700"> ({item.reviews} reviews)</Text> · <Text className="font-semibold text-gray-700">{item.category}</Text>
                                </Text>
                            </View>
                            <View className="flex-row items-center space-x-1">
                                <Icon.MapPin color="gray" width={15} height={15} />
                                <Text className="text-gray-700 text-xs"> Nearby · {item.address}</Text>
                            </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}