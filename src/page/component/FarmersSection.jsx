import { useEffect, useState } from "react";
import FarmerCard from "./FarmersCard";
import axios from "axios";

FarmerCard
export default function  FarmersSection() {

  const [stores, setStores] = useState([])

  useEffect(()=> {

    const getData = async () => {
      try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/user/store?limit=5`
        await axios.get(url)
        .then((response) => {
          console.log(response.data.data)
          setStores(response.data.data)}
        )
        .catch((error) => {
          console.log(error)
          throw new Error(error);
        })

      } catch (error){
        throw new Error('Cannot get product from api', error)
      }
    }

    getData()

  }, [])

    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">មើលទៅតាមហាង</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {stores.map((store, index) => (
              <FarmerCard key={index} store={store} />
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="#" className="inline-block bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-2 px-6 rounded-lg">
              មើលទាំងអស់
            </a>
          </div>
        </div>
      </section>
    );
  }