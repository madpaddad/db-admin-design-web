export default function HeroSection() {
    return (
      <section className="relative h-96 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-70 bg-gradient-to-r from-green-900 to-green-700"></div>
        <img 
          src="/api/placeholder/1600/900" 
          alt="Fresh local produce" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fresh from Local Farms<br />to Your Table</h1>
          <p className="text-lg md:text-xl mb-6 max-w-lg">Support local farmers and enjoy the freshest seasonal produce, eggs, dairy, and meat delivered to your door.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg text-center">
              Shop Now
            </a>
            <a href="#" className="bg-white hover:bg-gray-100 text-green-700 font-semibold py-3 px-6 rounded-lg text-center">
              Meet Our Farmers
            </a>
          </div>
        </div>
      </section>
    );
  }