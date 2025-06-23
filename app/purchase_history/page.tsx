import { createClient } from "@/utils/supabase/server";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getProduct, getPurchaseItemsIndb } from "../actions";
import { Badge } from "lucide-react";

const PurchaseHistory = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUserIdentities();
  let orders;
  if (data) {
    orders = await getPurchaseItemsIndb(data.identities[0].id);
  } else {
    return <div>You need to login to see purchase histry</div>;
  }


  const orderItems = orders.flatMap(order => order.items);

// ここでそれぞれの item.id を使って取得
const orderData = await Promise.all(orderItems.map(async (item: any) => {
  return await getProduct(item.productMetadata?.app_product_id || item.id);
}));

 

//   const orderData = Promise.all(orderItems.map(async(id:any)=>await getProduct(id)))
  console.log(orderData,"おだでた")

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Purchase History</h1>

      {orders.map((order: any) => (
        <Card key={order.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

                <p className="font-medium">¥{order.total.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PurchaseHistory;
