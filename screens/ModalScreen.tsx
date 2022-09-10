import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaViewBase,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/themed";
import { useTailwind } from "tailwind-rn/dist";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { TabStackParams } from "../navigator/TabNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigator/RootNavigator";
import useCustomerOrders from "../hooks/useCustomerOrders";
import DeliveryCard from "../components/DeliveryCard";

export type ModalNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParams>,
  NativeStackNavigationProp<RootStackParams, "Modal">
>;

type ModalScreenRouteProp = RouteProp<RootStackParams, "Modal">;

const ModalScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<ModalNavProp>();
  const {
    params: { name, userId },
  } = useRoute<ModalScreenRouteProp>();

  const { loading, error, orders } = useCustomerOrders(userId);
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={tw("absolute right-5 top-10")}
      >
        <Icon name="closecircle" type="antdesign" />
      </TouchableOpacity>
      <View style={tw("mt-10")}>
        <View style={tw("py-5 border-b border-[#ccc]")}>
          <Text style={tw("font-bold text-xl text-center")}>{name}</Text>
          <Text style={tw("text-center italic text-cyan")}>deliveries</Text>
        </View>
      </View>
      {!loading && orders && orders.length ? (
        <FlatList
          scrollEnabled={true}
          data={orders}
          keyExtractor={(order) => order.trackingId}
          renderItem={({ item: order }) => <DeliveryCard order={order} />}
        />
      ) : (
        <Text style={tw("text-center mt-10")}>No items available!</Text>
      )}
      {loading ? <Text style={tw("text-center mt-10")}>Loading...</Text> : null}
    </SafeAreaView>
  );
};

export default ModalScreen;
