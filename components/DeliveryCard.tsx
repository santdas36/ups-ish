import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import { Card, Icon } from "@rneui/themed";
import { Divider } from "@rneui/base";
import MapView, { Marker } from "react-native-maps";

const DeliveryCard = ({
  order,
  fullWidth,
}: {
  order: Order;
  fullWidth?: Boolean;
}) => {
  const tw = useTailwind();
  return (
    <Card
      containerStyle={tw(
        fullWidth ? "rounded-none bg-pink m-0 p-0" : "rounded-lg bg-cyan"
      )}
    >
      <View style={fullWidth && { height: "100%" }}>
        <View style={fullWidth && tw("pt-4 px-2")}>
          <Icon name="box" type="entypo" color="white" size={48} />
          <View>
            <Text
              style={tw(
                "text-center mt-4 text-sm uppercase text-white font-bold"
              )}
            >
              {order.carrier} - {order.trackingId}
            </Text>
            <Text style={tw("text-center text-base text-white")}>
              Expected Delivery:{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </Text>
            <Divider color="white" />
          </View>
          <View style={tw("mx-auto mt-4")}>
            <Text style={tw("text-center text-white font-bold")}>Address</Text>
            <Text style={tw("text-center text-white text-lg")}>
              {order.Address},{order.City}
            </Text>
            <Text style={tw("text-center text-white italic mt-3")}>
              Shipping Cost:{" "}
              <Text style={tw("font-bold text-lg italic")}>
                ${order.shippingCost}
              </Text>
            </Text>
          </View>
          <View style={tw("p-5")}>
            {order.trackingItems.items.map((item) => (
              <View
                key={item.item_id}
                style={tw("flex-row justify-between items-center")}
              >
                <Text style={tw("text-sm text-white")}>{item.name}</Text>
                <Text style={tw("text-white text-lg")}>x{item.quantity}</Text>
              </View>
            ))}
          </View>
        </View>
        <MapView
          initialRegion={{
            latitude: order.Lat,
            longitude: order.Lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={tw(
            `w-full ${fullWidth ? "flex-grow m-0" : "h-[256px]"} rounded-lg`
          )}
        >
          {order.Lat && order.Lng && (
            <Marker
              coordinate={{ latitude: order.Lat, longitude: order.Lng }}
              description={order.Address}
              identifier="destination"
              title="Delivery Location"
            />
          )}
        </MapView>
      </View>
    </Card>
  );
};

export default DeliveryCard;
