import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import CategoryCard from "./category";

export default function CategorySection() {

  const [categories , setCategories] = useState([{
    id: "",
    name: "",
  }]);

  useEffect(() => {
    
    const fetchCategories = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/category`)
              .then((response) => {
                setCategories(response.data.data)}
              )
              .catch((error) => {
                console.log(error)
                throw new Error(error);
              })

      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array means this runs once when the component mounts
  
  
    return (
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">មើលតាមប្រភេទ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard 
                  key = {category.id}
                  category = {category} 
                  onClick={() => navigateProduct()} 
                  />
              ))}
          </div>
        </div>
      </section>
    );
  }