import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useUser } from "../context/UserContext";

import { deleteProduct, updateProduct } from "../utils/fetchUtils";

const ProductCard = ({ product }) => {
  const { user } = useUser();

  const [updatedProduct, setUpdatedProduct] = useState(product);

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

  return (
    <div className="flex flex-row shadow-lg rounded-xl overflow-hidden text-white w-full bg-white bg-opacity-5">
      <img crossOrigin="anonymous" src={product.image} alt={product.name} className="w-[150px] h-[150px] object-cover" />
      <div className="flex flex-col pl-3 items-start justify-start pt-2">
        <p className="text-xl font-medium">{product.name}</p>
        <p className="font-medium text-lg text-white">${product.price}</p>
        <p>{product.size}</p>
        <p>{product.condition}</p>
      </div>
    </div>
  );
};

export default ProductCard;