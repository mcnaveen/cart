'use client';

import { type CartItems, type CartState, useCart, withSSR } from 'cart';
import React from 'react';

import {FloatingButton} from "./floatingButton"

interface Product {
  name: string;
  price: number;
  productId: string;
}

const products: Product[] = [
  {
    name: 'Product 1',
    price: 10,
    productId: '123',
  },
  {
    name: 'Product 2',
    price: 15,
    productId: '456',
  },
  {
    name: 'Product 3',
    price: 20,
    productId: '789',
  },
];

export function MyCart() {
  const cart = withSSR(useCart, (state) => state);

  const handleToggle = () => {
    cart?.toggleCart?.();
  };

  const addItem = (product: CartItems) => {
    cart?.addToCart?.(product);
  };

  const subtractItem = (productId: string) => {
    cart?.decreaseItem?.(productId, 1);
  };

  return (
    <>
    <FloatingButton />
    <div className="max-w-xs mx-auto p-4 bg-white rounded shadow-lg mt-4">
      <p className="text-center text-xl font-semibold mb-4 text-gray-600">
        Cart Status: {cart?.isCartOpen ? 'Open' : 'Closed'}
      </p>
      <div className="flex flex-col space-y-4 mb-4">
  
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          onClick={() => handleToggle()}
        >
          Toggle Cart
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          onClick={() => cart?.clearCart?.()}
        >
          Clear Cart
        </button>
        {products.map((product) => {
          const cartItem = cart?.cartItems?.find(
            (item) => item.productId === product.productId
          );
          const quantity = cartItem ? cartItem.quantity : 0;
          const total = quantity * product.price;

          return (
            <div
              className="flex items-center text-black"
              key={product.productId}
            >
              <div className="flex-grow">
                {product.name} - ${product.price} (x{quantity}) - ${total}
              </div>
              <div className='flex gap-2'>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
               // @ts-ignore
                onClick={() => addItem(product)}
              >
                +
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded"
                onClick={() => subtractItem(product.productId)}
              >
                -
              </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}
