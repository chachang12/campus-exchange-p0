import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { FaEdit, FaTrash, FaHeart, FaRegHeart } from "react-icons/fa";
import { useUser } from "../context/UserContext";
import { deleteProduct, updateProduct } from "../utils/fetchUtils";
import { deleteIcon, edit } from "../assets";
import EditListingPopup from "../components/EditListingPopup";

const ProductCard = ({ product, showButtons, onMarkAsSold }) => {
  const { user } = useUser();
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isFavorite, setIsFavorite] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const handleDeleteProduct = async (pid) => {
    if (!user) {
      alert("Please login to delete a product.");
      return;
    }
    const { success, message } = await deleteProduct(pid);
    alert(success ? `Success: ${message}` : `Error: ${message}`);
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    if (!user) {
      alert("Please login to update a product.");
      return;
    }
    const { success, message } = await updateProduct(pid, updatedProduct);
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

  const handleEditProduct = () => {
    setIsEditPopupOpen(true);
  };

  const handleUpdateProductInList = (updatedProduct) => {
    setUpdatedProduct(updatedProduct);
  };

  return (
    <div className="shadow-lg rounded-md overflow-hidden text-white">
        <img src={product.image} alt={product.name} className="aspect-square object-cover rounded-lg"/>
        <p className="truncate">{product.name}</p>
        <p>${product.price}</p>

      <EditListingPopup
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        product={updatedProduct}
        onUpdate={handleUpdateProductInList}
      />
    </div>
  );
};

export default ProductCard;