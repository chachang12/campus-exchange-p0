import { useEffect, useState } from "react";
import { createProduct, uploadImage } from "../utils/fetchUtils";
import { useUser } from "../context/UserContext";
import CategoriesScrollBar from "../components/CreatePageComponents/CategoriesScrollBar"; // Import the CategoriesScrollBar component
import { IoMdPhotos } from "react-icons/io";


const CreatePage = () => {
  const { user } = useUser();

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    condition: "", 
    categories: [],
    creatorId: "",
    description: "" 
  });

  const [imageFile, setImageFile] = useState(null);

  const handleAddProduct = async () => {
    if (!user) {
      alert("Please login to post a new listing.");
      return;
    }

    let imageUrl = "";
    if (imageFile) {
      const uploadResponse = await uploadImage(imageFile);
      if (!uploadResponse.success) {
        alert(`Error uploading image: ${uploadResponse.message}`);
        return;
      }
      imageUrl = uploadResponse.imageUrl;
    }

    // Set the creator field to the user's ID and include the university ID
    const productWithCreator = { ...newProduct, creatorId: user._id, universityId: user.universityId, image: imageUrl };
    console.log("Product with creator: ", productWithCreator);

    const response = await createProduct(productWithCreator);

    console.log("Response: ", response);
    
    if (!response.success) {
      alert(`Error: ${response.message}`);
    } else {
      alert(`Success: ${response.message}`);
    }
    setNewProduct({ name: "", price: "", image: "", condition: "", categories: [], creatorId: "", description: "" });
    setImageFile(null);
  };

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

  return (
    <div className="flex flex-col max-w-lg mx-auto p-4 text-white justify-between">
      <div className="flex flex-row mb-4 justify-between items-center">
        <a className="" href="/home">
          Cancel
        </a>
        <h1 className="text-xl font-semibold mx-auto">
          Listing Details
        </h1>
        <div className="w-[60px]"></div>
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
            <div className="w-full p-4 border bg-inherit border-white border-opacity-50 rounded-md">
              <input
                id="fileInput"
                className=""
                placeholder="Image URL"
                name="image"
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                style={{ display: 'none' }} 
              />
              <label htmlFor="fileInput" className="flex items-center cursor-pointer">
                <IoMdPhotos size={24} />
                <span className="ml-2">Choose File</span>
              </label>
            </div>
            
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
      <p className="opacity-50 text-center font-light">
        Please note that by publishing this listing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default CreatePage;