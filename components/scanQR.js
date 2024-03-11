import { View, Text, TouchableOpacity} from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme"

export default function ScanQR() {
    const navigation = useNavigation();
    return(
        <View className="absolute bottom-5 w-full z-50">
            <TouchableOpacity
            style={{backgroundColor: themeColors.bgColor(1)}}
            onPress={()=> navigation.navigate('Login')}
            className="flex-row justify-center items-center mx-5 rounded-r-lg rounded-l-lg p-4 py-3 mb-2 shadow-lg shadow">
                <View>
                    <Text className="flex-1 text-center font-extrabold text-white text-lg">
                        Scan QR 
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}