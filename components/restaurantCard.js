import {View, Image, Text, TouchableWithoutFeedback} from "react-native";
import React from "react";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";

export default function RestaurantCard({item}) {
    
  const navigation = useNavigation();
    return(
       <TouchableWithoutFeedback onPress={()=> navigation.navigate('Restaurant', {...item})}>
         <View
            className="mr-6 bg-white rounded-3xl shadow-lg">
          <Image  className="h-36 w-64 rounded-t-3xl" source={item.image} />
        <View className="px-3 pb-4 space-y-2">
          <Text className="text-lg font-bold pt-2">{item.name}</Text>
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
      
       </TouchableWithoutFeedback>
    )
}