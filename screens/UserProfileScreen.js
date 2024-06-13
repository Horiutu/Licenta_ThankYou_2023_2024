import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { themeColors } from "../theme";
import ReservationCard from "../components/reservationCard";
import { isUserAuthenticated, logout } from "../services/userSignIn";
import BackButtonBlack from "../components/backButtonBlack";
import { useState, useEffect } from "react";
import { FIREBASE_AUTH } from "../services/config";
import Spinner from "../components/spinner";
import { useAuth } from "../hooks/useAuth";
import { useAuth2 } from "../hooks/useAuth2";
import { getAuth, updateProfile } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { child, get, getDatabase, ref } from "firebase/database";

export default function UserProfileScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();

  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(true);

  if (!isUserLogged) {
    navigation.navigate("Welcome");
  }

  const [userName, setUserName] = useState(auth.displayName);
  const [userId, setUserId] = useState(auth.uid);
  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [nextReservation, setNextReservation] = useState([]);
  const [nextReservationRestaurant, setNextReservationRestaurant] = useState(
    []
  );
  const [countReservations, setCountReservations] = useState(0);
  const [countOrders, setCountOrders] = useState(0);

  useEffect(() => {
    isUserAuthenticated()
      .then((isLoggedIn) => {
        setIsUserLogged(isLoggedIn);
        setUserName(auth.displayName);
        setUserId(auth.uid);
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });

    const dbRef = ref(getDatabase());

    get(child(dbRef, `reservations`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const reservationsArr = [];
          const data = snapshot.val();

          try {
            Object.keys(data).forEach((restaurantId) => {
              Object.keys(data[restaurantId]).forEach((reservationId) => {
                const reservation = data[restaurantId][reservationId];
                if (reservation.userId == userId) {
                  reservationsArr.push({
                    ...reservation,
                    reservationId,
                  });
                }
              });
            });
          } catch (error) {
            console.error(error);
          }

          const today = new Date();
          reservationsArr.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (dateA >= today && dateB >= today) {
              return dateA - dateB;
            } else if (dateA < today && dateB < today) {
              return dateB - dateA;
            } else if (dateA >= today) {
              return -1;
            } else {
              return 1;
            }
          });

          const nextReservationItem =
            reservationsArr.find(
              (reservation) => reservation.status === "Accepted"
            ) || reservationsArr[0];

          if (nextReservationItem) {
            const restId = nextReservationItem.restaurantId;
            const restaurant = params.allRestaurants.find(
              (r) => r.id === restId
            );
            setNextReservation(nextReservationItem);
            setNextReservationRestaurant(restaurant);
          }

          setReservations(reservationsArr);
          setCountReservations(reservationsArr.length);
        } else {
          console.log("No data");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    get(child(dbRef, `orders`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const ordersArr = [];
          const data = snapshot.val();

          try {
            Object.keys(data).forEach((restaurantId) => {
              Object.keys(data[restaurantId]).forEach((orderId) => {
                const order = data[restaurantId][orderId];

                if (order.userId === userId) {
                  ordersArr.push({ ...order, orderId });
                }
              });
            });

            const today = new Date();
            ordersArr.sort((a, b) => {
              const dateA = new Date(a.date);
              const dateB = new Date(b.date);
              if (dateA >= today && dateB >= today) {
                return dateA - dateB;
              } else if (dateA < today && dateB < today) {
                return dateB - dateA;
              } else if (dateA >= today) {
                return -1;
              } else {
                return 1;
              }
            });

            if (ordersArr.length > 0) {
              const restId = ordersArr[0].restaurantId;
              const restaurant = params.allRestaurants.find(
                (r) => r.id === restId
              );
            }
            setOrders(ordersArr);
            setCountOrders(ordersArr.length);
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log("No data");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isUserLogged, loading]);

  const handleLogout = async () => {
    try {
      await logout();
      setLoading(!loading);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  if (!auth || loading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView className="bg-white flex-1">
      <BackButtonBlack />

      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        className="mt-14 pb-8"
      >
        <Text style={{ fontSize: 44 }} className="font-bold ml-4 text-black">
          {" "}
          Hi,
        </Text>
        <Text style={{ fontSize: 44 }} className="font-thin text-black ml-3">
          {userName}!
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("UserAppearance", {
              orders: orders.map((order) => ({
                ...order,
                orderId: order.orderId,
              })),
              allRestaurants: params.allRestaurants,
            })
          }
          className="pb-3"
        >
          <Text
            style={{ color: themeColors.text }}
            className="font-bold ml-6 text-3xl"
          >
            Orders
          </Text>
        </TouchableOpacity>
        <Icon.Bell
          className="ml-2 mb-2"
          strokeWidth={3}
          stroke={themeColors.bgColor(1)}
        />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("UserReservations", {
              reservations: reservations.map((reservation) => ({
                ...reservation,
                reservationId: reservation.reservationId,
              })),
              allRestaurants: params.allRestaurants,
            })
          }
          className="pb-3"
        >
          <Text
            style={{ color: themeColors.text }}
            className="font-bold ml-6 text-3xl"
          >
            Reservations
          </Text>
        </TouchableOpacity>
        <Icon.Clock
          className="ml-2 mb-2"
          strokeWidth={3}
          stroke={themeColors.bgColor(1)}
        />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserFinance")}
          className="pb-3"
        >
          <Text
            style={{ color: themeColors.text }}
            className="font-bold ml-6 text-3xl"
          >
            Finance
          </Text>
        </TouchableOpacity>
        <Icon.DollarSign
          className="ml-2 mb-3"
          strokeWidth={3}
          stroke={themeColors.bgColor(1)}
        />
      </View>

      <View className="ml-6 pt-6 pb-2">
        <Text className="text-2xl font-thin font-s">Your next reservation</Text>
      </View>

      <View>
        {countReservations === 0 ? (
          <View className="items-center">
            <Text className="font-semi text-black text-2xl">
              No reservation yet...
            </Text>
          </View>
        ) : (
          <ReservationCard
            item={nextReservation}
            restaurant={nextReservationRestaurant}
            reservationStatus={nextReservation.status}
          />
        )}
      </View>
      <View
        className="mt-8 ml-6"
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <TouchableOpacity onPress={handleLogout} className="">
          <Text
            style={{ color: themeColors.text }}
            className="font-bold text-3xl"
          >
            Logout
          </Text>
        </TouchableOpacity>
        <Icon.CornerDownLeft
          className="ml-3"
          strokeWidth={3}
          stroke={themeColors.bgColor(1)}
        />
      </View>
    </SafeAreaView>
  );
}
