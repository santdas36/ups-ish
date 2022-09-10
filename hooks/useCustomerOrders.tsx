import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../graphql/queries";
function useCustomerOrders(userId: String) {
  const { loading, error, data } = useQuery(GET_ORDERS);
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    if (!data) return;
    const orders: Order[] = data.getOrders.map(({ value }: OrderResponse) => ({
      ...value,
    }));
    const customerOrders = orders.filter(
      (orders) => orders.trackingItems.customer_id === userId
    );
    setOrders(customerOrders);
  }, [data, userId]);
  return { loading, error, orders };
}

export default useCustomerOrders;
