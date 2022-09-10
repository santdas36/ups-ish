import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabStackParams } from "../navigator/TabNavigator";
import { RootStackParams } from "../navigator/RootNavigator";
import { useTailwind } from "tailwind-rn/dist";
import useOrders from "../hooks/useOrders";
import { Button, ButtonGroup, Image } from "@rneui/themed";
import OrderCard from "../components/OrderCard";

export type OrderNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParams, "Orders">,
  NativeStackNavigationProp<RootStackParams>
>;

const OrdersScreen = () => {
  const navigation = useNavigation<OrderNavProp>();
  const tw = useTailwind();
  const { loading, error, orders } = useOrders();
  const [ascending, setAscending] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color: focused ? "#eb6a7c" : color }}>Orders</Text>
      ),
    });
  }, []);

  return (
    <ScrollView style={tw("bg-pink")}>
      <Image
        source={{ uri: "https://links.papareact.com/m51" }}
        containerStyle={tw("w-full h-64")}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View>
        <Button
          color="#cb5a6c"
          containerStyle={tw("p-5")}
          // style={tw("py-2 px-4 rounded-lg")}
          onPress={() => setAscending(!ascending)}
        >
          {ascending ? "Showing Oldest First" : "Showing Most Recent First"}
        </Button>
      </View>
      {orders
        ?.sort((a, b) => {
          // if(ascending) {
          return new Date(a.createdAt) > new Date(b.createdAt)
            ? ascending
              ? 1
              : -1
            : ascending
            ? -1
            : 1;
          // } else {
          //   return new Date(a.createdAt)>new Date(b.createdAt) ? 1:-1
          // }
        })
        .map((order) => (
          <OrderCard key={order.trackingId} item={order} />
        ))}
    </ScrollView>
  );
};

export default OrdersScreen;
