import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Browsebar from "../components/Browsebar";
import { fetchProducts } from "../utils/fetchUtils";
import { useUser } from "../context/UserContext";
import Logo from "../components/icons/logo";
import { CategoriesScrollBar } from "../components/HomePageComponents";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { user } = useUser();
  const [products, setProducts] = useState([]);

  const categories = [
    "Clothing",
    "Shoes",
    "Textbooks",
    "Electronics",
    "Household",
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
  }, []);

  console.log("products", products);

  return (
    <div className="">
      <div className="flex flex-row justify-between mx-4 py-4">
        <Logo width={50} fill={"white"} />
        <a>
          <img crossOrigin="anonymous" src={user.profilePicture} className="w-[50px] rounded-full" />
        </a>
      </div>
      <CategoriesScrollBar categories={categories} />
      <div className="flex flex-col gap-4 p-4 bg-[#1A1E26]">
        {products.map((product) => (
          <Link to={`/product/${product._id}`} state={{ product }} key={product._id}>
            <ProductCard product={product} />
          </Link>
        ))}
        {products.length === 0 && (
          <p className="text-xl text-center font-bold text-darkgray">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;