import React from "react";
import { motion } from "framer-motion";

export default function FloatingCart({ cart, cartOpen, changeQuantity, removeFromCart }) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: cartOpen ? 0 : '100%' }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col p-4 overflow-y-auto"
    >
      <h2 className="text-xl font-bold text-blue-800 mb-4">Your Cart</h2>
      {Object.keys(cart).length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {Object.entries(cart).map(([id, item]) => (
            <li key={id} className="flex flex-col border-b pb-2">
              <img src={item.image} alt="Product" className="w-full h-24 object-cover rounded mb-2" />
              <div className="flex justify-between items-center">
                <span className="font-medium text-blue-900">{item.title}</span>
                <button
                  onClick={() => removeFromCart(id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span>${item.price.toFixed(2)}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => changeQuantity(id, -1)}
                    className="bg-blue-300 text-white rounded px-2"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => changeQuantity(id, 1)}
                    className="bg-blue-500 text-white rounded px-2"
                  >
                    +
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {Object.keys(cart).length > 0 && (
        <div className="mt-auto pt-4 border-t">
          <div className="text-blue-900 font-semibold">
            Total: $
            {Object.values(cart)
              .reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toFixed(2)}
          </div>
          <button className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
            Checkout
          </button>
        </div>
      )}
    </motion.div>
  );
}
