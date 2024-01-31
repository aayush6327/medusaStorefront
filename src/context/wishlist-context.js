import React, { createContext, useEffect, useState } from "react"
import { useRegion } from "../hooks/use-region"
import { useMedusa } from "../hooks/use-medusa"

const defaultWishlistContext = {
  wishlist: {
    items: [],
  },
  loading: false,
  actions: {
    addWishItem: async () => {},
    removeWishItem: async () => {},
  },
}

const WishlistContext = createContext(defaultWishlistContext)
export default WishlistContext

const WISHLIST_ID = "wishlist_id"
const isBrowser = typeof window !== "undefined"

export const WishlistProvider = props => {
  const [wishlist, setWishlist] = useState(defaultWishlistContext.wishlist)
  const [loading, setLoading] = useState(defaultWishlistContext.loading)
  const { region } = useRegion()
  const { client } = useMedusa()

  const setWishlistItem = wishlist => {
    if (isBrowser) {
      localStorage.setItem(WISHLIST_ID, wishlist.id)
    }
    setWishlist(wishlist)
  }

  useEffect(() => {
    const initializeWishlist = async () => {
      const existingWishlistId = isBrowser
        ? localStorage.getItem(WISHLIST_ID)
        : null

      if (existingWishlistId && existingWishlistId !== "undefined") {
        try {
          const { data } = await client.axiosClient.get(
            `/store/wishlist/${existingWishlistId}`
          )

          if (data) {
            setWishlistItem(data)
            return
          }
        } catch (e) {
          localStorage.setItem(WISHLIST_ID, null)
        }
      }

      if (region) {
        try {
          const { data } = await client.axiosClient.post("/store/wishlist", {
            region_id: region.id,
          })

          setWishlistItem(data)
          setLoading(false)
        } catch (e) {
          console.log(e)
        }
      }
    }

    initializeWishlist()
  }, [client, region])

  const addWishItem = async product_id => {
    setLoading(true)
    try {
        console.log(wishlist.id);
        console.log(product_id);
      const { data } = await client.axiosClient.post(
        `/store/wishlist/${wishlist.id}/wish-item`,
        { product_id }
      )
      setWishlistItem(data)
      console.log(data);
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  const removeWishItem = async id => {
    setLoading(true)
    try {
      const { data } = await client.axiosClient.delete(
        `/store/wishlist/${wishlist.id}/wish-item/${id}`
      )
      setWishlistItem(data)
      console.log(data);
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <WishlistContext.Provider
      {...props}
      value={{
        ...defaultWishlistContext,
        loading,
        wishlist,
        actions: {
          addWishItem,
          removeWishItem,
        },
      }}
    />
  )
}
