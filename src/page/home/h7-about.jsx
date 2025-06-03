import React from 'react';
import { Leaf, Heart, Users, Award, Truck, Clock } from 'lucide-react';
import Header from '../component/header';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <Header />
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Fresh From Farm to Your Table
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              We're passionate about connecting our community with the freshest, 
              locally-grown produce while supporting sustainable farming practices.
            </p>
            <div className="flex justify-center">
              <Leaf className="w-16 h-16 text-green-200 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Founded in 2024 by a group of passionate food lovers and sustainability advocates,
                Phsar Farm was born out of a desire to make fresh, local produce accessible to everyone.
                We believe that food should not only nourish our bodies but also support our local
                communities and protect our environment.
              </p>
              <p>
                We started with just five local farms and a small delivery van. Today, 
                we partner with over 50 sustainable farms across the region, delivering 
                the freshest fruits, vegetables, and artisanal products directly to 
                thousands of families.
              </p>
              <p>
                Every order supports local agriculture, reduces food miles, and brings 
                you closer to the source of your food. We believe that when you know 
                where your food comes from, every meal becomes more meaningful.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-green-600">50+</div>
                    <div className="text-sm text-gray-600">Partner Farms</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">10k+</div>
                    <div className="text-sm text-gray-600">Happy Customers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">5</div>
                    <div className="text-sm text-gray-600">Years Strong</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">100%</div>
                    <div className="text-sm text-gray-600">Local & Fresh</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do, from farm partnerships to doorstep delivery.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-12 h-12 text-red-500" />,
                title: "Community First",
                description: "We prioritize supporting local farmers and building stronger community connections through fresh, local food."
              },
              {
                icon: <Leaf className="w-12 h-12 text-green-500" />,
                title: "Sustainability",
                description: "Every partnership and practice is evaluated through the lens of environmental responsibility and long-term sustainability."
              },
              {
                icon: <Award className="w-12 h-12 text-yellow-500" />,
                title: "Quality Commitment",
                description: "We maintain the highest standards for freshness, taste, and nutritional value in every product we deliver."
              },
              {
                icon: <Users className="w-12 h-12 text-blue-500" />,
                title: "Transparency",
                description: "Know your farmer, know your food. We provide complete transparency about where and how your produce is grown."
              },
              {
                icon: <Truck className="w-12 h-12 text-purple-500" />,
                title: "Reliable Service",
                description: "Consistent, on-time delivery with careful handling to ensure your produce arrives in perfect condition."
              },
              {
                icon: <Clock className="w-12 h-12 text-orange-500" />,
                title: "Freshness Guarantee",
                description: "From harvest to your home in under 24 hours. That's our promise for maximum freshness and flavor."
              }
            ].map((value, index) => (
              <div key={index} className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind your fresh produce experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Pich Daraphal",
                role: "Founder & CEO",
                description: "Former agricultural scientist with 15 years of experience in sustainable farming practices."
              },
              {
                name: "Siv Lyheng",
                role: "Chief Operations Officer",
                description: "Expert in logistics and supply chain management, ensuring our produce reaches you fresh and on time."
              },
              {
                name: "Rith Seavlav",
                role: "Chief Financial Officer",
                description: "Financial strategist with a decade of experience in agribusiness, ensuring our operations are sustainable and profitable."
              },
              {
                name: "Phoeurn Kimhor",
                role: "Chief Technology Officer",
                description: "With over 10 years in tech, he leads our platform development and customer experience innovations."
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-105 transition-transform duration-300">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-green-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Taste the Difference?</h2>
          <p className="text-xl mb-8 leading-relaxed">
            Join thousands of families who've made the switch to fresh, local, sustainable produce. 
            Your taste buds and your community will thank you.
          </p>
          <Link to="/" className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
            Start Shopping Today
          </Link>
        </div>
      </div>
    </div>
  );
}