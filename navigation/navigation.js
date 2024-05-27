import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import HomeScreen from "../screens/HomeScreen";
import RestaurantScreen from "../screens/RestaurantScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import AllSetScreen from "../screens/AllSetScreen";
import LogInBusinessScreen from "../screens/LogInBusinessScreen";
import BusinessHomeScreen from "../screens/BusinessHomeScreen";
import BusinessAppearanceScreen from "../screens/BusinessAppearanceScreen";
import BusinessDetailsScreen from "../screens/BusinessDetailsScreen";
import BusinessMenuScreen from "../screens/BusinessMenuScreen";
import BusinessOrdersScreen from "../screens/BusinessOrdersScreen";
import BusinessReservationsScreen from "../screens/BusinessReservationsScreen";
import BusinessScheduleScreen from "../screens/BusinessScheduleScreen";
import BusinessSettingsScreen from "../screens/BusinessSettingsScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import UserAppearanceScreen from "../screens/UserAppearanceScreen";
import UserReservationsScreen from "../screens/UserReservationsScreen";
import UserFinanceScreen from "../screens/UserFinanceScreen";
import UserSettingsScreen from "../screens/UserSettingsScreen";
import withAuthRedirect from "./withAuthRedirect";
import QRCodeScreen from "../screens/QRCodeScreen";
import LeaderboardRestaurantsAllScreen from "../screens/LeaderboardRestaurantsAllScreen";
import PopularRestaurantsAllScreen from "../screens/PopularRestaurantsAllScreen";
import * as Linking from 'expo-linking';
import LocalRestaurantScreen from "../screens/LocalRestaurantScreen";
import CartScreen from "../screens/CartScreen";
import ReservationPageScreen from "../screens/ReservationPageScreen";
import SessionRestaurantMenuScreen from "../screens/SessionRestaurantMenuScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";

const prefix = Linking.createURL('/');
const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [data, setData] = useState(null);

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Welcome: "welcome",
        LocalRestaurant: "restaurant/:restaurantId"
      }
    }
  };

  const handleDeepLink = (event) => {
    let data = Linking.parse(event.url);
    setData(data);
  };

  useEffect(() => {
    const getInitialURL = async () => {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) {
        setData(Linking.parse(initialURL));
      }
    };

    Linking.addEventListener('url', handleDeepLink);

    if (!data) {
      getInitialURL();
    }

    return () => {
      if (Linking.removeEventListener) {
        Linking.removeEventListener('url');
      }
    };
  }, []);


  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="SessionRestaurantScreen"
          component={SessionRestaurantMenuScreen}
        />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={withAuthRedirect(HomeScreen)} />
        <Stack.Screen name="QR" component={QRCodeScreen} />
        <Stack.Screen name="Restaurant" component={RestaurantScreen} />
        <Stack.Screen name="LocalRestaurant" component={LocalRestaurantScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen
          name="UserProfile"
          component={withAuthRedirect(UserProfileScreen)}
        />
        <Stack.Screen name="UserAppearance" component={UserAppearanceScreen} />
        <Stack.Screen
          name="UserReservations"
          component={UserReservationsScreen}
        />
        <Stack.Screen
          name="ReservationPage"
          component={ReservationPageScreen}
        />
        <Stack.Screen name="UserFinance" component={UserFinanceScreen} />
        <Stack.Screen name="UserSettings" component={UserSettingsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="AllSet" component={AllSetScreen} />
        <Stack.Screen
          name="LogInBusinessScreen"
          component={LogInBusinessScreen}
        />
        <Stack.Screen name="BusinessHome" component={BusinessHomeScreen} />
        <Stack.Screen
          name="BusinessAppearance"
          component={BusinessAppearanceScreen}
        />
        <Stack.Screen
          name="BusinessDetails"
          component={BusinessDetailsScreen}
        />
        <Stack.Screen name="BusinessMenu" component={BusinessMenuScreen} />
        <Stack.Screen name="BusinessOrders" component={BusinessOrdersScreen} />
        <Stack.Screen
          name="BusinessReservations"
          component={BusinessReservationsScreen}
        />
        <Stack.Screen
          name="LeaderboardAll"
          component={LeaderboardRestaurantsAllScreen}
        />
        <Stack.Screen
          name="PopularAll"
          component={PopularRestaurantsAllScreen}
        />
        <Stack.Screen
          name="BusinessSchedule"
          component={BusinessScheduleScreen}
        />
        <Stack.Screen
          name="BusinessSettings"
          component={BusinessSettingsScreen}
        />
        <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
