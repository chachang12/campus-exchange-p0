import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Browsebar from "../components/Browsebar";
import { fetchProducts } from "../utils/fetchUtils";
import { useUser } from "../context/UserContext";
import Logo from "../components/icons/Logo";
import { CategoriesScrollBar } from "../components/HomePageComponents";
import { Link } from "react-router-dom";

const HomePage = () => {
<<<<<<< HEAD
  const { user } = useUser();
  const [products, setProducts] = useState([]);
=======
  // const { user } = useUser();
  let [products, setProducts] = useState([]);

  products = [
    {
      _id: "1",
      name: "Kith Poop Hoodie",
      category: "Clothing",
      image: "https://eu.kith.com/cdn/shop/files/KHM032123-001-FRONT.jpg?v=1716536682&width=1920",
      price: 80.00,
      size: "M",
      condition: "New",
      description: "Kith Seoul Hoodie in Black. Made from 100% cotton, this hoodie features a kangaroo pocket, a drawstring hood, and a Kith logo on the chest. The hoodie is in new condition and has never been worn. Size M.",
      creatorId: "1"
    },
    {
      _id: "2",
      name: "Kith Seoul Hoodie",
      category: "Clothing",
      image: "https://eu.kith.com/cdn/shop/files/KHM032123-001-FRONT.jpg?v=1716536682&width=1920",
      price: 80.00,
      size: "M",
      condition: "New"
    },
    {
      _id: "3",
      name: "Kith Seoul Hoodie",
      category: "Clothing",
      image: "https://eu.kith.com/cdn/shop/files/KHM032123-001-FRONT.jpg?v=1716536682&width=1920",
      price: 80.00,
      size: "M",
      condition: "New",
    },
    {
      _id: "4",
      name: "Kith Seoul Hoodie",
      category: "Clothing",
      image: "https://eu.kith.com/cdn/shop/files/KHM032123-001-FRONT.jpg?v=1716536682&width=1920",
      price: 80.00,
      size: "M",
      condition: "New",
    },
    {
      _id: "5",
      name: "Kith Seoul Hoodie",
      category: "Clothing",
      image: "https://eu.kith.com/cdn/shop/files/KHM032123-001-FRONT.jpg?v=1716536682&width=1920",
      price: 80.00,
      size: "M",
      condition: "New",
    },
    {
      _id: "6",
      name: "Kith Seoul Hoodie",
      category: "Clothing",
      image: "https://eu.kith.com/cdn/shop/files/KHM032123-001-FRONT.jpg?v=1716536682&width=1920",
      price: 80.00,
      size: "M",
      condition: "New",
    },
    {
      _id: "7",
      name: "Kith Seoul Hoodie",
      category: "Clothing",
      image: "https://eu.kith.com/cdn/shop/files/KHM032123-001-FRONT.jpg?v=1716536682&width=1920",
      price: 80.00,
      size: "M",
      condition: "New",
    },
    {
      _id: "8",
      name: "Kith Seoul Hoodie",
      category: "Clothing",
      image: "https://eu.kith.com/cdn/shop/files/KHM032123-001-FRONT.jpg?v=1716536682&width=1920",
      price: 80.00,
      size: "M",
      condition: "New",
    }
  ]
>>>>>>> merging

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