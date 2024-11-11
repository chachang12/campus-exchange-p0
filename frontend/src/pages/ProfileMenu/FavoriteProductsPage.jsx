import React, { useEffect, useState } from 'react';
import { getFavorites } from '../../utils/fetchUtils';
import ProductCard from '../../components/ProductCard';
import { useUser } from '../../context/UserContext';

const FavoriteProductsPage = () => {
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await getFavorites(user._id);
        setFavorites(response.data || []);
        console.log('Favorites:', response.data); // Add this line to log the fetched favorites
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setError('Failed to fetch favorite products.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  if (loading) {
    return <div className="p-4 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-white">{error}</div>;
  }

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Favorite Products</h1>
      <div className="space-y-4">
        {favorites.length > 0 ? (
          favorites.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No favorite products found.</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteProductsPage;