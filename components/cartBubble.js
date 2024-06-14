import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { themeColors } from "../theme";

const CartBubble = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <View style={styles.bubble}>
      <Text style={styles.text}>{itemCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: "white",
    borderRadius: 15,
    borderColor: themeColors.text,
    borderWidth: 2,
    width: 50,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    right: 65,
  },
  text: {
    color: themeColors.text,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartBubble;
