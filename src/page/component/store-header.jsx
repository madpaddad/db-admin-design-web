export default function StoreHeader({store}){
    return (
      <header className="bg-green-600 text-white p-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* <h1 className="text-3xl font-bold">{store.name}</h1> */}
          {/* <p className="mt-2">ទីតាំង: ក្រុង/ខេត្ត{store.location.city} ស្រុក/ខណ្ឌ{store.location.commune} សង្កាត់{store.location.district} ភូមិ{store.location.village}</p> */}
          {/* <p className="mt-1">ទំនាក់ទំនង: {store.contact}</p> */}
        </div>
      </header>
    );
  };
  