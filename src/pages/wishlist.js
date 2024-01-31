import React from "react"
import SearchEngineOptimization from "../components/utility/seo"
import { useWishlist } from '../hooks/use-wishlist'
import WishlistItem from '../components/wishlist/wishlist-item'

const Wishlist = () => {
  const { wishlist } = useWishlist()

  return (
    <div className="layout-base">
      <SearchEngineOptimization title="Wishlist" />
      <div className="flex relative flex-col-reverse lg:flex-row mb-24">
        <div className="flex flex-col">
          <div className="mb-8">
            <h1 className="font-semibold text-4xl">Wish list</h1>
          </div>
          <div className="w-full grid grid-cols-2 gap-16">
            {wishlist.items.map(item => {
              return (
                <WishlistItem
                  key={item.id}
                  item={item}
                  currencyCode={wishlist.region?.currency_code || 'usd'}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wishlist
