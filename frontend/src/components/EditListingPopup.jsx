import React, { useState, useEffect } from 'react';
import { updateProduct, uploadImage } from '../utils/fetchUtils';
import { IoMdPhotos } from 'react-icons/io';

const EditListingPopup = ({ isOpen, onClose, product, onUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    setUpdatedProduct(product);
  }, [product]);

  const handleUpdateProduct = async () => {
    let imageUrl = updatedProduct.image;
    if (imageFile) {
      const uploadResponse = await uploadImage(imageFile);
      if (!uploadResponse.success) {
        alert(`Error uploading image: ${uploadResponse.message}`);
        return;
      }
      imageUrl = uploadResponse.imageUrl;
    }

    const productWithImage = { ...updatedProduct, image: imageUrl };
    const response = await updateProduct(productWithImage._id, productWithImage);

    if (!response.success) {
      alert(`Error: ${response.message}`);
    } else {
      alert(`Success: ${response.message}`);
      onUpdate(productWithImage);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#222222] p-4 rounded-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Edit Listing</h2>
        <div className="space-y-4">
          <input
            className="w-full p-4 border bg-inherit border-white border-opacity-50 rounded-md"
            placeholder="Title"
            name="name"
            value={updatedProduct.name}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
          />
          <input
            className="w-full p-4 border bg-inherit border-white border-opacity-50 rounded-md"
            placeholder="Price"
            name="price"
            type="number"
            value={updatedProduct.price}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
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
            value={updatedProduct.condition}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, condition: e.target.value })}
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
            value={updatedProduct.description}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
          />
          <button
            className="w-full p-2 bg-darkblue text-white rounded"
            onClick={handleUpdateProduct}
          >
            Update
          </button>
          <button
            className="w-full p-2 bg-red-500 text-white rounded mt-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditListingPopup;