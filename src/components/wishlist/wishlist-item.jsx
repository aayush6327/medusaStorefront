import React from "react"
import WishlistIcon from "../../icons/wishlist"
import { useWishlist } from "../../hooks/use-wishlist"
import RegionalLink from "../utility/regional-link"

const WishlistItem = ({ item }) => {
  const {
    actions: { removeWishItem },
  } = useWishlist()
  const { product } = item

  return (
    <div className="flex mb-6 last:mb-0">
      <div className="bg-ui rounded-md overflow-hidden mr-4 max-w-1/4">
        <img
          className="h-auto w-full object-cover"
          src={product.thumbnail}
          alt={product.title}
        />
      </div>
      <div className="flex text-sm flex-grow py-2 justify-between space-x-8">
        <RegionalLink to={product.handle} className="w-full">
          <div className="flex flex-col justify-between w-full hover:text-green-400">
            <div className="flex flex-col">
              <p className="font-semibold mb-4">{product.title}</p>
              <p>{product.description}</p> 
            </div>
          </div>
        </RegionalLink>

        <div className="flex flex-col justify-between">
          <div className="flex justify-end w-full">
            <button onClick={async () => await removeWishItem(item.id)}>
              <WishlistIcon fill={true} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WishlistItem
