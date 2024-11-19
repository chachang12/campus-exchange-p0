import axios from 'axios';

// Set the base URL for Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true, // Ensure cookies are sent with requests
});

export const fetchProducts = async () => {
  try {
    const res = await axiosInstance.get('/api/products');
    return res.data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (newProduct) => {
  // Validation of fields for creating a new product
  if (!newProduct.name || !newProduct.image || !newProduct.price || !newProduct.condition) {
    return { success: false, message: 'Please fill in all fields.' };
  }

  // Validation of categories for creating a new product
  if (newProduct.categories.length === 0) {
    return { success: false, message: 'Please select at least one category.' };
  }

  try {
    const res = await axiosInstance.post('/api/products', newProduct, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, message: 'Error creating product.' };
  }
};

export const deleteProduct = async (pid) => {
  try {
    const res = await axiosInstance.delete(`/api/products/${pid}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const updateProduct = async (pid, updatedProduct) => {
  try {
    const res = await axiosInstance.put(`/api/products/${pid}`, updatedProduct, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const getProductsByCreatorId = async (creatorId) => {
  try {
    const res = await axiosInstance.get(`/api/products/creator/${creatorId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const res = await axiosInstance.get(`/user/${userId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const res = await axiosInstance.get(`/api/products/${productId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const updateUserUniversity = async (userId, universityId) => {
  try {
    const res = await axiosInstance.put(`/user/${userId}/university`, { universityId });
    return res.data;
  } catch (error) {
    console.error('Error updating university:', error);
    throw error;
  }
};

export const fetchUniversities = async () => {
  try {
    const res = await axiosInstance.get('/api/universities');
    return res.data.data;
  } catch (error) {
    console.error('Error fetching universities:', error);
    throw error;
  }
};

export const createReview = async (reviewData) => {
  try {
    const res = await axiosInstance.post('/api/reviews', reviewData);
    return res.data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

export const getReviewsByUser = async (userId) => {
  try {
    const res = await axiosInstance.get(`/api/reviews/user/${userId}`);
    return res.data.data;
  } catch (error) {
    console.error('Error fetching reviews by user:', error);
    throw error;
  }
};

export const getReviewsByProduct = async (productId) => {
  try {
    const res = await axiosInstance.get(`/api/reviews/product/${productId}`);
    return res.data.data;
  } catch (error) {
    console.error('Error fetching reviews by product:', error);
    throw error;
  }
};

// Axios requests for Favorites
export const addFavorite = async (userId, productId) => {
  try {
    const res = await axiosInstance.post('/user/favorites/add', { userId, productId });
    return res.data;
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
};

export const removeFavorite = async (userId, productId) => {
  try {
    const res = await axiosInstance.post('/user/favorites/remove', { userId, productId });
    return res.data;
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
};

export const getFavorites = async (userId) => {
  try {
    const res = await axiosInstance.get(`/user/${userId}/favorites`);
    return res.data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const res = await axiosInstance.post('/api/s3/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const uploadProfilePicture = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const res = await axiosInstance.post('/api/s3/upload-profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
};

export const updateUser = async (updatedUser) => {
  try {
    const res = await axiosInstance.put(`/user/${updatedUser._id}`, updatedUser, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};