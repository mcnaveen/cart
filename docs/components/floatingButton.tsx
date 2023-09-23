import {useCart, withSSR} from 'cart'
import { ShoppingCart } from "lucide-react";
import React from 'react';

export const FloatingButton = () => {
    const cart = withSSR(useCart, (state) => state);

  return (
    <div className="fixed bottom-0 right-0 p-6 z-50 cursor-pointer">
    {cart?.cartItems?.length! > 0 && (
      <div
        className="bg-blue-500 hover:bg-blue-700 rounded-full text-white font-bold py-4 px-4 relative"
        role="cart"
        onClick={() => alert(cart?.cartItems?.length! > 0 ? "Items in the cart: " + JSON.stringify(cart?.cartItems, null, 2): "No Items in the cart")}
      >
        <ShoppingCart className="h-6 w-6" />
        {cart?.cartItems?.length! > 0 && (
          <div className="bg-red-500 absolute p-[7px] rounded-full top-0 right-0 text-white text-xs border-white border-2" />
        )}
      </div>
    )}
    </div>
  )
  
}
