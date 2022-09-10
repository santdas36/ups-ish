import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import useCustomerOrders from "../hooks/useCustomerOrders";
import { useTailwind } from "tailwind-rn/dist";
import { CustomerTabNavProps } from "../screens/CustomerScreen";
import { useNavigation } from "@react-navigation/native";
import { Card, Icon } from "@rneui/themed";

interface Props extends Customer {
  userId: string;
}

const CustomerCard = ({ email, name, userId }: Props) => {
  const { loading, error, orders } = useCustomerOrders(userId);
  const tw = useTailwind();
  const navigation = useNavigation<CustomerTabNavProps>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Modal", { name, userId });
      }}
    >
      <Card containerStyle={tw("p-5 rounded-lg")}>
        <View style={tw("flex-row justify-between mb-4")}>
          <View>
            <Text style={tw("text-2xl font-bold")}>{name}</Text>
            <Text style={tw("text-sm text-cyan")}>ID: {userId}</Text>
          </View>
          <View style={tw("flex-row mt-2 items-center justify-end")}>
            <Text style={tw("text-cyan font-bold")}>
              {loading ? "Loading..." : `${orders.length}x`}
            </Text>
            <Icon
              style={tw("mb-4 ml-auto")}
              name="box"
              type="entypo"
              color="#59c1cc"
              size={40}
            />
          </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;
