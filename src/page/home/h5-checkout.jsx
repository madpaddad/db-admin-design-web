import { useState, useEffect } from 'react';
import { CreditCard, QrCode, Smartphone, CheckCircle, ChevronRight, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import Header from '../component/header';
import Footer from '../component/footer';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });

  // Add cart-related state
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [userId, setUserId] = useState(null);

  // Fetch user ID from token
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      setError('Please log in to view checkout');
      setLoading(false);
      navigate('/login'); // Redirect to login if no token
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
      navigate('/login');
      return;
    }
  }, [navigate]);

  // Fetch cart data when userId is available
  useEffect(() => {
    if (userId) {
      fetchCartData();
    }
  }, [userId]);


  //payment: 
  useEffect(()=> {

    console.log(paymentConfirmed)
      // Only proceed f all required values are set
      if (!cartId || !userId || !paymentMethod || !paymentConfirmed) return;
      
      const checkout = async () => {
        try {
          setIsProcessing(true);
        
          const url = `${import.meta.env.VITE_API_BASE_URL}/user/cart/checkout?cart=${cartId}`;
          const token = localStorage.getItem('accessToken');
        
          const payload = {
            user: userId,
            payment_method: paymentMethod === 'khqr' ? 'card' : 'cash',
          };
        
          console.log("Token:", token);
          console.log("Payload:", payload);
          console.log("URL:", url);
        
          const response = await axios.post(url, payload, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          

          if(response.data.message === 'Checkout Successfully'){
            setIsSuccess(true)
          } else {
            setIsSuccess(false)
          }
        
        } catch (error) {
          console.error("Error during checkout:", error.response?.data || error.message);
        }
      };
    
    
      checkout();
  }, [cartId, userId, paymentMethod, paymentConfirmed]);


  const fetchCartData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('Please login to view checkout');
        setLoading(false);
        return;
      }

      // Get user's cart
      const cartResponse = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user/cart?user=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (!cartResponse.data.data || cartResponse.data.data.length === 0) {
        setCartItems([]);
        setLoading(false);
        navigate('/cart'); // Redirect to cart if empty
        return;
      }

      // Find the active cart (not ordered)
      const activeCart = cartResponse.data.data.find(cart => !cart.is_ordered);
      
      if (!activeCart) {
        setCartItems([]);
        setLoading(false);
        navigate('/cart');
        return;
      }

      // Set the extracted cart ID
      const extractedCartId = activeCart.id;
      setCartId(extractedCartId);
      console.log('Extracted cartId:', extractedCartId);

      // Get cart details
      const cartDetailResponse = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user/cart/detail?cart=${extractedCartId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (!cartDetailResponse.data.data || cartDetailResponse.data.data.length === 0) {
        setCartItems([]);
        setLoading(false);
        navigate('/cart');
        return;
      }

      const cartData = cartDetailResponse.data.data[0];
      
      // Transform the data to match your component structure
      const transformedItems = cartData.products_detail.map(product => ({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        quantity: product.quantity,
        image: '/api/placeholder/80/80' // You might want to use actual product images
      }));

      setCartItems(transformedItems);
      setLoading(false);

    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to load cart data');
      setLoading(false);
    }
  };

  // Remove hardcoded cart items and calculate from fetched data
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.10; // 10% tax
  const total = subtotal 

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };


  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header/>
        <div style={{ marginTop: '80px' }}>
          <div className="container mx-auto p-4">
            <div className="text-center">Loading checkout...</div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header/>
        <div style={{ marginTop: '80px' }}>
          <div className="container mx-auto p-4">
            <div className="text-center text-red-600">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  // Show empty cart message
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header/>
        <div style={{ marginTop: '80px' }}>
          <div className="container mx-auto p-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some items to your cart before checkout.</p>
            <button 
              onClick={() => navigate('/stores')}
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-center">
          <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your order has been placed and is ready for pickup.</p>
          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <h3 className="font-semibold mb-2">Pickup Information</h3>
            <p className="text-gray-700">Farm Fresh Market</p>
            <p className="text-gray-700">123 Harvest Road</p>
            <p className="text-gray-700 mb-2">Open daily: 8AM - 6PM</p>
            <p className="text-sm text-gray-500">Please bring your order confirmation when picking up your items.</p>
          </div>
          <button 
            className="w-full bg-green-600 text-white py-3 hover:text-green-200 rounded-md font-medium hover:bg-green-700 transition-colors cursor-pointer"
            onClick={() => navigate('/')}
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <div style={{ marginTop: '80px' }}>
        <div className="container mx-auto p-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Order Summary */}
            <div className="lg:w-2/5">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-4 flex items-center">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 rounded-md object-cover mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">KHR {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 mt-2">
                  <div className="flex justify-between font-bold py-2 text-lg">
                    <span>Total</span>
                    <span>KHR {total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-4 bg-yellow-50 p-4 rounded-md border border-yellow-100">
                  <h3 className="font-medium text-yellow-800">Pickup Information</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Your order will be available for pickup at our local market once payment is complete.
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="lg:w-3/5">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
                
                <div className="space-y-3 mb-6">
                  <div 
                    className={`border rounded-md p-4 flex items-center cursor-pointer hover:bg-gray-50 ${paymentMethod === 'khqr' ? 'border-green-500 bg-green-50' : ''}`}
                    onClick={() => handlePaymentMethodChange('khqr')}>
                    <QrCode className="text-gray-600 mr-3" size={24} />
                    <span className="font-medium">KHQR</span>
                    {paymentMethod === 'khqr' && <ChevronRight className="ml-auto text-green-500" size={20} />}
                  </div>
                  
                  <div 
                    className={`border rounded-md p-4 flex items-center cursor-pointer hover:bg-gray-50 ${paymentMethod === 'cash' ? 'border-green-500 bg-green-50' : ''}`}
                    onClick={() => handlePaymentMethodChange('cash')}>
                    <DollarSign className="text-gray-600 mr-3" size={24} />
                    <span className="font-medium">Cash</span>
                    {paymentMethod === 'cash' && <ChevronRight className="ml-auto text-green-500" size={20} />}
                  </div>
          
                </div>

                {paymentMethod === 'khqr' && (
                  <div className="bg-gray-50 p-6 rounded-md text-center">
                    <h3 className="font-medium mb-4">Scan KHQR Code to Pay</h3>
                    <div className="bg-white p-4 inline-block rounded-md mb-4">
                      <QrCode size={180} className="mx-auto" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Scan this QR code with your mobile banking app to complete payment.
                    </p>
                    <button
                      className="w-full bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700 transition-colors cursor-pointer"
                      onClick={() => setPaymentConfirmed(true)}
                    >
                      {isProcessing ? 'Processing...' : 'Confirm Payment'}
                    </button>
                  </div>
                )}

                {paymentMethod === 'cash' && (
                  <div className="mt-4">
                    <button
                      onClick={() => setPaymentConfirmed(true)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition"
                    >
                      {isProcessing ? 'Processing...' : 'Confirm Payment'}
                    </button>
                  </div>
                )}

                {!paymentMethod && (
                  <div className="bg-gray-50 p-6 rounded-md text-center">
                    <p className="text-gray-600">Please select a payment method to continue.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      
      </div>
      <Footer/>
    </div>
  );
}