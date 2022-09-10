import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { OrderNavProp } from "./OrdersScreen";
import { RootStackParams } from "../navigator/RootNavigator";
import DeliveryCard from "../components/DeliveryCard";
import { SafeAreaView } from "react-native-safe-area-context";

type OrderScreenRouteProp = RouteProp<RootStackParams, "Order">;

const OrderScreen = () => {
  const {
    params: { order },
  } = useRoute<OrderScreenRouteProp>();
  const tw = useTailwind();
  const navigation = useNavigation<OrderNavProp>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerBackTitle: "Deliveries",
      headerTintColor: "#eb6a7c",
    });
  }, []);
  return (
    <View>
      <DeliveryCard order={order} fullWidth />
    </View>
  );
};

export default OrderScreen;
