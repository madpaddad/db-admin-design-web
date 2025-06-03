import { ChevronDown } from 'lucide-react';
import ProductCard from './ProductCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function FeaturedProducts() {

  const [getProducts, setData] = useState ([])
  useEffect(() => {
    
    const getData = async () => {
      try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/user/product`
        const response = await axios.get(url)
        setData(response.data.data)
        console.log(response)
        }catch (error) {
        throw new Error(`Cannot get product from api: ${error.message}`);
}
    }

    getData();
  }, [])

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">ទំនិញផ្សេងៗ</h2>
          <a href="/product" className="text-green-700 hover:text-green-800 font-medium flex items-center">
            មើលទាំងអស់ <ChevronDown size={16} className="ml-1 transform rotate-270" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {getProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}