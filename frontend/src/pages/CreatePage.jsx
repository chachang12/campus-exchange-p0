import { useEffect, useState } from "react";
import { createProduct } from "../utils/fetchUtils";
import { useAuthContext } from "../hooks/useAuthContext.hook";
import { useToast } from "@chakra-ui/react";

const CreatePage = () => {
  const { user } = useAuthContext();

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const toast = useToast();


  const handleAddProduct = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please login to post a new listing.",
        status: "error",
        isClosable: true,
      });
      return;
    }

    const { success, message } = await createProduct(user.token, newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="space-y-8">
        <h1 className="text-4xl text-center mb-8 text-darkgray">Post a new listing</h1>

        <div className="w-full bg-lightgray p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            <input
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <input
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />

            <button
              className="w-full p-2 bg-darkblue text-white rounded"
              onClick={handleAddProduct}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;