import { useState } from "react";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Organic Kale",
      price: 3.99,
      quantity: 2,
      image: "/api/placeholder/80/80",
      farm: "Sunshine Valley Farm"
    },
    {
      id: 2,
      name: "Heirloom Tomatoes",
      price: 4.50,
      quantity: 3,
      image: "/api/placeholder/80/80",
      farm: "Green Acres"
    },
    {
      id: 3,
      name: "Fresh Strawberries",
      price: 5.99,
      quantity: 1,
      image: "/api/placeholder/80/80",
      farm: "Berry Good Farms"
    },
    {
      id: 4,
      name: "Local Honey",
      price: 8.75,
      quantity: 1,
      image: "/api/placeholder/80/80",
      farm: "Buzzing Meadows Apiary"
    }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );
  
  const tax = subtotal * 0.0725; // 7.25% tax rate
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <button className="flex items-center text-green-700 hover:text-green-800">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mx-auto">Your Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-20 h-20 mx-auto text-gray-400" />
            <h2 className="text-2xl font-semibold mt-4 text-gray-700">Your cart is empty</h2>
            <p className="text-gray-500 mt-2">Add some fresh local produce to get started!</p>
            <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
              Browse Products
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="hidden md:flex text-sm text-gray-500 border-b pb-4 mb-4">
                  <div className="w-2/5">Product</div>
                  <div className="w-1/5 text-center">Price</div>
                  <div className="w-1/5 text-center">Quantity</div>
                  <div className="w-1/5 text-right">Total</div>
                </div>
                
                {cartItems.map(item => (
                  <div key={item.id} className="flex flex-col md:flex-row items-center py-4 border-b last:border-0">
                    <div className="w-full md:w-2/5 flex items-center mb-4 md:mb-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500">From: {item.farm}</p>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/5 text-center mb-4 md:mb-0">
                      <span className="md:hidden text-gray-500 mr-2">Price:</span>
                      <span className="text-gray-700">${item.price.toFixed(2)}</span>
                    </div>
                    
                    <div className="w-full md:w-1/5 flex justify-center mb-4 md:mb-0">
                      <div className="flex items-center border rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-3 py-1 text-gray-600 hover:text-green-600"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-3 py-1 text-gray-600 hover:text-green-600"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/5 flex justify-between md:justify-end items-center">
                      <span className="md:hidden text-gray-500 mr-2">Total:</span>
                      <span className="font-medium text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="ml-4 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                
                <div className="space-y-3 text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (7.25%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : "FREE"}</span>
                  </div>
                  {shipping > 0 && (
                    <div className="text-sm text-green-600">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping
                    </div>
                  )}
                  
                  <div className="border-t my-4 pt-4"></div>
                  
                  <div className="flex justify-between font-semibold text-lg text-gray-800">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <button className="w-full bg-green-600 text-white rounded-lg py-3 mt-6 hover:bg-green-700 transition">
                  Proceed to Checkout
                </button>
                
                <div className="mt-6">
                  <h3 className="font-medium text-gray-700 mb-2">We Accept</h3>
                  <div className="flex gap-2">
                    <div className="bg-gray-100 rounded px-2 py-1 text-xs">Visa</div>
                    <div className="bg-gray-100 rounded px-2 py-1 text-xs">Mastercard</div>
                    <div className="bg-gray-100 rounded px-2 py-1 text-xs">PayPal</div>
                    <div className="bg-gray-100 rounded px-2 py-1 text-xs">Apple Pay</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}