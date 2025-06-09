import { ShoppingCart } from 'lucide-react'
import React from 'react'

const NoCartContent = () => {
  return (
    <div className="border border-gray-200 rounded-lg bg-white p-16 text-center">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="bg-gray-50 p-5 rounded-full">
              <ShoppingCart className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">
              Your cart is empty
            </h3>
            <p className="text-gray-500 text-base">
              Add some products to your cart to see them here.
            </p>
          </div>
        </div>
  )
}

export default NoCartContent