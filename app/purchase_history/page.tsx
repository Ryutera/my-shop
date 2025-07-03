import { createClient } from "@/utils/supabase/server";
import React from "react";
import {  getPurchaseItemsIndb } from "../actions";
import { Order } from "@/lib/generated/prisma";
import { OrderItem } from "@/lib/types";





const PurchaseHistory = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUserIdentities();
  let orders:Order[]
  if (data) {
    orders = await getPurchaseItemsIndb(data.identities[0].id);
   
  } else {
    return <div>You need to login to see purchase histry</div>;
  }

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-8">Purchase History</h1>

      {orders.map((order: Order) => (
        <div key={order.id} className="w-full bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-500 text-lg mb-3">{new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="text-2xl"> £{order.total / 100}</p>
            </div>
           
          </div>

          <div className="space-y-3">
          {(order.items as OrderItem[]).map((item: OrderItem, index: number)=> (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
              >
                <span className="text-lg text-gray-800">{item.name}</span>
                <span className="text-lg font-semibold">£{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  
  );
};

export default PurchaseHistory;
