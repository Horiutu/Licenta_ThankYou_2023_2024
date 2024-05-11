import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
import React from "react";
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

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="QR" component={QRCodeScreen} />
        <Stack.Screen name="Restaurant" component={RestaurantScreen} />
        <Stack.Screen
          name="UserProfile"
          component={withAuthRedirect(UserProfileScreen)}
        />
        <Stack.Screen name="UserAppearance" component={UserAppearanceScreen} />
        <Stack.Screen
          name="UserReservations"
          component={UserReservationsScreen}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
