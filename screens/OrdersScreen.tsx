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
import { Button, ButtonGroup, Icon, Image } from "@rneui/themed";
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
          containerStyle={tw("p-4")}
          buttonStyle={tw(
            "rounded-lg flex-row text-base justify-between px-4 py-4"
          )}
          style={tw("rounded-lg")}
          // style={tw("py-2 px-4 rounded-lg")}
          onPress={() => setAscending(!ascending)}
        >
          {ascending ? "Showing Oldest First" : "Showing Most Recent First"}
          <Icon
            size={18}
            color="white"
            name={ascending ? "sort-amount-down" : "sort-amount-up"}
            type="font-awesome-5"
          />
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
