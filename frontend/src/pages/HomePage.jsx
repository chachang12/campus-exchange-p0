import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Browsebar from "../components/Browsebar";
import { fetchProducts } from "../utils/fetchUtils";
import { useUser } from "../context/UserContext";
import Logo from "../components/icons/Logo";
import { CategoriesScrollBar } from "../components/HomePageComponents";

const HomePage = () => {
  // const { user } = useUser();
  let [products, setProducts] = useState([]);

  products = [
    {
      _id: "1",
      name: "Kith Seoul Hoodie",
      category: "Clothing",
      image: "https://eu.kith.com/cdn/shop/files/KHM032123-001-FRONT.jpg?v=1716536682&width=1920",
      price: 80.00,
      size: "M",
      condition: "New"
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

  const categories = [
    "Clothing",
    "Shoes",
    "Textbooks",
    "Electronics",
    "Household",
  ]

  // Static User Data for development
  const user = {
    firstName: 'Carson',
    lastName: 'Chang',
    email: 'cadchang@gmail.com',
    profilePicture: 'https://avatars.githubusercontent.com/u/136373179?v=4',
    listings: 5,
    rating: 4.5,
  };

  // useEffect(() => {
  //   const loadProducts = async () => {
  //     if (!user) return;
  //     const products = await fetchProducts(user.token);
  //     setProducts(products);
  //   };

  //   loadProducts();
  // }, [user]);

  console.log("products", products);

  return (
    <div className="">
      <div className="flex flex-row justify-between mx-4 py-4">
        <Logo width={50} fill={"white"} />
        <a>
          <img src={user.profilePicture} className="w-[50px] rounded-full" />
        </a>
      </div>
      {/* <Browsebar /> */}
      <CategoriesScrollBar categories={categories} />
      <div className="flex flex-col gap-4 p-4 bg-[#1A1E26]">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
        {products.length === 0 && (
          <p className="text-xl text-center font-bold text-darkgray">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;