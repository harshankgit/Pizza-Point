import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { baseUrl } from "../components/utils/baseUrl";

const EditData = () => {
  const router = useRouter();
  const { id } = router.query;

  const [dataArray, setDataArray] = useState([]);
  const [foundItem, setFoundItem] = useState(null);

  // Fetch data from the API and update the dataArray state
  const fetchData = async () => {
    try {
      const response = await fetch(baseUrl + "api/pizzadata");
      const result = await response.json();
      setDataArray(result.data);
      console.log("Fetched data:", result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Filter the dataArray to find the item matching the ID
  const filterData = () => {
    if (id && dataArray.length > 0) {
      const foundItems = dataArray.find((data) => data._id === id);
      setFoundItem(foundItems || null); // If not found, set it to null
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter data whenever ID or dataArray changes
  useEffect(() => {
    filterData();
  }, [filterData]);
  // Handle changes to input fields and update state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoundItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (e, option) => {
    const { value } = e.target;
    setFoundItem((prev) => ({
      ...prev,
      price: { ...prev.price, [option]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(baseUrl + "api/pizzadata", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: foundItem?._id,
        title: foundItem?.title,
        category: foundItem?.category,
        foodType: foundItem?.foodType,
        price: foundItem?.price,
        description: foundItem?.description,
        img: foundItem?.img,
        options: foundItem?.options,
      }),
    });
    const result = await response.json();
    if (result.success) {
      console.log("Updated successfully");
      router.push("/admin");
    } else {
      console.error("Update failed:", result.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={foundItem?.title || ""}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter food title"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={foundItem?.category || ""}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Pizza">Pizza</option>
            <option value="Burger">Burger</option>
            <option value="Pasta">Pasta</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="foodType"
          >
            Food Type
          </label>
          <select
            id="foodType"
            name="foodType"
            value={foundItem?.foodType || ""}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Select food type
            </option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Price</label>
          <div className="flex space-x-4">
            {foundItem?.options?.map((option) => (
              <div key={option} className="flex flex-col w-1/3">
                <label className="text-sm font-semibold" htmlFor={option}>
                  {option} Price (₹)
                </label>
                <input
                  type="number"
                  id={option}
                  value={foundItem?.price?.[option] || ""}
                  onChange={(e) => handleOptionChange(e, option)}
                  className="p-2 border border-gray-300 rounded"
                  placeholder={`Enter ${option} price`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={foundItem?.description || ""}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter food description"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="img">
            Image URL
          </label>
          <input
            type="text"
            id="img"
            name="img"
            value={foundItem?.img || ""}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter image URL"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update Food Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditData;
