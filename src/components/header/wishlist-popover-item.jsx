import React, { useState } from "react"
import RegionalLink from "../utility/regional-link"
import { useWishlist } from "../../hooks/use-wishlist"

const WishlistPopoverItem = ({ item }) => {
  console.log("wishlist popover item", item)
  const {
    wishlist,
    actions: { addWishItem, removeWishItem },
  } = useWishlist()
  console.log("object");

  return (
    <RegionalLink to={item.handle} className="font-normal">
      <div className="flex hover:bg-gray-100 justify-between">
        <div className=" flex overflow-hidden rounded-md mr-4" >
          <img className="w-16 h-auto mr-2" src={item.thumbnail} alt={item.title} />
       ()

            <h1 className="font-semibold text-lg">{item.title}</h1>
         
        </div>
        <div>
          <button
            className="flex"
            onClick={async () => await removeWishItem(item.id)}
          >
            &times;
          </button>
        </div>
      </div>
    </RegionalLink>
  )
}

export default WishlistPopoverItem
