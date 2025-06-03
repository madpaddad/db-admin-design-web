import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Search } from "lucide-react";
import { Filter } from "lucide-react";
import { ChevronDown } from "lucide-react";

import Header from "../component/header";
import ProductCard from "../component/ProductCard";
import StoreHeader from "../component/store-header";
import axios from "axios";
import Pagination from "../../utils/pagination";

const StoreDetail = ({ store }) => {

    //variables
    const [data, setData] = useState()
    const [getproducts, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages]   = useState()


    //Params
    const store_id = useParams()
    const id = store_id.store_id
    
    //category_id
    const [selectedCategory, setSelectedCategory] = useState('');
    const handleSelectedCategory= (category_id) => {
        setSelectedCategory(category_id)
    }


    useEffect(() => {
        const getData = async () => {
            try {
                const url = `${import.meta.env.VITE_API_BASE_URL}/user/store/product?store=${id}&category=${selectedCategory}&page=${page}`;
                console.log(url);
                
                const response = await axios.get(url);
                
                console.log(response)
                
                setData(response.data.data.store);
                setProducts(response.data.data.products);
                setPage(response.data.pagination.page)
                setTotalPages(response.data.pagination.total_page)
    
            } catch (error) {
                console.error('Error details:', error.response ? error.response.data : error.message);
                throw new Error('Cannot get product from API');
            }
        };
    
        getData();
    }, [setProducts, selectedCategory, page]);


    useEffect(() => {
    // ddf
        const fetchCategories = async () => {
          try {
            await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/category`)
                  .then((response) => {
                    setCategories(response.data.data)
                })
                  .catch((error) => {
                    console.log(error)
                    throw new Error(error);
                  })
    
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
    
        fetchCategories();
      }, []);

    const [searchTerm, setSearchTerm] = useState('');

    const sortOptions = ["Featured", "Price: Low to High"];
    
    const [sortBy, setSortBy] = useState("Featured");
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        organic: false,
        seasonal: false,
        priceRange: [0, 20]
    });

    // Filter and sort products
    const filteredProducts = getproducts.filter(product => {
        // Search term filter
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.farm.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Category filter
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        
        // Additional filters
        const matchesOrganic = !filters.organic || product.organic;
        const matchesSeasonal = !filters.seasonal || product.seasonal;
        const matchesPriceRange = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
        
        return matchesSearch && matchesCategory && matchesOrganic && matchesSeasonal && matchesPriceRange;
    });

    // Sort filtered products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
        case "Price: Low to High":
            return a.price - b.price;
        case "Price: High to Low":
            return b.price - a.price;
        case "Name: A-Z":
            return a.name.localeCompare(b.name);
        case "Name: Z-A":
            return b.name.localeCompare(a.name);
        case "Top Rated":
            return b.rating - a.rating;
        default: // Featured - use original order
            return a.id - b.id;
        }
    });

    const addToCart = (productId) => {
        console.log(`Added product ${productId} to cart`);
    };

    const toggleFilter = (filterName) => {
        setFilters({
        ...filters,
        [filterName]: !filters[filterName]
        });
    };

    return (
        <div>
            <Header/>
            <StoreHeader 
                store = {data}
            />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Fresh Local Produce</h1>
                    
                    {/* Search Bar */}
                    <div className="w-full sm:w-auto relative">
                        <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm("")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        )}
                    </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filter Sidebar - Desktop */}
                    <div className="hidden lg:block w-64 rounded-lg shadow-sm p-6 h-fit sticky top-8">
                        <h2 className="font-semibold text-lg text-gray-800 mb-4">ប្រភេទ</h2>
                        <ul className="space-y-2 mb-6">
                        {categories.map(category => (
                            <button
                                onClick={() => handleSelectedCategory(category.id)}
                                className={`block w-full text-left px-2 py-1.5 rounded-md transition ${
                                selectedCategory === category
                                    ? "bg-green-100 text-green-800 font-medium"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                        </ul>

                        {/* <div className="border-t pt-4 mb-4">
                        <h2 className="font-semibold text-lg text-gray-800 mb-4">Filters</h2>
                        
                        <div className="mt-4">
                            <h3 className="text-gray-700 font-medium mb-2">Price Range</h3>
                            <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-500">${filters.priceRange[0]}</span>
                            <span className="text-sm text-gray-500">${filters.priceRange[1]}</span>
                            </div>
                            <input
                            type="range"
                            min="0"
                            max="20"
                            step="1"
                            value={filters.priceRange[1]}
                            onChange={(e) => setFilters({
                                ...filters,
                                priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                            })}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                            />
                        </div>
                        </div> */}

                        {/* <button 
                        onClick={() => setFilters({
                            organic: false,
                            seasonal: false,
                            priceRange: [0, 20]
                        })}
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                        >
                        Reset All Filters
                        </button> */}
                    </div>

                    {/* Mobile Filters Toggle */}
                    <div className="lg:hidden flex justify-between items-center bg-white rounded-lg shadow-sm p-4 mb-4">
                        <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center text-gray-700"
                        >
                        <Filter className="w-5 h-5 mr-2" />
                        Filter & Sort
                        <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showFilters ? "transform rotate-180" : ""}`} />
                        </button>
                        
                        <div className="text-sm text-gray-500">
                        {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                        </div>
                    </div>

                    {/* Mobile Filters Panel */}
                    {showFilters && (
                        <div className="lg:hidden bg-white rounded-lg shadow-sm p-4 mb-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                            <h3 className="font-medium text-gray-700 mb-2">ប្រភេទ</h3>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                            </div>
                            
                            <div>
                            <h3 className="font-medium text-gray-700 mb-2">Sort By</h3>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                {sortOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            </div>
                        </div>
                        
                        <div className="flex space-x-4 mb-4">
                            <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={filters.organic}
                                onChange={() => toggleFilter("organic")}
                                className="rounded text-green-600"
                            />
                            <span className="text-gray-700 text-sm">Organic</span>
                            </label>
                            
                            <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={filters.seasonal}
                                onChange={() => toggleFilter("seasonal")}
                                className="rounded text-green-600"
                            />
                            <span className="text-gray-700 text-sm">Seasonal</span>
                            </label>
                        </div>
                        
                        <div className="mb-4">
                            <h3 className="text-gray-700 text-sm font-medium mb-2">Price: Up to ${filters.priceRange[1]}</h3>
                            <input
                            type="range"
                            min="0"
                            max="20"
                            step="1"
                            value={filters.priceRange[1]}
                            onChange={(e) => setFilters({
                                ...filters,
                                priceRange: [0, parseInt(e.target.value)]
                            })}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                            />
                        </div>
                        
                        <div className="flex justify-between">
                            <button 
                            onClick={() => setFilters({
                                priceRange: [0, 20]
                            })}
                            className="text-green-600 text-sm font-medium"
                            >
                            Reset Filters
                            </button>
                            
                            <button 
                            onClick={() => setShowFilters(false)}
                            className="bg-green-600 text-white px-4 py-1 rounded-md text-sm"
                            >
                            Apply
                            </button>
                        </div>
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Desktop Sort Options */}
                        <div className="hidden lg:flex justify-between items-center bg-white rounded-lg shadow-sm p-4 mb-6">
                        <div className="text-gray-600">
                            Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                        </div>
                        
                        <div className="flex items-center">
                            <span className="text-gray-700 mr-2">Sort by:</span>
                            <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border-none bg-transparent focus:ring-0 text-gray-700 font-medium cursor-pointer pr-8"
                            >
                            {sortOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                            </select>
                        </div>
                        </div>

                        {/* Product Grid */}
                        {getproducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {getproducts.map(product => (
                            <ProductCard key={product.id} product={product} addToCart={addToCart} />
                            ))}
                        </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                            <Search className="w-12 h-12 mx-auto text-gray-400" />
                            <h3 className="text-xl font-medium text-gray-700 mt-4">No products found</h3>
                            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
                        </div>
                        )}
                        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage}/>
                    </div>
                    </div>
                </div>
        </div>
    );
};

export default StoreDetail;