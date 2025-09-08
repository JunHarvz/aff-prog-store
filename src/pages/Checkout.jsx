import { useEffect, useState } from "react";
import api from "../utils/api";

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function Checkout() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("checkoutProduct");
    if (saved) setProduct(JSON.parse(saved));
  }, []);

  const handleCheckout = async () => {
    if (!product) return alert("No product selected");

    const referralCode = getCookie("referralCode");
    
    await api.post("/store/order", {
      product_id: product.id,
      quantity: 1,
      referral_code: referralCode,
    });

    alert("Order placed successfully!");
    localStorage.removeItem("checkoutProduct"); // clear after success
  };

  if (!product) return <p>No product selected.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-2">Checkout</h1>
      <p>Product: {product.name}</p>
      <p>Price: ₱{product.price}</p>
      <button
        onClick={handleCheckout}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Confirm Order
      </button>
    </div>
  );
}

export default Checkout;
