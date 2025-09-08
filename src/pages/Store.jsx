import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

function Store() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/store/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="p-8 bg-base-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">🛍️ Online Store</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-100">
        {products.map((p) => (
          <div key={p.id} className="card bg-base-100 shadow-xl hover:scale-105 transition-transform">
            <figure>
              <img
                src={p.image_url}
                alt={p.name}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{p.name}</h2>
              <p className="text-gray-600 line-clamp-2">{p.description}</p>
              <p className="text-xl font-bold text-primary">₱{p.price}</p>
              <div className="card-actions justify-end">
                <Link
                  to={`/product/${p.id}`}
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Store;
