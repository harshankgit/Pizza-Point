import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { baseUrl } from "../../components/utils/baseUrl";

export async function getServerSideProps(context) {
  const { item } = context.query;
  console.log("item", item);
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
  console.log("data", data);
  const handleBack = () => {
    window.history.back();
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <button
          onClick={handleBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <div className="text-center">
          {/* <Image src="" alt=""/> */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Item Details
          </h2>
          <p className="text-gray-600 mb-4">
            A brief description of the item goes here. Provide relevant details
            and context.
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Key Features:
          </h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
            <li>Feature 4</li>
          </ul>
        </div>
        <div className="mt-6 flex justify-center">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Take Action
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
