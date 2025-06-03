import { X, Search, ShoppingCart, User } from 'lucide-react';

export default function MobileMenu({ setMobileMenuOpen }) {
  return (
    <div className="fixed inset-0 z-50 bg-green-700 text-white p-4 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <span className="text-2xl font-bold">LocalHarvest</span>
        <button onClick={() => setMobileMenuOpen(false)}>
          <X size={24} />
        </button>
      </div>
      <div className="flex items-center bg-green-800 rounded-full px-3 py-2 mb-6">
        <input className="bg-transparent outline-none placeholder-green-200 text-sm w-full" placeholder="Search products..." />
        <Search size={18} className="text-green-200" />
      </div>
      <nav className="flex flex-col space-y-4 text-lg">
        <a href="#" className="py-2 border-b border-green-600">Home</a>
        <a href="#" className="py-2 border-b border-green-600">Shop</a>
        <a href="#" className="py-2 border-b border-green-600">Farmers</a>
        <a href="#" className="py-2 border-b border-green-600">About</a>
        <a href="#" className="py-2">Contact</a>
      </nav>
      <div className="mt-auto flex space-x-4">
        <a href="#" className="flex items-center">
          <ShoppingCart size={20} className="mr-2" /> Cart
        </a>
        <a href="#" className="flex items-center">
          <User size={20} className="mr-2" /> Account
        </a>
      </div>
    </div>
  );
}
