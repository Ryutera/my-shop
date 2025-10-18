import { createClient } from "@/utils/supabase/server";
import React from "react";

import AccountPanel from "@/components/AccountPanel";
import { Order } from "@/lib/generated/prisma";
import { OrderItem } from "@/lib/types";
import { getPurchaseItemsIndb } from "@/app/actions";





const page = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUserIdentities();
  let orders: Order[]

  if (data) {
    orders = await getPurchaseItemsIndb(data.identities[0].id);

  } else {
    return ;
  }


  const formatPrice = (price:number, currency:string) =>{

   
switch (currency) {
  case "JPY":
    
    return `${price.toLocaleString('JP')}` ;

     case "EUR":
    
    return `${price.toLocaleString('DE')}`;
     case "GBP":
    
    return `${price.toLocaleString('GB')}`

}

  }



  const formatTotalPrice = (price:number, currency:string) =>{

   
switch (currency) {
  case "JPY":
    
    return `${price.toLocaleString('JP')}` ;

     case "EUR":
    
    return `${price / 100}`;
     case "GBP":
    
    return `${price  / 100}`

}

  }



  




  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-8">Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Purchase history - scrollable on tall pages */}
        <section className="min-h-[300px] max-h-[70vh] overflow-y-auto">
          <div className="space-y-4">
            <div className="text-sm text-gray-500 mb-2">Purchase History</div>

            {orders.length ? (
              orders.map((order: Order) => (
                <div key={order.id} className="w-full bg-white border border-gray-200 rounded-lg p-6 mb-4 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-gray-500 text-sm mb-2">{new Date(order.createdAt).toLocaleDateString()}</p>
                      <p className="text-xl font-semibold"> {formatTotalPrice(order.total,(order.items as OrderItem[])[0].currency )} {(order.items as OrderItem[])[0].currency}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {(order.items as OrderItem[]).map((item: OrderItem, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-base text-gray-800">{item.name}</span>
                          {/* quantity not available on OrderItem type in DB - omit or replace when present */}
                        </div>
                        <span className="text-base font-medium">
                          {formatPrice(item.price, item.currency)} {item.currency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500">There is no purchase history</div>
            )}
          </div>
        </section>

        {/* Right: Account panel */}
        <aside className="sticky top-6">
          <AccountPanel
            fullName={data.identities[0].identity_data?.name ?? null}
            email={data.identities[0].identity_data?.email ?? null}
            address={null}
          />
        </aside>
      </div>
    </div>
  )
};

export default page;
