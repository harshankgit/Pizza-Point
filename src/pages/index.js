import React, { useState } from "react";
import CarouselComponent from "@/components/home/Carousel";
// import products from "../components/store/cartData.json";
import CartHome from "@/components/home/CartHome";
import { FaGlobe, FaLeaf, FaDrumstickBite } from "react-icons/fa";
import { baseUrl } from "../components/utils/baseUrl";
import Head from "next/head";

// export async function getStaticProps() {
//   let response = null;
//   try {
//     const data = await fetch(baseUrl + "api/pizzadata", {
//       method: "GET",
//     }).then((response) => response.json().catch((err) => err.message));

//     response = await JSON.parse(JSON.stringify(data));
//     console.log("response", response);
//   } catch (error) {
//     console.log(error.message);
//   }

//   return {
//     props: {
//       data: response.data,
//     },
//   };
// }
export async function getStaticProps() {
  let response = null;

  try {
    const res = await fetch(`${baseUrl}api/pizzadata`);
    if (!res.ok) throw new Error(`Failed to fetch data: ${res.statusText}`);
    response = await res.json();
  } catch (error) {
    console.error("Error fetching pizza data:", error.message);
  }

  return {
    props: {
      data: response?.data || null,
    },
    revalidate: 2,
  };
}

// console.log(baseUrl, process.env.NODE_ENV);
const Index = ({ data }) => {
  const [SelectOption, setSelectOption] = useState("All");
  let categories = new Set();
  let foodData = [];

  if (!data) {
    return (
      <div className="text-center">
        <h1>Pizza Data Unavailable</h1>
        <p>Please check back later.</p>
      </div>
    );
  }
  const handleData = () => {
    // console.log("data", data);
    data?.map((data) => {
      return foodData.push(data), categories.add(data.category);
    });
  };

  handleData();

  let categoriesArray = [...categories];
  // console.log("datas..", data);
  return (
    <div>
      <Head>
        <title>Pizza Point</title>

        <link
          rel="icon"
          href="https://assets.indolj.io/images/1726820931-Logo.webp?q=10"
        />
      </Head>

      <>
        <CarouselComponent />
        <div className="flex space-x-4 justify-center my-4">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700 transition duration-200"
            onClick={() => setSelectOption("All")}
          >
            <FaGlobe className="text-lg" />
            All
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded shadow-md hover:bg-green-700 transition duration-200"
            onClick={() => setSelectOption("veg")}
          >
            <FaLeaf className="text-lg" />
            Veg
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded shadow-md hover:bg-red-700 transition duration-200"
            onClick={() => setSelectOption("non-veg")}
          >
            <FaDrumstickBite className="text-lg" />
            Non-Veg
          </button>
        </div>
        {categoriesArray.map((value) => {
          const foodDataStore = foodData?.filter(
            (data) => data.category === value
          );
          const StoreNewData =
            SelectOption === "All"
              ? foodDataStore
              : foodDataStore.filter((data) => SelectOption === data.foodType);
          return (
            <React.Fragment key={value}>
              <div className="text-4xl mt-10  mb-3 uppercase font-bold">
                {value}
              </div>
              <hr />
              <CartHome products={StoreNewData} SelectOption={SelectOption} />
            </React.Fragment>
          );
        })}
      </>
    </div>
  );
};

export default Index;
