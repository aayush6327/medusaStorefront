import { graphql, navigate } from "gatsby"
import React, { useEffect, useState } from "react"
import ProductExpandable from "../components/products/product-expandable"
import ProductImages from "../components/products/product-images"
import ProductListItem from "../components/products/product-list-item"
import ProductOptionSelector from "../components/products/product-option-selector"
import QuantitySelector from "../components/products/quantity-selector"
import Grid from "../components/utility/grid"
import SearchEngineOptimization from "../components/utility/seo"
import { useCart } from "../hooks/use-cart"
import { useProduct } from "../hooks/use-product"
import { useRegion } from "../hooks/use-region"
import { formatPrice } from "../utils/format-price"
import { pickDetails } from "../utils/pick-details"
import { toKebab } from "../utils/to-kebab"
import WishlistIcon from "../icons/wishlist"
import { useWishlist } from "../hooks/use-wishlist"
import * as Yup from 'yup';
import { useFormik } from "formik";
import HyperModal from 'react-hyper-modal';
import { StarIcon } from "@heroicons/react/solid";
import axios from "axios";
import styles from "../styles/theme.css"

const Product = ({ data, pageContext }) => {
  console.log("pageContext", pageContext);
  const { product, related } = data
  const { regionId, currencyCode, handle } = pageContext
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const details = pickDetails(product)
  const {
    loading,
    actions: { addItem },
  } = useCart()
  const {
    wishlist,
    actions: { addWishItem, removeWishItem },
  } = useWishlist()
  const reviewFormik = useFormik({
    initialValues: {
      title: "",
      user_name: "",
      rating: 1,
      content: ""
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required(),
      user_name: Yup.string().required(),
      rating: Yup.number().min(1).max(5),
      content: Yup.string().required()
    }),
    onSubmit: (values) => {
      axios.post(`http://localhost:9000/store/products/${product.id}/postreview`, {
        data: {
          title: values.title,
          user_name: values.user_name,
          rating: values.rating,
          content: values.content
        }
      })
        .then(() => {
          getReviews()
          setModalOpen(false)
        })
    }
  })
  function getReviews() {
    axios.get(`http://localhost:9000/store/products/${product.id}/reviews`)
      .then((response) => setReviews(response.data.product_reviews))
  }
  const {
    variant,
    options,
    quantity,
    actions: {
      updateOptions,
      increaseQuantity,
      decreaseQuantity,
      resetOptions,
    },
  } = useProduct(product)

  const price = variant
    ? variant.prices.find(p => p.currency_code === currencyCode)
    : undefined

  const handleAddToCart = async () => {
    await addItem({ variant_id: variant.id, quantity })
    resetOptions()
  }
  //   const [onWishlist, setOnWishlist] = useState(() =>
  //   wishlist.items.some(i => i.product_id === product.id)
  // )
  const [onWishlist, setOnWishlist] = useState(() =>
    wishlist && wishlist.items && wishlist.items.some(i => i.product_id === product.id)
  )
  console.log('wishlist:', wishlist);

  const toggleWishlist = async () => {
    if (!onWishlist) {
      await addWishItem(product.id)
      setOnWishlist(true)
    } else {
      const [item] = wishlist.items.filter(i => i.product_id === product.id)
      await removeWishItem(item.id)
      setOnWishlist(false)
    }
  }



  const { region } = useRegion()
  console.log("regionnnnn", region);
  useEffect(() => {
    if (region && region.id !== regionId) {
      navigate(`/${toKebab(region.name)}/${handle}`)
    }
    if (product) {
      getReviews()
    }
  }, [region, handle, regionId])

  return (
    <div className="layout-base">
      <SearchEngineOptimization
        title={product.title}
        description={product.description}
      />
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-3/5 lg:pr-14">
          <ProductImages images={product.images} />
        </div>
        <div className="mt-8 lg:mt-0 lg:w-2/5 lg:max-w-xl">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-3xl">{product.title}</h1>
            <button onClick={toggleWishlist}>
              <WishlistIcon fill={onWishlist} height="1.5rem" />
            </button>
          </div>
          <p className="text-lg mt-2 mb-4">
            {formatPrice(price?.amount, currencyCode, 1)}
          </p>
          <p className="font-light">{product.description}</p>
          {product.options.map((option, index) => {
            return (
              <div key={index} className="mt-6">
                <ProductOptionSelector
                  option={option}
                  current={options[option.id]}
                  updateOption={updateOptions}
                />
              </div>
            )
          })}
          <div className="inline-flex mt-4">
            <button
              className="btn-ui mr-2 px-12"
              onClick={() => handleAddToCart()}
              disabled={loading}
            >
              Add to bag
            </button>
            <QuantitySelector
              quantity={quantity}
              increment={increaseQuantity}
              decrement={decreaseQuantity}
            />
          </div>
          <div className="mt-12">
            {Object.keys(details).length > 0 && (
              <ProductExpandable title="Details">
                <ul className="list-inside list-disc">
                  {Object.keys(details).map((key, index) => {
                    return <li key={index}>{`${key}: ${details[key]}`}</li>
                  })}
                </ul>
              </ProductExpandable>
            )}
            {product.metadata?.care && (
              <ProductExpandable title="Care">
                <ul className="list-inside list-disc">
                  {product.metadata.care.map((instruction, index) => {
                    return <li key={index}>{`${instruction}`}</li>
                  })}
                </ul>
              </ProductExpandable>
            )}
          </div>
        </div>
      </div>
      {/* here */}
      <div className="container flex w-full min-h-screen">
  <div className="mt-8">
    <p className="text-lg font-semibold mb-4">Product Reviews</p>
    <HyperModal
      isOpen={isModalOpen}
      requestClose={() => setModalOpen(false)}
      renderOpenButton={() => (
        <button
          className="btn-ui mr-2 px-12"
          onClick={() => setModalOpen(true)}
        >
          Add Review
        </button>
      )}
    >
      <form onSubmit={reviewFormik.handleSubmit} className="p-4">
        <h2 className="mb-4">Add Review</h2>
        <div className="mb-4">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={reviewFormik.handleChange}
            value={reviewFormik.values.title}
            className="block w-full"
          />
          {reviewFormik.touched.title && reviewFormik.errors.title && (
            <span className="text-red-500">{reviewFormik.errors.title}</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="user_name">User Name</label>
          <input
            type="text"
            name="user_name"
            id="user_name"
            onChange={reviewFormik.handleChange}
            value={reviewFormik.values.user_name}
            className="block w-full"
          />
          {reviewFormik.touched.user_name && reviewFormik.errors.user_name && (
            <span className="text-red-500">{reviewFormik.errors.user_name}</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            name="rating"
            id="rating"
            onChange={reviewFormik.handleChange}
            value={reviewFormik.values.rating}
            min="1"
            max="5"
            className="block w-full"
          />
          {reviewFormik.touched.rating && reviewFormik.errors.rating && (
            <span className="text-red-500">{reviewFormik.errors.rating}</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            onChange={reviewFormik.handleChange}
            value={reviewFormik.values.content}
            className="block w-full"
            rows={5}
          ></textarea>
          {reviewFormik.touched.content && reviewFormik.errors.content && (
            <span className="text-red-500">{reviewFormik.errors.content}</span>
          )}
        </div>
        <button className="btn-ui mr-2 px-12">Add</button>
      </form>
    </HyperModal>
    {reviews.length === 0 && <div className="mt-4">There are no product reviews</div>}
    {reviews.length > 0 &&
      reviews.map((review, index) => (
        <div key={review.id} className="mt-4">
          <div className="flex justify-between items-center">
            <h3>{review.title}</h3>
            <div className="flex">
              {Array(review.rating)
                .fill(0)
                .map((_, index) => (
                  <StarIcon
                    key={index}
                    style={{ color: "#FFDF00", height: "24px", width: "24px" }}
                  />
                ))}
            </div>
          </div>
          <small className="text-grey-500">By {review.user_name}</small>
          <div className="mt-4 mb-4">{review.content}</div>
          <small className="text-grey-500">{review.created_at}</small>
          {index !== reviews.length - 1 && <hr />}
        </div>
      ))}
  </div>
</div>



      {/* till here */}


      <div className="my-12">
        <Grid
          title="You might also like"
          cta={{ to: "/products", text: "Browse all products" }}
        >
          {related.edges
            .map(({ node }) => node)
            .slice(0, 4)
            .map(product => {
              return <ProductListItem key={product.handle} product={product} />
            })}
        </Grid>
      </div>
    </div>
  )
}

export const query = graphql`
  query ($handle: String!) {
    product: medusaProducts(handle: { eq: $handle }) {
      id
      title
      description
      weight
      options {
        id
        title
        values {
          id
          value
        }
      }
      variants {
        options {
          value
          option_id
          id
        }
        id
        title
        prices {
          amount
          currency_code
        }
      }
      images {
        url
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
    related: allMedusaProducts(limit: 5, filter: { handle: { ne: $handle } }) {
      edges {
        node {
          handle
          title
          thumbnail {
            childImageSharp {
              gatsbyImageData
            }
          }
          variants {
            prices {
              amount
              currency_code
            }
          }
        }
      }
    }
  }
`

export default Product
