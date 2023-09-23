<h1 align="center">Cart</h1>

<p align="center">Headless cart management library</p>

![npm i cart](image/cover.png)

<p align="center">
	<a href="#contributors" target="_blank">
<!-- prettier-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<img alt="All Contributors: 2" src="https://img.shields.io/badge/all_contributors-2-21bb42.svg" />
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- prettier-ignore-end -->
</a>
	<a href="https://codecov.io/gh/mcnaveen/Cart" target="_blank">
		<img alt="Codecov Test Coverage" src="https://codecov.io/gh/mcnaveen/Cart/branch/main/graph/badge.svg"/>
	</a>
	<a href="https://github.com/mcnaveen/Cart/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank">
		<img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" />
	</a>
	<a href="https://github.com/mcnaveen/Cart/blob/main/LICENSE.md" target="_blank">
		<img alt="License: MIT" src="https://img.shields.io/github/license/mcnaveen/Cart?color=21bb42">
	</a>
	<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />
	<img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />
</p>

> ⚠️ Expect some breaking changes, Use at your own risk

### 🛒 Demo

- [View React Demo](https://stackblitz-starters-dt9zzc.stackblitz.io/)
- [Nextjs App Directory Demo](https://stackblitzstarterskcruvd-uufb--3000--d6c42aca.local-credentialless.webcontainer.io/)

### :package: Requirements

- React or Nextjs Project ⚛️

### :sparkles: Installation

- Install using the below command (with your package manager of choice)

```bash
# npm
npm install cart --save

# yarn
yarn add cart

#pnpm
pnpm add cart

# bun
bun install cart

```

---

### :bulb: Usage Example

```jsx
import React from "react";
import { useCart } from "cart";

const item = {
  productId: "123",
  name: "Product 1",
  quantity: 1,
  price: 10,
};

function Cart() {
  const {
    addToCart,
    cartItems,
    clearCart,
    decreaseItem,
    toggleCart,
    isCartOpen,
  } = useCart();

  return (
    <div>
      <p>{isCartOpen ? "Open" : "Closed"}</p>
      <button onClick={() => toggleCart()}>Toggle</button>
      <button onClick={() => addToCart(item)}>Add</button>

      <button onClick={() => clearCart()}>Clear</button>
      <button onClick={() => decreaseItem("123", 1)}>Decrease</button>

      <p>{JSON.stringify(cartItems)}</p>
    </div>
  );
}

export default Cart;
```

### :bulb: SSR Example

```jsx
import { useCart, withSSR } from "cart";
import React from "react";

const item = {
  productId: "123",
  name: "Product 1",
  quantity: 1,
  price: 10,
};

function MyCart() {
  const cart = withSSR(useCart, (state) => state);

  const handleToggle = () => {
    cart?.toggleCart();
  };

  const itemadd = () => {
    cart?.addToCart(item);
  };

  return (
    <div>
      <p>{cart?.isCartOpen ? "Open" : "Closed"}</p>
      <button onClick={() => handleToggle()}>Toggle</button>
      <button onClick={() => itemadd()}>Add</button>

      <button onClick={() => cart?.clearCart()}>Clear</button>
      <button onClick={() => cart?.decreaseItem("123", 1)}>Decrease</button>

      <p>{JSON.stringify(cart?.cartItems)}</p>
    </div>
  );
}

export default MyCart;
```

---

### API Reference

| Name             | Type       | Default Value | Description                                                                                        | Example                                                                                                                                          |
| ---------------- | ---------- | ------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `isCartOpen`     | `boolean`  | `false`       | Indicates whether the cart is open or not.                                                         | `isCartOpen ? "Yes" : "No"`                                                                                                                      |
| `toggleCart`     | `function` | -             | Toggles the visibility of the shopping cart.                                                       | `toggleCart();`                                                                                                                                  |
| `openCart`       | `function` | -             | Sets the cart open state to `true`.                                                                | `openCart();`                                                                                                                                    |
| `closeCart`      | `function` | -             | Sets the cart open state to `false`.                                                               | `closeCart();`                                                                                                                                   |
| `cartItems`      | `array`    | `[]`          | An array of items in the cart.                                                                     | `cartItems.map((item) => ( <div key={item.productId}> <p>{item.name}</p> <p>Quantity: {item.quantity}</p> <p>Price: ${item.price}</p> </div> ))` |
| `addToCart`      | `function` | -             | Adds an item to the shopping cart or updates its quantity if already in the cart.                  | `addToCart({ productId: 'product1', name: 'Product 1', quantity: 2, price: 20 });`                                                               |
| `decreaseItem`   | `function` | -             | Decreases the quantity of an item in the shopping cart or removes it if the quantity becomes zero. | `decreaseItem('product1', 1);`                                                                                                                   |
| `removeFromCart` | `function` | -             | Removes an item from the shopping cart.                                                            | `removeFromCart('product1');`                                                                                                                    |
| `clearCart`      | `function` | -             | Clears all items from the shopping cart.                                                           | `clearCart();`                                                                                                                                   |

#### :pray: Credits

Huge thanks to [Peter Krumins](https://github.com/pkrumins) for the package name `cart`.
Please checkout [Browserling](https://www.browserling.com/) - Online cross-browser testing platform.

(Btw, This is not a sponsored message, Just my way of saying thank you)

#### Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.joshuakgoldberg.com/"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg ✨"/><br /><sub><b>Josh Goldberg ✨</b></sub></a><br /><a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mcnaveen"><img src="https://avatars.githubusercontent.com/u/8493007?v=4?s=100" width="100px;" alt="MC Naveen"/><br /><sub><b>MC Naveen</b></sub></a><br /><a href="https://github.com/mcnaveen/Cart/commits?author=mcnaveen" title="Code">💻</a> <a href="#content-mcnaveen" title="Content">🖋</a> <a href="https://github.com/mcnaveen/Cart/commits?author=mcnaveen" title="Documentation">📖</a> <a href="#ideas-mcnaveen" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-mcnaveen" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-mcnaveen" title="Maintenance">🚧</a> <a href="#projectManagement-mcnaveen" title="Project Management">📆</a> <a href="#tool-mcnaveen" title="Tools">🔧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

<!-- You can remove this notice if you don't want it 🙂 no worries! -->

#### :green_heart: Message

I hope you find this useful.
If you have any questions, please create an issue.

---

> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [create-typescript-app](https://github.com/JoshuaKGoldberg/create-typescript-app).
