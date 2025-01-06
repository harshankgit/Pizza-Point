// import React, { useState, useEffect } from "react";
// import { baseUrl } from "../components/utils/baseUrl";

// // Dummy order data (you can replace this with actual data from an API)
// const orders = [
//   {
//     id: 1,
//     items: [
//       { name: "Pizza Margherita", quantity: 2, price: 12.99 },
//       { name: "Pepperoni Pizza", quantity: 1, price: 15.99 },
//     ],
//     total: 41.97,
//     status: "Delivered",
//     date: "2024-12-15",
//   },
//   {
//     id: 2,
//     items: [
//       { name: "Veggie Pizza", quantity: 1, price: 14.49 },
//       { name: "BBQ Chicken Pizza", quantity: 2, price: 18.99 },
//     ],
//     total: 52.47,
//     status: "In Progress",
//     date: "2024-12-20",
//   },
//   {
//     id: 3,
//     items: [{ name: "Margherita Pizza", quantity: 1, price: 12.99 }],
//     total: 12.99,
//     status: "Delivered",
//     date: "2024-12-18",
//   },
// ];

// const MyOrder = () => {
//   const [orderData, setOrderData] = useState([]);
//   const fetchData = async () => {
//     await fetch(baseUrl + "api/myorder", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email: localStorage.getItem("useremail") }),
//     }).then(async (res) => {
//       let response = await res.json();
//       setOrderData(response.order_data);
//     });
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);
//   console.log("orderData", orderData);
//   const email = orderData.email;

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div>
//         {`Email :${email}`}
//       </div>
//       <h1 className="text-3xl font-bold text-center mb-6">My Orders</h1>

//       {orders.length === 0 ? (
//         <p className="text-center text-lg">You have no orders yet.</p>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div
//               key={order.id}
//               className="border p-4 rounded-lg shadow-md hover:shadow-lg transition"
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <p className="text-lg font-semibold">Order #{order.id}</p>
//                 <p className="text-gray-600">{order.date}</p>
//               </div>

//               <div className="mb-4">
//                 <p className="font-semibold">Items:</p>
//                 <ul className="list-disc ml-5">
//                   {order.items.map((item, index) => (
//                     <li key={index} className="text-gray-700">
//                       {item.name} (x{item.quantity}) - $
//                       {item.price * item.quantity}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="flex justify-between items-center">
//                 <p className="text-xl font-semibold">
//                   Total:{" "}
//                   <span className="text-green-500">
//                     ${order.total.toFixed(2)}
//                   </span>
//                 </p>
//                 <p
//                   className={`text-sm font-semibold ${
//                     order.status === "Delivered"
//                       ? "text-green-500"
//                       : "text-yellow-500"
//                   }`}
//                 >
//                   {order.status}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOrder;

// import React, { useState, useEffect } from "react";
// import { baseUrl } from "../components/utils/baseUrl";

// const MyOrder = () => {
//   const [orderData, setOrderData] = useState([]); // Initialize as an empty array
//   const [email, setEmail] = useState("");

//   // Fetch order data from the API
//   const fetchData = async () => {
//     try {
//       const res = await fetch(baseUrl + "api/myorder", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email: localStorage.getItem("useremail") }),
//       });

//       const response = await res.json();
//       console.log("API Response:", response);
//       if (response) {
//         setOrderData(response?.order_data?.order_data);
//       }
//       if (response?.email) {
//         setEmail(response.email); // Set email from response
//       }

//       if (Array.isArray(response?.order_data)) {
//         setOrderData(response.order_data); // Set order data if it's an array
//       } else {
//         console.error("Invalid order_data format:", response.order_data);
//         setOrderData(response?.order_data?.order_data);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setOrderData([]); // Set to empty array on error
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
//   console.log("orderData", orderData);
//   return (
//     <div className="container mx-auto py-8 px-4">
//       {/* Display user email */}
//       {email && <div className="mb-6">{`Email: ${email}`}</div>}

//       {/* Page Title */}
//       <h1 className="text-3xl font-bold text-center mb-6">My Orders</h1>

//       {/* Conditional Rendering */}
//       {Array.isArray(orderData) && orderData.length > 0 ? (
//         <div className="space-y-6">
//           {orderData.map((orderGroup, index) => (
//             <div
//               key={index}
//               className="border p-4 rounded-lg shadow-md hover:shadow-lg transition"
//             >
//               {/* Order Details */}
//               <div className="flex justify-between items-center mb-4">
//                 <p className="text-lg font-semibold">Order #{index + 1}</p>
//                 <p className="text-gray-600">{orderGroup[0]?.order_date}</p>
//               </div>

//               {/* Items List */}
//               <div className="mb-4">
//                 <p className="font-semibold">Items:</p>
//                 <ul className="list-disc ml-5">
//                   {orderGroup.slice(1).map((item, itemIndex) => (
//                     <li key={itemIndex} className="text-gray-700">
//                       {item.title} (x{item.quantity}) - ₹
//                       {(item.price * item.quantity).toFixed(2)}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Order Summary */}
//               <div className="flex justify-between items-center">
//                 <p className="text-xl font-semibold">
//                   Total:
//                   <span className="text-green-500">
//                     ₹
//                     {orderGroup
//                       .slice(1)
//                       .reduce((total, item) => {
//                         const price = parseFloat(item.price) || 0;
//                         const quantity = parseInt(item.quantity, 10) || 0;
//                         return total + price * quantity;
//                       }, 0)
//                       .toFixed(2)}{" "}
//                     /-
//                   </span>
//                 </p>
//                 <p className="text-sm font-semibold text-yellow-500">
//                   Status: Pending
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-lg">You have no orders yet.</p>
//       )}
//     </div>
//   );
// };

// export default MyOrder;

import React, { useState, useEffect } from "react";
import { baseUrl } from "../components/utils/baseUrl";
import Image from "next/image";

const MyOrder = () => {
  const [orderData, setOrderData] = useState([]);
  const [email, setEmail] = useState("");
  const getRandomStatus = () => {
    const statuses = ["Pending", "Delivered", "In Progress", "Cancelled"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };
  // Fetch order data from the API
  const fetchData = async () => {
    try {
      const res = await fetch(baseUrl + "api/myorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: localStorage.getItem("useremail") }),
      });

      const response = await res.json();
      if (response) {
        setOrderData(response?.order_data?.order_data || []);
        setEmail(response.email || "");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setOrderData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Display user email */}
      {email && <div className="mb-6 text-center">{`Email: ${email}`}</div>}

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-6">My Orders</h1>

      {/* Conditional Rendering */}
      {Array.isArray(orderData) && orderData.length > 0 ? (
        <div className="space-y-6">
          {orderData.map((orderGroup, index) => (
            <div key={index} className="border p-4 rounded-lg ">
              {/* Order Details */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold">Order #{index + 1}</p>
                <p className="text-gray-600">{orderGroup[0]?.order_date}</p>
              </div>

              {/* Items List */}
              <div className="mb-4">
                <p className="font-semibold">Items:</p>
                <ul className="space-y-4">
                  {orderGroup.slice(1).map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center space-x-4 border-b pb-2"
                    >
                      {/* Item Image */}
                      <Image
                        src={item.img}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="text-blue-500 font-semibold">
                          {item.title} (x{item.quantity})
                        </p>
                        <p className="text-gray-500 text-sm">
                          Item Size: {item.priceOption}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {" "}
                          Price: ₹{item.price.toFixed(2)} per item
                        </p>
                        <p className="text-gray-300 font-semibold">
                          Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order Summary */}
              <div className="flex justify-between items-center mt-4">
                <p className="text-xl font-semibold">
                  Total:
                  <span className="text-green-500">
                    ₹
                    {orderGroup
                      .slice(1)
                      .reduce((total, item) => {
                        const price = parseFloat(item.price) || 0;
                        const quantity = parseInt(item.quantity, 10) || 0;
                        return total + price * quantity;
                      }, 0)
                      .toFixed(2)}{" "}
                    /-
                  </span>
                </p>
                <p className="text-sm font-semibold text-yellow-500">
                  Status: {getRandomStatus()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">You have no orders yet.</p>
      )}
    </div>
  );
};

export default MyOrder;
