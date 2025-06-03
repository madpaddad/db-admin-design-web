import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapPin, Star, Clock, Truck, Filter, Search, Grid, List, Phone, Globe, Heart } from 'lucide-react';
import Header from '../component/header';
import { Link } from "react-router-dom";

const StoresPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('distance');
  const [viewMode, setViewMode] = useState('grid');
  const [limit, setLimit] = useState(9);
  const [favoriteStores, setFavoriteStores] = useState(new Set());

  const [getStores, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/user/store`;
        const response = await axios.get(url);
        setData(response.data.data);
        console.log(response.data.data.length);
      } catch (error) {
        throw new Error(`Cannot get store from api: ${error.message}`);
      }
    }

    getData();
  }, [])
  

  
  if (getStores.length === 0) {
    return <p>Loading stores...</p>;  // Optional loading state
  }
  const filteredStores = getStores;

  const storeImages = [
  "https://i.pinimg.com/736x/9a/41/8a/9a418a58aac13a44929bebb69a54d302.jpg",
  "https://i.pinimg.com/736x/ce/d7/92/ced792a2468f7d3249d6b6bc3bd2e01e.jpg",
  "https://i.pinimg.com/736x/8b/9e/57/8b9e572df5e7936b65cf8b2f973486ea.jpg",
  "https://i.pinimg.com/736x/d8/f3/02/d8f3026960a51007818545fa6e05f978.jpg",
  "https://i.pinimg.com/736x/6b/9d/79/6b9d79857736eb120867094cb3b5d547.jpg",
  "https://i.pinimg.com/736x/d1/b1/b2/d1b1b20802afd1aa05ae4722dfa71690.jpg",
  "https://i.pinimg.com/736x/92/3b/b5/923bb5da197b76cfcba55a10da104e63.jpg",
  "https://i.pinimg.com/736x/34/09/9f/34099fe634a1b61387c5e640e9ef3759.jpg",
  "https://i.pinimg.com/736x/3d/2a/b5/3d2ab570f15852d827c13d619e529fe5.jpg"
];

  

  const StoreCard = ({ store, imageIndex }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {store.featured && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold px-3 py-1 text-center">
          FEATURED STORE
        </div>
      )}
      <div className="relative">
        <img 
          src={storeImages[imageIndex % storeImages.length]}
          alt={store.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
            {store.name}
          </h3>
          <div className="flex items-center space-x-1">
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{store.location.village},{store.location.commune},
              {store.location.district},{store.location.city}
            </span>
          </div>
        </div>
      
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
          </div>
          <Link to={`/stores/${store.id}`}>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">
              View Store
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

 
 //
  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <div style={{ marginTop: '50px' }}>
      <div className="bg-white border-b border-gray-200">
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredStores.length} {filteredStores.length === 1 ? 'farm' : 'farms'} 
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
          </p>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store, index)=> (
              <StoreCard key={store.id} store={store} imageIndex={index} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default StoresPage;