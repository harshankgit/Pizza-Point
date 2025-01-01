import React from "react";

// Dummy order data (you can replace this with actual data from an API)
const orders = [
  {
    id: 1,
    items: [
      { name: "Pizza Margherita", quantity: 2, price: 12.99 },
      { name: "Pepperoni Pizza", quantity: 1, price: 15.99 },
    ],
    total: 41.97,
    status: "Delivered",
    date: "2024-12-15",
  },
  {
    id: 2,
    items: [
      { name: "Veggie Pizza", quantity: 1, price: 14.49 },
      { name: "BBQ Chicken Pizza", quantity: 2, price: 18.99 },
    ],
    total: 52.47,
    status: "In Progress",
    date: "2024-12-20",
  },
  {
    id: 3,
    items: [{ name: "Margherita Pizza", quantity: 1, price: 12.99 }],
    total: 12.99,
    status: "Delivered",
    date: "2024-12-18",
  },
];

const MyOrder = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-lg">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold">Order #{order.id}</p>
                <p className="text-gray-600">{order.date}</p>
              </div>

              <div className="mb-4">
                <p className="font-semibold">Items:</p>
                <ul className="list-disc ml-5">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {item.name} (x{item.quantity}) - $
                      {item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">
                  Total:{" "}
                  <span className="text-green-500">
                    ${order.total.toFixed(2)}
                  </span>
                </p>
                <p
                  className={`text-sm font-semibold ${
                    order.status === "Delivered"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {order.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
