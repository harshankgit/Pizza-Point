import React, { useContext, useState } from "react";
import { CartContext } from "../utils/ContextReducer";
import Image from "next/image";
import Link from "next/link";
const CartHome = ({ products, SelectOption }) => {
  const { state, dispatch } = useContext(CartContext);
  const [cartState, setCartState] = useState(
    products.reduce((acc, product) => {
      acc[product["_id"]] = { size: "Regular", quantity: 1 };
      return acc;
    }, {})
  );

  const handleSizeChange = (productId, size) => {
    setCartState((prevState) => ({
      ...prevState,
      [productId]: { ...prevState[productId], size },
    }));
  };

  //   const handleQuantityChange = (productId, change) => {
  //     setCartState((prevState) => {
  //       const updatedQuantity = Math.max(
  //         1,
  //         prevState[productId].quantity + change
  //       );
  //       return {
  //         ...prevState,
  //         [productId]: { ...prevState[productId], quantity: updatedQuantity },
  //       };
  //     });
  //   };

  const getPrice = (product) => {
    const { size, quantity } = cartState[product["_id"]];
    return product.price[size] * quantity;
  };
  const handleAddToCart = async (product) => {
    const productState = cartState[product["_id"]];
    if (!productState) {
      console.error(
        `Product with ID ${product["_id"]} not found in cartState.`
      );
      return;
    }

    const { size, quantity } = productState;
    const prices = product.price[size] * quantity;

    // console.log("Adding to cart: ", {
    //   id: product["_id"],
    //   title: product.title,
    //   price: prices,
    //   quantity,
    //   img: product.img,
    //   priceOption: size,
    // });
    const updateItem = await state.find(
      (item) => item.tempId === product["_id"] + size
    );

    if (!updateItem) {
      dispatch({
        type: "ADD",
        id: product["_id"],
        tempId: product["_id"] + size,
        title: product.title,
        price: prices,
        quantity,
        img: product.img,
        priceOption: size,
      });
    }
    if (updateItem) {
      dispatch({
        type: "UPDATE",
        tempId: product["_id"] + size,
        price: prices,
        quantity,
      });
    }
  };

  return (
    <>
      {products.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {products.map((product) => (
              <div
                key={product["_id"]}
                className="border-2 rounded-lg shadow-xl p-4 bg-black hover:shadow-2xl transition-shadow duration-300 ease-in-out border-indigo-600 hover:border-indigo-800"
              >
                <Link
                  key={product["_id"]}
                  href={{ pathname: "/item/[item]" }}
                  as={`item/${product["_id"]}`}
                >
                  <Image
                    src={product.img}
                    alt={product.title}
                    layout="intrinsic"
                    width={600}
                    height={180}
                    style={{
                      minHeight: "300px",
                      maxHeight: "300px",
                      objectFit: "cover",
                    }}
                    className="rounded-lg object-cover mb-4"
                  />

                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-indigo-600">
                      {product.title}
                    </h3>
                    <span
                      className={`w-4 h-4 rounded-full ${
                        product.foodType === "veg"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                      title={
                        product.foodType === "veg"
                          ? "Vegetarian"
                          : "Non-Vegetarian"
                      }
                    ></span>
                  </div>
                  <p className="text-sm text-gray-400 italic mb-4">
                    {product.description}
                  </p>
                </Link>
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    Choose Size:
                  </label>

                  <select
                    className="w-full border-2 border-gray-600 bg-black text-white rounded px-3 py-2 focus:outline-none focus:border-indigo-600"
                    value={cartState[product["_id"]]?.size || ""}
                    onChange={({ target: { value } }) =>
                      handleSizeChange(product["_id"], value)
                    }
                  >
                    {product.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <div className="flex items-center justify-between mt-4">
              <label className="block text-gray-300 text-sm font-medium mb-1">
                Choose Quantity:
              </label>
              <button
                className="px-3 py-1 border border-gray-500 text-gray-300 rounded hover:bg-gray-700"
                onClick={() => handleQuantityChange(product["_id"], -1)}
              >
                -
              </button>
              <span className="text-lg text-gray-300">
                {cartState[product["_id"]]?.quantity || 1}
              </span>
              <button
                className="px-3 py-1 border border-gray-500 text-gray-300 rounded hover:bg-gray-700"
                onClick={() => handleQuantityChange(product["_id"], 1)}
              >
                +
              </button>
            </div> */}
                <p className="text-lg font-bold text-gray-300 mt-4">
                  Price: ₹{getPrice(product)} /-
                </p>
                <button
                  onClick={() => {
                    handleAddToCart(product);
             
                  }}
                  className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 mt-4 transition-colors duration-300"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center my-10">
          <p className="text-lg font-semibold text-gray-700">
            Oops! We couldn&apos;t find any food items in the &quot;
            {SelectOption}&quot; category.
          </p>

          <p className="text-sm text-gray-500">
            Try exploring other categories or come back later for more delicious
            options!
          </p>
        </div>
      )}
    </>
  );
};

export default CartHome;
