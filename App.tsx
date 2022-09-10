import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TailwindProvider } from "tailwind-rn";
import CustomerScreen from "./screens/CustomerScreen";
import utilities from "./tailwind.json";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigator/RootNavigator";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
console.log(process.env.STEPGEN_KEY);
const client = new ApolloClient({
  uri: "https://velingrad.stepzen.net/api/calling-cricket/__graphql",
  headers: {
    Authorization:
      "Apikey velingrad::stepzen.net+1000::4e17bd1b369ed6630f59e43cfe83f9c6b8b32edf98d8e86a59d6afc04f9c8536",
    "Content-Type": "application/json",
  },
  cache: new InMemoryCache(),
});
export default function App() {
  return (
    //@ts-ignore
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}
