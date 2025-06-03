import { useState, useEffect } from "react";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import Header from "../component/header";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Footer from "../component/footer";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      setError('Please log in to view your cart');
      setLoading(false);
      return;
    }

    try {

      const decoded = jwtDecode(token);
      const extractedUserId = decoded.user.id;
      setUserId(extractedUserId);
      console.log('Decoded userId:', extractedUserId);
    } catch (err) {
      console.error('Error decoding token:', err);
      setError('Invalid session. Please log in again.');
      setLoading(false);
      return;
    }
  }, []);

   useEffect(() => {
    if (userId) {
      fetchCartData();
    }
  }, [userId]);

  const fetchCartData = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('Please login to view your cart');
      setLoading(false);
      return;
    }

    
    const cartResponse = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/user/cart?user=${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (!cartResponse.data.data || cartResponse.data.data.length === 0) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    // Find the active cart (not ordered)
    const activeCart = cartResponse.data.data.find(cart => !cart.is_ordered);
    
    if (!activeCart) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    // Set the extracted cart ID
    const extractedCartId = activeCart.id;
    setCartId(extractedCartId);
    console.log('Extracted cartId:', extractedCartId);

    const cartDetailResponse = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/user/cart/detail?cart=${extractedCartId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (!cartDetailResponse.data.data || cartDetailResponse.data.data.length === 0) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    const cartData = cartDetailResponse.data.data[0];
    
    // Transform the data to match your component structure
    const transformedItems = cartData.products_detail.map(product => ({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity: product.quantity,
      image: '/api/placeholder/150/150', 
      farm: 'Local Farm' 
    }));

    setCartItems(transformedItems);
    setLoading(false);

  } catch (err) {
    console.error('Error fetching cart:', err);
    setError('Failed to load cart data');
    setLoading(false);
  }
};
  const handleContinueShopping = () => {
    // Try to go back to the previous page
    if (window.history.length > 1) {
      navigate(-1); // Go back to previous page
    } else {
      // Fallback to homepage if no history
      navigate('/');
    }
  };
  
  const updateQuantity = async (productId, change) => {
    const item = cartItems.find(item => item.id === productId);
    const newQuantity = Math.max(1, item.quantity + change);

  // Check if cartId is available
    if (!cartId) {
      console.error('Cart ID not available');
      setError('Cart not found. Please refresh the page.');
      return;
    }

    try {
        const token = localStorage.getItem('accessToken');
        const decoded = jwtDecode(token);
        const userId = decoded.user.id;

        // Use the extracted cartId from state instead of hardcoded value
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/user/cart/items`,
          {
            user: userId,
            product : productId,
            quantity: newQuantity
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

    // Update local state
        setCartItems(
          cartItems.map(item =>
            item.id === productId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
  } catch (err) {
    console.error('Error updating quantity:', err);
    setError('Failed to update quantity. Please try again.');
  }     
};


  const removeItem = async (productId) => {
    // Check if cartId is available
    if (!cartId) {
      console.error('Cart ID not available');
      setError('Cart not found. Please refresh the page.');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      
      // Call the delete API
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/cart/delete?cart=${cartId}&product=${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Update local state by removing the item
      setCartItems(cartItems.filter(item => item.id !== productId));
      
    } catch (err) {
      console.error('Error removing item:', err);
      setError('Failed to remove item. Please try again.');
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  const total = subtotal

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header/>
        <div style={{ marginTop: '80px' }}>
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center">Loading your cart...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header/>
        <div style={{ marginTop: '80px' }}>
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center text-red-600">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <div style={{ marginTop: '80px' }}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          {cartItems.length > 0 && (
          <div className="flex items-center mb-8">
            <button 
            onClick={handleContinueShopping}
            className="flex items-center text-green-700 hover:text-green-800">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>Continue Shopping</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-800 mx-auto">Your Cart</h1>
          </div>
          )}
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-20 h-20 mx-auto text-gray-400" />
              <h2 className="text-2xl font-semibold mt-4 text-gray-700">Your cart is empty</h2>
              <p className="text-gray-500 mt-2 mb-4">Add some fresh local produce to get started!</p>
              <Link to="/stores" className="mt-10 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                Browse Products
              </Link>
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
                        <span className="text-gray-700">KHR {item.price}</span>
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
                          KHR {(item.price * item.quantity)}
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
 
                  
                  <div className="space-y-3 text-gray-600">

                    
                    <div className="flex justify-between font-semibold text-lg text-gray-800">
                      <span>Subtotal</span>
                      <span>KHR {subtotal}</span>
                    </div>
                  </div>
                  
                  <Link 
                    to="/checkout" 
                    className="w-full bg-green-600 text-white rounded-lg py-3 mt-6 hover:bg-green-700 transition inline-block text-center"
                  >
                    Proceed to Checkout
                  </Link>
      
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}