import React, { useContext } from "react";
import { CartContext } from "@/components/utils/ContextReducer";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";
import { baseUrl } from "../components/utils/baseUrl";
import { toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  const { state, dispatch } = useContext(CartContext);
  console.log("statestate", state);
  let router = useRouter();
  const handleQuantityChange = (tempId, delta) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      tempId: tempId,
      delta: delta,
    });
  };
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("useremail");
  
    if (userEmail === null || userEmail === undefined) {
      router.push("/login");
    } else {
      try {
        const stripe = await stripePromise;
        const response = await fetch(baseUrl + "api/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems: state,
          }),
        });
  
        if (response.status === 200) {
          const { sessionId } = await response.json();
          await stripe.redirectToCheckout({ sessionId });
        } else {
          toast.error("Failed to initiate payment. Try again!");
          console.error("Failed to create checkout session:", response.statusText);
        }
      } catch (err) {
        console.error("Error:", err);
        toast.error("Something went wrong!");
      }
    }
  };
  const getTotalPrice = () => {
    return state.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      {state.length > 0 ? (
        <div className="container mx-auto p-4 sm:p-6 min-h-[70vh]">
          <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-800 text-sm">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="border border-gray-700 px-4 py-2">Number</th>
                  <th className="border border-gray-700 px-4 py-2">Image</th>
                  <th className="border border-gray-700 px-4 py-2">Title</th>
                  <th className="border border-gray-700 px-4 py-2">Size</th>
                  <th className="border border-gray-700 px-4 py-2">Price</th>
                  <th className="border border-gray-700 px-4 py-2">Quantity</th>
                  <th className="border border-gray-700 px-4 py-2">Subtotal</th>
                  <th className="border border-gray-700 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.map((item, index) => (
                  <tr key={item.id} className="hover:bg-blue-900">
                    <td className="border border-gray-700 px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-center">
                      <Image
                        src={item.img}
                        alt={item.title}
                        className="w-16 h-16 object-cover mx-auto"
                        width={500}
                        height={300}
                      />
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-center">
                      {item.title}
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-center">
                      {item.priceOption}
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-center">
                      ₹{item.price} /-
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.tempId, -1)}
                          className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-800"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.tempId, 1)}
                          className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-800"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-center">
                      ₹{item.price * item.quantity} /-
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-center">
                      <button
                        // onClick={() => handleDelete(item.id)}
                        onClick={() => {
                          dispatch({ type: "REMOVE", tempId: item.tempId });
                        }}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 text-right">
            <h2 className="text-xl font-bold">
              Total Price: ₹{getTotalPrice()} /-
            </h2>
            <button
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => {
                handleCheckOut();
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center bg-black p-6">
          <Image
            src="https://i.pinimg.com/736x/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038.jpg"
            alt="Empty Cart"
            className="w-72 h-auto mb-6 rounded-xl shadow-lg"
            width={500}
            height={300}
          />
          <p className="text-xl font-semibold text-gray-600 mt-4 uppercase tracking-wide">
            Your cart is empty!
          </p>
        </div>
      )}
    </>
  );
};

export default Cart;
