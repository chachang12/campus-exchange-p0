import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import Browsebar from "../components/Browsebar";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <Browsebar />
      <div className="flex flex-col items-left space-y-8">
        <h1 className="text-4xl font-bold bg-clip-text">
          Browse
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-xl text-center font-bold text-darkgray">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;