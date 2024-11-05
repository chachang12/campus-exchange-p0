import { useEffect, useState } from "react";
import { createProduct } from "../utils/fetchUtils";
import { useUser } from "../context/UserContext";
import CategoriesScrollBar from "../components/CreatePageComponents/CategoriesScrollBar"; // Import the CategoriesScrollBar component

const CreatePage = () => {
  const { user } = useUser();

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    condition: "", // Add condition to the state
    categories: [], // Add categories to the state
    creatorId: "", // Add creator to the state
    description: "" // Add description to the state
  });

  const handleAddProduct = async () => {
    if (!user) {
      alert("Please login to post a new listing.");
      return;
    }

    // Set the creator field to the user's ID
    const productWithCreator = { ...newProduct, creatorId: user._id };
    console.log("Product with creator: ", productWithCreator);

    const response = await createProduct(productWithCreator);

    console.log("Response: ", response);
    
    if (!response.success) {
      alert(`Error: ${response.message}`);
    } else {
      alert(`Success: ${response.message}`);
    }
    setNewProduct({ name: "", price: "", image: "", condition: "", categories: [], creatorId: "", description: "" });
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
              <textarea
                className="w-full p-4 border bg-inherit border-white border-opacity-50 rounded-md"
                placeholder="Description"
                name="description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
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
      <p className="opacity-50 text-center font-light">
        Please note that by publishing this listing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default CreatePage;