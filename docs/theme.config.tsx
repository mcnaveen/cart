import { DocsThemeConfig } from 'nextra-theme-docs'
import React from 'react'

const config: DocsThemeConfig = {
  docsRepositoryBase: 'https://github.com/mcnaveen/cart/tree/main/src/docs',
  footer: {
    text: '$npm install cart',
  },
  logo: <span>Cart</span>,
  project: {
    link: 'https://github.com/mcnaveen/cart',
  },
}

export default config
