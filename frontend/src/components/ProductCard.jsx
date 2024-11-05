import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { FaEdit, FaTrash, FaHeart, FaRegHeart } from "react-icons/fa";
import { useUser } from "../context/UserContext";
import { deleteProduct, updateProduct } from "../utils/fetchUtils";
import { deleteIcon, edit } from "../assets";

const ProductCard = ({ product, showButtons, onMarkAsSold }) => {
  const { user } = useUser();
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isFavorite, setIsFavorite] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteProduct = async (pid) => {
    if (!user) {
      alert("Please login to delete a product.");
      return;
    }
    const { success, message } = await deleteProduct(user.token, pid);
    alert(success ? `Success: ${message}` : `Error: ${message}`);
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    if (!user) {
      alert("Please login to update a product.");
      return;
    }
    const { success, message } = await updateProduct(user.token, pid, updatedProduct);
    onClose();
    alert(success ? `Success: ${message}` : `Error: ${message}`);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Add logic to add/remove product from user's favorites
  };

  return (
    <div className="flex flex-row shadow-lg rounded-xl overflow-hidden text-white w-full bg-[#1F1F1F]">
      <img crossOrigin="anonymous" src={product.image} alt={product.name} className="w-[150px] h-[150px] object-cover" />
      <section className="flex w-[200px]">
        <div className="flex flex-col pl-3 items-start justify-start pt-2 flex-grow">
          <p className="text-xl font-light">
            {product.name}
          </p>
          <p className="text-lg text-white font-[800]">
            ${product.price}
          </p>
          <p>
            {product.size}
          </p>
          <p className="text-gray-500">
            {capitalizeFirstLetter(product.condition)}
          </p>
          {showButtons && (
            <div className="flex space-x-2 mt-2">
              <button onClick={onOpen} className="text-blue-500">
                <img src={edit} className="w-4"/>
              </button>
              <button onClick={() => handleDeleteProduct(product._id)} className="text-red-500">
                <img src={deleteIcon} className="w-4"/>
              </button>
              <button onClick={() => onMarkAsSold(product._id)} className="text-green-500">
                Mark as Sold
              </button>
            </div>
          )}
        </div>
      </section>
      
      
    </div>
  );
};

export default ProductCard;