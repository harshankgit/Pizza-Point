import React, { useState } from "react";
import { baseUrl } from "../components/utils/baseUrl";
const Admin = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("");
  const [price, setPrice] = useState({ Regular: "", Medium: "", Large: "" });
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const options = ["Regular", "Medium", "Large"];

  const [errors, setErrors] = useState({
    title: "",
    category: "",
    foodType: "",
    price: "",
    description: "",
    img: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let valid = true;
    let newErrors = { ...errors };

    if (!title) {
      newErrors.title = "Title is required";
      valid = false;
    }

    if (!category) {
      newErrors.category = "Category is required";
      valid = false;
    }

    if (!foodType) {
      newErrors.foodType = "Food type is required";
      valid = false;
    }

    if (!price.Regular || !price.Medium || !price.Large) {
      newErrors.price = "All price fields are required";
      valid = false;
    }

    if (!description) {
      newErrors.description = "Description is required";
      valid = false;
    }

    if (!img) {
      newErrors.img = "Image URL is required";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
    } else {
      setErrors({}); // Clear errors if validation passes
      // Handle form submission logic here
      console.log("Form submitted successfully with data:", {
        title,
        category,
        foodType,
        price,
        description,
        img,
        options,
      });

      const response = await fetch(baseUrl + "api/additem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          foodType,
          price,
          description,
          img,
          options,
        }),
      });
      const result = await response.json();
      if (result.success) {
        console.log("added successfully");
        alert("success");
      } else {
        console.log("not success");
      }
      setTitle("");
      setCategory("");
      setFoodType("");
      setPrice({ Regular: "", Medium: "", Large: "" });
      setDescription("");
      setImg(" ");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6">Add New Food Item</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter food title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Pizza">Pizza</option>
            <option value="Burger">Burger</option>
            <option value="Pasta">Pasta</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
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
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Select food type
            </option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Price</label>
          <div className="flex space-x-4">
            {options.map((option) => (
              <div key={option} className="flex flex-col w-1/3">
                <label className="text-sm font-semibold" htmlFor={option}>
                  {option} Price (₹)
                </label>
                <input
                  type="number"
                  id={option}
                  value={price[option]}
                  onChange={(e) =>
                    setPrice({ ...price, [option]: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded"
                  placeholder={`Enter ${option} price`}
                />
              </div>
            ))}
          </div>
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter food description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="img">
            Image URL
          </label>
          <input
            type="text"
            id="img"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter image URL"
          />
          {errors.img && <p className="text-red-500 text-sm">{errors.img}</p>}
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Food Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default Admin;
