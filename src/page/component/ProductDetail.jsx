import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowLeft, ShoppingCart, Minus, Plus } from 'lucide-react';
import Header from "../component/header";
import { jwtDecode } from 'jwt-decode';
import Footer from './footer';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); 

  useEffect(() => {
    const getProduct = async () => {
      try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/user/product/view?product=${id}`;
        const response = await axios.get(url);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const addToCart = async (productId) => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      alert('សូមចូលគណនីជាមុនសិន');
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.user.id;

      const payload = {
        user: userId,
        product: productId,
        quantity: quantity,
      };

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/cart/items`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      alert('បានបន្ថែមទៅក្នុងកន្ត្រក!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('បរាជ័យក្នុងការបន្ថែមទៅកន្ត្រក');
    }
  };

  const increaseQuantity = () => {
    if (product && quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-5xl mx-auto animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="w-full h-80 bg-gray-200 rounded mb-4" />
        <div className="h-6 bg-gray-200 rounded w-1/6 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-full mb-4" />
        <div className="h-10 bg-green-200 rounded w-full" />
      </div>
    );
  }

  if (!product) return <div className="p-8">Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <button
          onClick={() => navigate(-1)}
          className="mt-10 md:mx-10 mb-6 flex items-center text-green-700 hover:text-green-900 transition"
        >
          <ArrowLeft className="mt-10 w-5 h-5 mr-2" />
          <span className="mt-10 text-base font-medium">Back</span>
      </button>
      <div className="mt-10 mx-4 md:mx-16 mb-16">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src={product.picture}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4 text-gray-900">{product.name}</h1>
              <p className="text-green-600 text-2xl font-semibold mb-2">៛{product.price}</p>
              <p className="text-gray-700 mb-1">
                <strong>ចំនួន :</strong> {product.quantity}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>ហាង :</strong> {product.store_name}
              </p>
              <p className="text-gray-700 mt-4">{product.description}</p>

              {/* Quantity Selector */}
              <div className="mt-6 flex items-center border border-gray-300 rounded overflow-hidden w-fit">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className={`w-10 h-10 text-lg font-bold ${
                    quantity <= 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-black"
                  } flex items-center justify-center bg-gray-100`}
                >
                  −
                </button>
                <span className="w-12 text-center text-lg font-semibold text-gray-800 bg-white border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  disabled={product && quantity >= product.quantity}
                  className={`w-10 h-10 text-lg font-bold ${
                    product && quantity >= product.quantity
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:text-black"
                  } flex items-center justify-center bg-gray-100`}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => addToCart(product.id)}
              className="mt-6 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition-shadow shadow-sm hover:shadow-md"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              ដាក់ចូលកន្ត្រក
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}