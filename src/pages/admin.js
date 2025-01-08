import React, { useState } from "react";
import { baseUrl } from "../components/utils/baseUrl";
import { useRouter } from "next/navigation";
const Admin = ({ data }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("");
  const [price, setPrice] = useState({ Regular: "", Medium: "", Large: "" });
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const options = ["Regular", "Medium", "Large"];
  const [activeTab, setActiveTab] = useState("products"); // Manage active tab
  const [items, setItems] = useState(data || []);
  const [errors, setErrors] = useState({
    title: "",
    category: "",
    foodType: "",
    price: "",
    description: "",
    img: "",
  });
  const router = useRouter();
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
        setItems([...items, result.data]);
        console.log("added successfully");
        window.location.reload();
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
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${baseUrl}api/pizzadata`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();
      if (result.success) {
        setItems(items.filter((item) => item._id !== id));
      } else {
        alert("Failed to delete item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6">Add New Food Item</h2>
      <div className="flex mb-6">
        <button
          className={`px-4 py-2 rounded-l ${
            activeTab === "products"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
          onClick={() => setActiveTab("products")}
        >
          Product List
        </button>
        <button
          className={`px-4 py-2 rounded-r ${
            activeTab === "add"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
          onClick={() => setActiveTab("add")}
        >
          Add Food Item
        </button>
      </div>
      {activeTab === "add" && (
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
      )}
      {activeTab === "products" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Products List</h2>
          {items.length === 0 ? (
            <p>No items available</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Title</th>
                  <th className="border border-gray-300 px-4 py-2">Category</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Food Type
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item?.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {item?.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item?.category}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item?.foodType}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => {
                          handleDelete(item?._id);
                        }} // Attach the delete function
                        className="px-2 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/editdata",
                            query: { id: item?._id },
                          });
                        }}
                        className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;

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
      data: response?.data || [],
    },
    revalidate: 2,
  };
}
