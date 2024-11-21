import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Browsebar from "../components/Browsebar";
import { fetchProducts } from "../utils/fetchUtils";
import { useUser } from "../context/UserContext";
import { Logo } from "../components/icons";
import { CategoriesScrollBar } from "../components/HomePageComponents";
import { Link } from "react-router-dom";
import './HomePage.css'
import { useNavigate } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
import { ChatContext } from "../context/ChatContext";
import { unreadNotificationsFunc } from "../utils/unreadNotifications";


const HomePage = () => {
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { notifications } = useContext(ChatContext)
  const unreadNotifications = unreadNotificationsFunc(notifications);
  const navigate = useNavigate();

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
        setFilteredProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.categories.some(category => selectedCategories.includes(category))
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategories, products]);

  console.log("products", products);

  return (
    <div className="">
      <div className="fixed top-0 left-0 right-0 z-10 backdrop-blur-md bg-opacity-50 bg-inherit pt-4">
        <section className="flex flex-col border-b border-gray-500">
          <div className="flex justify-between mx-4">
            <div className="flex items-center justify-center">
              <img crossOrigin="anonymous" src={user.profilePicture} className="w-[54px] h-[54px] object-cover object-center rounded-full mr-2" />
              <div>
                <h1 className="text-white font-medium text-[20px]">
                  Welcome, {user.firstName}
                </h1>
                {/* <h2 className="text-gray-500 text-[14px]">
                  Picks for you
                </h2> */}
                <h2 className="text-gray-500 text-[14px]">
                  {user.university}
                </h2>
              </div>
            </div>
            <div onClick={() => navigate('/notifications')} className="p-4 bg-[#1F1F1F] rounded-full w-[54px] flex items-center justify-center border border-gray-500">
            <IoNotifications color='#ffffff' size={20}></IoNotifications>
            {unreadNotifications.length > 0 ? <div className="absolute top-4 right-4 w-5 rounded-full bg-blue-500 text-sm text-white text-center">{unreadNotifications.length}</div> : (null)}
            </div>
          </div>
          <CategoriesScrollBar
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </section>
      </div>
      
      <div className="flex flex-col gap-4 p-4 bg-inherit mt-[125px] items-center">
        {filteredProducts.map((product) => (
          <Link to={`/product/${product._id}`} state={{ product }} key={product._id}>
            <ProductCard product={product} />
          </Link>
        ))}
        {filteredProducts.length === 0 && (
          <p className="text-xl text-center font-bold text-darkgray mt-4">No products found.</p>
        )}
        <span className="flex flex-col items-center">
          <h1 className="text-gray-500 font-light mb-2">
            You've reached the end of the page.
          </h1>
          <div className='mb-[100px]'>
            <Logo fill={'white'} width={40} height={40} />
          </div>

        </span>
      </div>
    </div>
  );
};

export default HomePage;