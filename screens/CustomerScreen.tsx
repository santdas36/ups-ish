import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useTailwind } from "tailwind-rn";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabStackParams } from "../navigator/TabNavigator";
import { RootStackParams } from "../navigator/RootNavigator";
import { Image, Input } from "@rneui/themed";
import { GET_CUSTOMERS } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import CustomerCard from "../components/CustomerCard";

export type CustomerTabNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParams, "Customers">,
  NativeStackNavigationProp<RootStackParams>
>;

export default function CustomerScreen() {
  const tw = useTailwind();
  const navigation = useNavigation<CustomerTabNavProps>();
  const [input, setInput] = useState<string>("");
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <ScrollView style={tw("bg-cyan")}>
      <Image
        source={{ uri: "https://links.papareact.com/3jc" }}
        containerStyle={tw("w-full h-64")}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Input
        placeholder="Search by customer..."
        value={input}
        onChangeText={setInput}
        inputStyle={tw(
          "px-4 py-3 bg-[#39a1ac] text-base text-white rounded-lg"
        )}
        placeholderTextColor="#fff"
        inputContainerStyle={tw("border-b-cyan px-2 mt-4 -mb-2")}
        containerStyle={tw("bg-cyan")}
      />
      {data?.getCustomers
        .filter((customer: CustomerList) =>
          customer.value.name.toLowerCase().includes(input.toLowerCase())
        )
        .map(({ name: ID, value: { email, name } }: CustomerResponse) => (
          <CustomerCard key={ID} email={email} name={name} userId={ID} />
        ))}
    </ScrollView>
  );
}
