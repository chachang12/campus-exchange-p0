import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Browsebar from "../components/Browsebar";
import { fetchProducts } from "../utils/fetchUtils";
import { useUser } from "../context/UserContext";
import { Logo } from "../components/icons";
import { CategoriesScrollBar } from "../components/HomePageComponents";
import { Link } from "react-router-dom";
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

  const unreadNotifications = unreadNotificationsFunc(notifications, user); // Should this be in a use effect?
  const navigate = useNavigate();

  const categories = [
    "Clothing",  
    "Shoes",  
    "Textbooks",  
    "Books",  
    "Electronics",  
    "Household",  
    "Notes",  
    "Service",  
    "Furniture",  
    "Accessories",  
    "Cosmetics",  
    "Sports",  
    "Games",  
    "Music",  
    "Automotive",  
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
        setFilteredProducts(products);
        console.log("products", products);
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

  

  return (
    <div className="">
      <div className="">
        <section className="flex flex-col">
          <CategoriesScrollBar
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </section>
      </div>
      <div className="flex flex-col gap-4 px-6 bg-inherit items-center">
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