import React from 'react'

function CheckOut() {
    const items = [
    { id: 1, name: "Product 1", price: 20 },
    { id: 2, name: "Product 2", price: 35 },
  ];

  const total = items.reduce((sum, item) => sum + item.price, 0);
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Checkout</h2>
      <ul className="divide-y">
        {items.map((item) => (
          <li key={item.id} className="py-2 flex justify-between">
            <span>{item.name}</span>
            <span className="font-medium">${item.price}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4 border-t pt-4 text-lg font-bold">
        <span>Total:</span>
        <span>${total}</span>
      </div>
    </div>
  )
}

export default CheckOut
