import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { create } from "zustand";
import { StateStorage, createJSONStorage, persist } from "zustand/middleware";

// check if we are in the browser and set storage type accordingly
const isBrowser = typeof window.document !== 'undefined';
const storageType = isBrowser ? localStorage : AsyncStorage;

interface CartItems {
	cartQuantity?: number;
	imagesrc?: string;
	inStock?: boolean;
	name: string;
	price?: number;
	productId: number | string | undefined;
	quantity: number;
}

interface CartState {
	/**
	 * Adds an item to the shopping cart or updates its quantity if already in the cart.
	 *
	 * Example:
	 * ```js
	 * addToCart({ productId: 'product1', name: 'Product 1', price: 20 });
	 * ```
	 * @param {CartItems} item - The item to be added or updated in the cart.
	 */
	addToCart?: (item: CartItems) => void;

	/**
	 * Array of Items in the Cart.
	 */
	cartItems?: CartItems[];

	/**
	 * Clears all items from the shopping cart.
	 */
	clearCart?: () => void;

	/**
	 * Set cart open state to `false`.
	 */
	closeCart?: () => void;

	/**
	 * Decreases the quantity of an item in the shopping cart or removes it if the quantity becomes zero.
	 *
	 * Example:
	 * ```js
	 * decreaseItem('product1', 1);
	 * ```
	 * @param {string} productId - The ID of the product to decrease the quantity of.
	 * @param {number} [quantity=1] - The quantity to decrease. Defaults to 1.
	 */
	decreaseItem?: (productId: string, quantity?: number) => void;

	/**
	 * Indicates whether the cart is open or not.
	 */
	isCartOpen?: boolean;

	/**
	 * Set cart open state to `true`.
	 */
	openCart?: () => void;

	/**
	 * Removes an item from the shopping cart.
	 *
	 * Example:
	 * ```js
	 * removeFromCart('product1');
	 * ```
	 * @param {string} productId - The ID of the product to remove from the cart.
	 */
	removeFromCart?: (productId: string) => void;

	/**
	 * Toggles the visibility of the shopping cart.
	 */
	toggleCart?: () => void;
}

/**
 * Sets the name of the cart store for persistence.
 * @param name - The name to be used for persistence.
 */
const setCartStoreName = (name: string) => {
	useCart.persist.setOptions({
		name: name,
	});
};

/**
 * A higher-order function for server-side rendering (SSR) with Zustand state management.
 * @template T - The type of the state.
 * @template F - The type of the result returned by the callback.
 * @param store - A function that performs server-side state setup.
 * @param callback - A function that computes a result based on the state.
 * @returns The result of the callback function, or undefined if not available.
 */
const withSSR = <T, F>(
	store: (callback: (state: T) => unknown) => unknown,
	callback: (state: T) => F,
) => {
	const result = store(callback) as F;
	const [data, setData] = useState<F>();

	useEffect(() => {
		setData(result);
	}, [result]);

	return data;
};

/**
 * Sets the type of storage for the cart store's persistence.
 * @param [storage] - The type of storage to be used for persistence (e.g., localStorage or sessionStorage). Defaults to localStorage if not provided.
 */
const setCartStoreType = (storage: StateStorage = localStorage) => {
	useCart.persist.setOptions({
		storage: createJSONStorage(() => storage),
	});
};

/**
 * Custom hook for managing the shopping cart state.
 * @returns {CartState} The cart state object.
 */
const useCart = create<CartState>()(
	persist(
		(set) => ({
			addToCart: (item: CartItems) => {
				set((state) => {
					// Ensure cartItems is not undefined, or initialize it as an empty array
					const cartItems = state.cartItems ?? [];

					// Check if the item is already in the cart
					const itemInCart = cartItems.find(
						(i) => i.productId === item.productId,
					);

					// If the item is in the cart, update its quantity
					if (itemInCart) {
						return {
							cartItems: cartItems.map((i) => {
								if (i.productId === item.productId) {
									return { ...i, quantity: i.quantity + 1 };
								}

								return i;
							}),
						};
					} else {
						// If the item is not in the cart, add it with a quantity of 1
						return {
							cartItems: [...cartItems, { ...item, quantity: 1 }],
						};
					}
				});
			},
			cartItems: [],
			clearCart: () => {
				set({ cartItems: [] });
			},
			closeCart: () => {
				set({ isCartOpen: false });
			},
			decreaseItem: (productId, quantity) => {
				set((state) => {
					if (quantity === undefined) {
						// If quantity is not provided, remove the entire product from the cart
						return {
							cartItems: state.cartItems?.filter(
								(item) => item.productId !== productId,
							),
						};
					}

					// Update the quantity of the product in the cart
					const updatedCartItems = state.cartItems
						?.map((item) => {
							if (item.productId === productId) {
								const newQuantity = item.quantity - quantity;
								if (newQuantity <= 0) {
									// Remove the item from the cart if the new quantity is zero or negative
									return null;
								}

								return { ...item, quantity: newQuantity };
							}

							return item;
						})
						.filter(Boolean) as CartItems[]; // Filter out null values and cast back to CartItem[]

					return { cartItems: updatedCartItems };
				});
			},
			isCartOpen: false,
			openCart: () => {
				set({ isCartOpen: true });
			},
			removeFromCart: (productId) => {
				set((state) => ({
					cartItems: state.cartItems?.filter(
						(item) => item.productId !== productId,
					),
				}));
			},
			toggleCart: () => {
				set((state) => ({ isCartOpen: !state.isCartOpen }));
			},
		}),
		{
			name: "cart",
			storage: createJSONStorage(() => storageType as StateStorage),
		},
	),
);

export {
	CartItems,
	CartState,
	setCartStoreName,
	setCartStoreType,
	useCart,
	withSSR,
};
