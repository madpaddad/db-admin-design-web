export default function CategoryCard({ category }) {
    return (
      <a href={`/product/${category.id}`} className="group rounded-lg overflow-hidden shadow-md relative hover:shadow-xl transition duration-300" >
        <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
        
          <img src={category.pictures} alt={category.name} className="w-full h-64 object-cover group-hover:scale-105 transition duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
        <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">{category.name}</h3>
      </a>
    );
  }
  