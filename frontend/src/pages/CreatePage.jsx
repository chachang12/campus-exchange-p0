import { useEffect, useState } from "react";
import { createProduct } from "../utils/fetchUtils";
// import { useAuthContext } from "../hooks/useAuthContext.hook";
import { useUser } from "../context/UserContext";
import { useToast } from "@chakra-ui/react";
import CategoriesScrollBar from "../components/CreatePageComponents/CategoriesScrollBar"; // Import the CategoriesScrollBar component

const CreatePage = () => {
  const { user } = useUser();

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    condition: "", // Add condition to the state
    categories: [], // Add categories to the state
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
    setNewProduct({ name: "", price: "", image: "", condition: "", categories: [] });
  };

  const categories = [
    "Clothing",
    "Shoes",
    "Textbooks",
    "Electronics",
    "Household",
  ];

  return (
    <div className="flex flex-col max-w-lg mx-auto p-4 text-white justify-between">
      <div className="justify-start mb-4">
        <div className="flex flex-row mb-4">
          <a className="" href="/home">
            Cancel
          </a>
        </div>
        <div className="space-y-8">
          <div className="w-full">
            <div className="space-y-4">
              <input
                className="w-full p-4 border bg-inherit border-white border-opacity-50 rounded-md"
                placeholder="Title"
                name="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <input
                className="w-full p-4 border bg-inherit border-white border-opacity-50 rounded-md"
                placeholder="Price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
              <input
                className="w-full p-4 border bg-inherit border-white border-opacity-50 rounded-md"
                placeholder="Image URL"
                name="image"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              />
              <select
                className="w-full p-4 border bg-inherit border-white border-opacity-50 rounded-md"
                name="condition"
                value={newProduct.condition}
                onChange={(e) => setNewProduct({ ...newProduct, condition: e.target.value })}
              >
                <option className="text-black" value="" disabled>Select Condition</option>
                <option className="text-black" value="new">New</option>
                <option className="text-black" value="like new">Like New</option>
                <option className="text-black" value="used">Used</option>
                <option className="text-black" value="very used">Very Used</option>
              </select>
              <CategoriesScrollBar
                categories={categories}
                selectedCategories={newProduct.categories}
                setSelectedCategories={(selectedCategories) => setNewProduct({ ...newProduct, categories: selectedCategories })}
              />
              <button
                className="w-full p-2 bg-darkblue text-white rounded"
                onClick={handleAddProduct}
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="opacity-50 text-center">
        Please note that by publishing this listing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default CreatePage;