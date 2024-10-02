export const fetchProducts = async (token) => {
    const res = await fetch('/api/products', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data.data;
  };
  
  export const createProduct = async (token, newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: 'Please fill in all fields.' };
    }
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    return { success: true, message: 'Product created successfully', data: data.data };
  };
  
  export const deleteProduct = async (token, pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  };
  
  export const updateProduct = async (token, pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    return data;
  };