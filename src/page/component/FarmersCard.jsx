export default function FarmerCard({ store }) {
    return (
      <a className="flex flex-col items-center max-w-xs text-center">
        <img src={store.image} alt={store.name} className="w-24 h-24 rounded-full object-cover mb-4" />
        <h3 className="text-lg font-semibold">{store.name}</h3>
        {/* <p className="text-gray-600">{farmer.distance}</p> */}
      </a>
    );
  }