import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import HomeScreen from "../screens/HomeScreen";
import AllRestaurantsScreen from "../screens/AllRestaurants";
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
import ReservationDetailsScreen from "../screens/BusinessReservationDetails";
import BusinessScheduleScreen from "../screens/BusinessScheduleScreen";
import BusinessSettingsScreen from "../screens/BusinessSettingsScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import UserOrdersScreen from "../screens/UserOrdersScreen";
import UserReservationsScreen from "../screens/UserReservationsScreen";
import UserFinanceScreen from "../screens/UserFinanceScreen";
import UserSettingsScreen from "../screens/UserSettingsScreen";
import QRCodeScreen from "../screens/QRCodeScreen";
import LeaderboardRestaurantsAllScreen from "../screens/LeaderboardRestaurantsAllScreen";
import PopularRestaurantsAllScreen from "../screens/PopularRestaurantsAllScreen";
import * as Linking from "expo-linking";
import LocalRestaurantScreen from "../screens/LocalRestaurantScreen";
import CartScreen from "../screens/CartScreen";
import ReservationPageScreen from "../screens/ReservationPageScreen";
import SessionRestaurantMenuScreen from "../screens/SessionRestaurantMenuScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
import UserOrderDetailsScreen from "../components/userOrderDetails";
import { useAuth } from "../hooks/useAuth";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import Spinner from "../components/spinner";
import AsyncStorage from "@react-native-async-storage/async-storage";

const prefix = Linking.createURL("/");
const Stack = createNativeStackNavigator();

function PendingScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem("businessInfo")
      .then((res) => {
        const businessInfo = JSON.parse(res);
        if (businessInfo.isBusinessAccount) {
          console.log("here");
          navigation.navigate("BusinessHome");
        } else {
          navigation.navigate("Home");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return <Spinner className="bg-stone-900 flex-1 justify-center" />;
}

export default function Navigation() {
  const [data, setData] = useState(null);
  const user = useAuth();

  console.log(JSON.stringify(user, null, 2));

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Welcome: "welcome",
        LocalRestaurant: "restaurant/:restaurantId",
      },
    },
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

    Linking.addEventListener("url", handleDeepLink);

    if (!data) {
      getInitialURL();
    }

    return () => {
      if (Linking.removeEventListener) {
        Linking.removeEventListener("url");
      }
    };
  }, []);

  const renderStackScreens = () => {
    if (!user) {
      return (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="LogInBusinessScreen"
            component={LogInBusinessScreen}
          />
          <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
        </>
      );
    } else {
      return (
        <>
          <Stack.Screen
            name="Pending"
            component={PendingScreen}
            options={{ animation: "none" }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ animation: "none" }}
          />
          <Stack.Screen
            name="SessionRestaurantScreen"
            component={SessionRestaurantMenuScreen}
          />
          <Stack.Screen name="QR" component={QRCodeScreen} />
          <Stack.Screen
            name="AllRestaurants"
            component={AllRestaurantsScreen}
          />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen
            name="LocalRestaurant"
            component={LocalRestaurantScreen}
          />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />
          <Stack.Screen name="UserOrders" component={UserOrdersScreen} />
          <Stack.Screen
            name="UserOrderDetails"
            component={UserOrderDetailsScreen}
          />
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
          <Stack.Screen name="AllSet" component={AllSetScreen} />
          <Stack.Screen
            name="LeaderboardAll"
            component={LeaderboardRestaurantsAllScreen}
          />
          <Stack.Screen
            name="PopularAll"
            component={PopularRestaurantsAllScreen}
          />
          <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
          <Stack.Screen
            name="BusinessHome"
            component={BusinessHomeScreen}
            options={{ animation: "none" }}
          />
          <Stack.Screen
            name="BusinessAppearance"
            component={BusinessAppearanceScreen}
          />
          <Stack.Screen
            name="BusinessDetails"
            component={BusinessDetailsScreen}
          />
          <Stack.Screen
            name="ReservationDetails"
            component={ReservationDetailsScreen}
          />
          <Stack.Screen name="BusinessMenu" component={BusinessMenuScreen} />
          <Stack.Screen
            name="BusinessOrders"
            component={BusinessOrdersScreen}
          />
          <Stack.Screen
            name="BusinessReservations"
            component={BusinessReservationsScreen}
          />
          <Stack.Screen
            name="BusinessSchedule"
            component={BusinessScheduleScreen}
          />
          <Stack.Screen
            name="BusinessSettings"
            component={BusinessSettingsScreen}
          />
        </>
      );
    }
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        {renderStackScreens()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
