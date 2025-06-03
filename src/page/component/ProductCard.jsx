import { ShoppingCart } from 'lucide-react';
import { useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate()

  const addToCart = async (productId) => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      alert('សូមចូលគណនីជាមុនសិន');
      navigate("/login" );
      return;
    }

    try {
      // Decode the token to extract user ID
      const decoded = jwtDecode(token);
      const userId = decoded.user.id; 
      console.log('Decoded userId:', userId);
      const payload = {
        user: userId,
        product: productId,
        quantity: 1,
      };

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/cart/items`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      

      alert('បានបន្ថែមទៅក្នុងកន្ត្រក!'); // Successfully added to cart
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('បរាជ័យក្នុងការបន្ថែមទៅកន្ត្រក'); // Failed to add to cart
    }
  };

  return (
    <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
      <a href={`/product_detail/${product.id}`} className="group rounded-lg overflow-hidden shadow-md relative hover:shadow-xl transition duration-300" >
        <div className="relative">
          <img 
            src={product.picture} 
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.farm}</p>
            </div>
            <div className="text-lg font-semibold text-gray-900">
              ៛{product.price.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center mt-2">
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-600">{product.category}</span>
          </div>
          
          <p className="text-sm text-gray-600 mt-3 line-clamp-2">{product.description}</p>
        </div>
      </a>
      <div className="px-4 pb-4">
        <button
          onClick={() => addToCart(product.id)}
          className="cursor-pointer w-full mt-4 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
            ដាក់ចូលកន្ត្រក
        </button>
      </div>
    </div>
  );
}