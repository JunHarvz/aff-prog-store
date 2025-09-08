import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import api from "../utils/api";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [searchParams] = useSearchParams();

  // Get referral code from URL
  const referralCode = searchParams.get("ref");

  useEffect(() => {
    if (referralCode) {
      // store in cookie for later
      document.cookie = `referralCode=${referralCode}; path=/; max-age=${
        30 * 24 * 60 * 60
      }`;
    }

    api.get(`/store/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  const handleBuyNow = () => {
    localStorage.setItem("checkoutProduct", JSON.stringify(product));
    navigate("/checkout", { state: { product } });
  };

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center py-10">
      <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl">
        {/* Product Image */}
        <figure className="lg:w-1/2 p-6">
          <img
            src={product.image_url}
            alt={product.name}
            className="rounded-xl object-cover w-full h-[400px]"
          />
        </figure>

        {/* Product Info */}
        <div className="card-body lg:w-1/2">
          <h1 className="card-title text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-2xl font-semibold text-primary">
            ₱{product.price}
          </p>

          <div className="card-actions justify-end mt-4">
            <button
              onClick={handleBuyNow}
              className="btn btn-primary btn-lg"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
