import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import { Card, Icon } from "@rneui/themed";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";
import { OrderNavProp } from "../screens/OrdersScreen";

const OrderCard = ({ item }: { item: Order }) => {
  const tw = useTailwind();
  const navigation = useNavigation<OrderNavProp>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Order", { order: item })}
    >
      <Card containerStyle={tw("p-4 rounded-lg ")}>
        <View style={tw("flex-row items-center")}>
          <View>
            <Icon
              name="truck-delivery"
              color="#eb6a7c"
              type="material-community"
            />
            <Text style={tw("text-[12px] text-pink")}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <View style={tw("ml-4")}>
            <Text style={tw("text-gray-400 text-xs uppercase")}>
              {item.carrier}-{item.trackingId}
            </Text>
            <Text style={tw("text-xl text-gray-500")}>
              {item.trackingItems.customer.name}
            </Text>
          </View>
          <View style={tw("ml-auto flex-row items-center")}>
            <Text style={tw("text-grayish")}>
              {item.trackingItems.items.length}x
            </Text>
            <Icon
              style={tw("ml-1")}
              color="#8c8c8e"
              name="box"
              type="feather"
            />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;
