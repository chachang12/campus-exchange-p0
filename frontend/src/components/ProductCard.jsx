import { useState } from "react";
import { useProductStore } from "../store/product";
import { useDisclosure } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAuthContext } from "../hooks/useAuthContext.hook";
import { deleteProduct, updateProduct } from "../utils/fetchUtils";

const ProductCard = ({ product }) => {
  const { user } = useAuthContext();

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
    <div className="shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl bg-white dark:bg-gray-800">
      <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />

      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{product.name}</h3>
        <p className="font-bold text-xl text-gray-600 dark:text-gray-200 mb-4">${product.price}</p>

        <div className="flex space-x-2">
          <button onClick={onOpen} className="p-2 text-blue-500">
            <FaEdit />
          </button>
          <button onClick={() => handleDeleteProduct(product._id)} className="p-2 text-red-500">
            <FaTrash />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold">Update Product</h3>
              <button onClick={onClose} className="text-gray-500">
                <IoMdClose />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <input
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
              <input
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              />
              <input
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              />
            </div>
            <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              >
                Update
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;