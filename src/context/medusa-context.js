import Medusa from "@medusajs/medusa-js"
import React, { createContext } from "react"
import { CartProvider } from "./cart-context"
import { CustomerProvider } from "./customer-context"
import { RegionProvider } from "./region-context"
import { WishlistProvider } from "./wishlist-context"

const defaultMedusaContext = {
  /**
   * @type {Medusa}
   */
  client: null,
}

const MedusaContext = createContext(defaultMedusaContext)
export default MedusaContext

export const MedusaProvider = ({ children, client }) => {
  return (
    <MedusaContext.Provider value={{ client }}>
      <CustomerProvider>
        <RegionProvider>
        <WishlistProvider>
            <CartProvider>{children}</CartProvider>
          </WishlistProvider>
        </RegionProvider>
      </CustomerProvider>
    </MedusaContext.Provider>
  )
}
