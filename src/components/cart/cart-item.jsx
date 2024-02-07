import React, { useState } from "react"
import { useCart } from "../../hooks/use-cart"
import { useRegion } from "../../hooks/use-region"
import { classNames } from "../../utils/class-names"
import { formatPrice } from "../../utils/format-price"
import QuantitySelector from "../products/quantity-selector"
import { useWishlist } from "../../hooks/use-wishlist"
import WishlistIcon from "../../icons/wishlist"

const CartItem = ({ item, currencyCode, showDescription = true }) => {
  console.log("item in cart", item)
  const {
    actions: { removeItem, updateQuantity },
  } = useCart()
  const {
    wishlist,
    actions: { addWishItem, removeWishItem },
  } = useWishlist()
  const { region } = useRegion()
  const [onWishlist, setOnWishlist] = useState(() =>
  wishlist && wishlist.items && wishlist.items.some(i => i.item_id === item.id)
  )
  return (
    <div className="flex mb-6 last:mb-0">
      <div className="bg-ui rounded-md overflow-hidden mr-4 max-w-1/4">
        <img
          className="h-auto w-full object-cover"
          src={item.thumbnail}
          alt={item.title}
        />
      </div>
      <div className="flex text-sm flex-grow py-2">
        <div className="flex flex-col justify-between w-full flex-grow">
          <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-3xl">{item.title}</h1>
            <button onClick={async ()=> await addWishItem(item.variant.product.id)}>
              <WishlistIcon fill={onWishlist} />
            </button>
          </div>
            <p
              className={classNames(
                showDescription && "lg:block mb-4",
                "hidden font-light"
              )}
            >
              {item.variant?.product?.description}
            </p>
            <p>
              <span className="text-ui-dark">Variant:</span> {item.description}
            </p>
          </div>
          <p className="font-semibold">
            {formatPrice(item.unit_price, currencyCode, item.quantity, region?.tax_rate)}
          </p>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex justify-end w-full">
            <button onClick={async () => await removeItem(item.id)}>
              &times;
            </button>
          </div>
          <QuantitySelector
            quantity={item.quantity}
            increment={() =>
              updateQuantity({ id: item.id, quantity: item.quantity + 1 })
            }
            decrement={() =>
              updateQuantity({ id: item.id, quantity: item.quantity - 1 })
            }
          />
        </div>
      </div>
    </div>
  )
}

export default CartItem
