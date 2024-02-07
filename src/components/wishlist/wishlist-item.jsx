// import React from "react"
// import WishlistIcon from "../../icons/wishlist"
// import { useWishlist } from "../../hooks/use-wishlist"
// import RegionalLink from "../utility/regional-link"
// import { useCart } from "../../hooks/use-cart"
// import QuantitySelector from "../products/quantity-selector"
// import ProductExpandable from "../components/products/product-expandable"
// import ProductImages from "../components/products/product-images"
// import ProductListItem from "../components/products/product-list-item"
// import ProductOptionSelector from "../components/products/product-option-selector"
// import Grid from "../components/utility/grid"

// const WishlistItem = ({ item }) => {
//   console.log("item",item);
//   const {
//     actions: { removeWishItem },
//   } = useWishlist()
//   const {
//     loading,
//     actions: { addItem },
//   } = useCart()
//   const { product } = item
 
//   const handleAddToCart = async () => {
//     // await addItem({ variant_id: variant.id, quantity })
//   }
//   return (
//     <div className="flex mb-6 last:mb-0">
//       <div className="bg-ui rounded-md overflow-hidden mr-4 max-w-1/4">
//         <img
//           className="h-auto w-full object-cover"
//           src={product.thumbnail}
//           alt={product.title}
//         />
//       </div>
//       <div className="flex text-sm flex-grow py-2 justify-between space-x-8">
//         <RegionalLink to={product.handle} className="w-full">
//           <div className="flex flex-col justify-between w-full hover:text-green-400">
//             <div className="flex flex-col">
//               <p className="font-semibold mb-4">{product.title}</p>
//               <p>{product.description}</p>
//               <div className="flex-col mt-4 align-bottom">
//                 <button
//                   className="btn-ui mr-2 px-12"
//                   onClick={() => handleAddToCart()}
//                   disabled={loading}
//                 >
//                   Add to bag
//                 </button>
              
//               </div>
//             </div>
//           </div>
//         </RegionalLink>

//         <div className="flex flex-col justify-between">
//           <div className="flex justify-end w-full">
//             <button onClick={async () => await removeWishItem(item.id)}>
//               <WishlistIcon fill={true} />
//             </button>
//           </div>
//         </div>
//         <div className="flex-col mt-4"></div>
//       </div>
//     </div>
//   )
// }

// export default WishlistItem
import React, { useState } from "react"
import WishlistIcon from "../../icons/wishlist"
import { useWishlist } from "../../hooks/use-wishlist"
import RegionalLink from "../utility/regional-link"
import { useCart } from "../../hooks/use-cart"


const WishlistItem = ({ item }) => {
  console.log("item",item);
  const [data , setData] = useState()
  
  const {
    actions: { removeWishItem },
  } = useWishlist()
  const {
    loading,
    actions: { addItem },
  } = useCart()
  const { product } = item
 
  const handleAddToCart = async () => {
    // await addItem({ variant_id: variant.id, quantity })
  }
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
              <div className="flex-col mt-4 align-bottom">
                <button
                  className="btn-ui mr-2 px-12"
                  onClick={() => handleAddToCart()}
                  disabled={loading}
                >
                  Add to bag
                </button>
              
              </div>
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
        <div className="flex-col mt-4"></div>
      </div>
    </div>
  )
}

export default WishlistItem

