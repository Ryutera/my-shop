import { createClient } from "@/utils/supabase/server";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {  getPurchaseItemsIndb } from "../actions";


const PurchaseHistory = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUserIdentities();
  let orders;
  if (data) {
    orders = await getPurchaseItemsIndb(data.identities[0].id);
  } else {
    return <div>You need to login to see purchase histry</div>;
  }



  return (
    <div className="w-full   p-4 space-y-4">
    <h1 className="text-2xl font-bold">Purchase History</h1>
  
    {orders.map((order: any) => (
      <Card key={order.id} className="w-full">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="font-medium">£{order.total / 100}</p>
            </div>
          </div>
  
          <div className="mt-3 space-y-2">
            {order.items.map((item: any, index: number) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm border-l-2 border-gray-200 pl-3"
              >
                <span className="text-gray-700">{item.name}</span>
                <span className="font-medium">£{item.price?.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
  
  );
};

export default PurchaseHistory;
