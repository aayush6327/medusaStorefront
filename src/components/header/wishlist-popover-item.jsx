
import React from "react"
import RegionalLink from '../utility/regional-link'

const WishlistPopoverItem = ({ item }) => {
  return (
    <RegionalLink to={item.handle} className="font-normal">
      <div className="flex hover:bg-gray-100">
        <div className="overflow-hidden rounded-md mr-4">
          <img className="w-16 h-auto" src={item.thumbnail} alt={item.title} />
        </div>
        <div className="flex items-center">
          <div>
            <p className="font-medium text-sm">{item.title}</p>
          </div>
        </div>
      </div>
    </RegionalLink>
  )
}

export default WishlistPopoverItem
