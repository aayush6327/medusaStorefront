import React from "react"
import { formatPrice } from "../../utils/format-price"
import { useCart } from "../../hooks/use-cart"
import { useWishlist } from "../../hooks/use-wishlist"
import WishlistIcon from "../../icons/wishlist"

const CartPopoverItem = ({ item, currencyCode }) => {
  const {
    loading,
    actions: {  removeItem },
  } = useCart()
  const {
    wishlist,
    actions: { addWishItem },
  } = useWishlist()

  console.log("item in cartItem", item)
  return (
    <div className="flex">
      <div className="overflow-hidden rounded-md mr-4">
        <img className="w-16 h-auto" src={item.thumbnail} alt={item.title} />
      </div>
      <div className="flex flex-col justify-between py-2">
        <div className="flex flex-1 justify-between ">
          <div>
            <h1 className="font-semibold text-lg">{item.title}</h1>
          </div>

          <button
            onClick={async () => {
              await addWishItem(item.variant.product.id)
              await removeItem(item.id)
            }}
         
          >
            <WishlistIcon height="1.2rem" />
          </button>

          <button onClick={async () => await removeItem(item.id)}>
            &times;
          </button>
        </div>
        <div>
          <p className="text-xs mt-1">
            <span className="text-ui-dark">Variant:</span> {item.description}
          </p>
        </div>
        <div className="flex items-center font-light text-xs">
          <p>
            <span className="text-ui-dark">Quantity</span>{" "}
            <span>{item.quantity}</span>
          </p>
          <div className="w-px h-4 bg-ui-dark mx-3" />
          <p>
            <span className="text-ui-dark">Price</span>{" "}
            <span>
              {formatPrice(item.unit_price, currencyCode, item.quantity)}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartPopoverItem
