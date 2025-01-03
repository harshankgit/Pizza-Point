import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import { baseUrl } from "../../components/utils/baseUrl";

export async function getServerSideProps(context) {
  const { item } = context.query;
  const res = await fetch(baseUrl + "api/getdatabyid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ item: item }),
  });

  let data = await res.json();
  return { props: { data: data } };
}

const Item = ({ data }) => {
  const handleBack = () => {
    window.history.back();
  };

  const priceOptions = Object.entries(data?.data?.price || {}).map(
    ([size, price]) => (
      <div
        key={size}
        className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
      >
        <span className="text-gray-800">{size}</span>
        <span className="text-gray-600">{price} INR</span>
      </div>
    )
  );
  console.log("data", data);
  console.log("data", data.data.img);
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full my-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <button
          onClick={handleBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <motion.div
          className="text-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Image
            src={data.data.img}
            alt={data.data.title}
            width={600}
            height={300}
            className="rounded-lg object-cover"
          />
          <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">
            {data.data.title}
          </h2>
          <p className="text-gray-600 mb-4 italic">{data.data.description}</p>
          <span
            className={`inline-block px-4 py-1 text-sm font-semibold rounded-full ${
              data.data.foodType === "veg"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {data.data.foodType === "veg" ? "Vegetarian" : "Non-Vegetarian"}
          </span>
          <p className="text-gray-600 mt-4">
            <strong>Category:</strong> {data.data.category}
          </p>
        </motion.div>

        <motion.div
          className="mt-6 bg-gray-50 p-4 rounded-lg border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Available Sizes and Prices:
          </h3>
          {priceOptions}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Item;
