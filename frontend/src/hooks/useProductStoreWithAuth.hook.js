import { useAuthContext } from "./useAuthContext.hook";
import { useProductStore } from "../store/product.js";

export const useProductStoreWithAuth = () => {
  const { user } = useAuthContext();
  const productStore = useProductStore();

  const fetchProducts = () => productStore.fetchProducts(user.token);
  const createProduct = (newProduct) => productStore.createProduct(newProduct, user.token);
  const deleteProduct = (pid) => productStore.deleteProduct(pid, user.token);
  const updateProduct = (pid, updatedProduct) => productStore.updateProduct(pid, updatedProduct, user.token);

  return {
    ...productStore,
    fetchProducts,
    createProduct,
    deleteProduct,
    updateProduct,
  };
};