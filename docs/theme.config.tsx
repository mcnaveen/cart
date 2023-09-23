import { useRouter } from 'next/router'
import { DocsThemeConfig } from 'nextra-theme-docs'
import React from 'react'

const config: DocsThemeConfig = {
  docsRepositoryBase: 'https://github.com/mcnaveen/cart/tree/main/docs',
  footer: {
    text: '$npm install cart',
  },
  logo: <span>Cart</span>,
  project: {
    link: 'https://github.com/mcnaveen/cart',
  },
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – Cart'
      }
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Cart - An Open Source headless cart management library" />
      <meta property="og:description" content="$ npm install cart" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://cart.js.org/" />
      <meta property="og:title" content="Cart - An Open Source headless cart management library" />
      <meta property="og:description" content="$ npm install cart" />
      <meta property="og:image" content="https://raw.githubusercontent.com/mcnaveen/cart/HEAD/image/cover.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://cart.js.org/" />
      <meta property="twitter:title" content="Cart - An Open Source headless cart management library" />
      <meta property="twitter:description" content="$ npm install cart" />
      <meta property="twitter:image" content="https://raw.githubusercontent.com/mcnaveen/cart/HEAD/image/cover.png" />

    </>
  )
}

export default config
