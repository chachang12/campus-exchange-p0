import React, { useEffect, useState } from 'react';
import { getFavorites } from '../../utils/fetchUtils';
import ProductCard from '../../components/ProductCard';
import { useUser } from '../../context/UserContext';
import BackButton from '../../components/Buttons/BackButton';
import { Link } from 'react-router-dom';

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
      <div className='flex justify-between items-center mb-4'>
        <BackButton />
        <h1 className="text-white text-xl font-semibold">Favorite Products</h1>
        <div className='w-10 h-10'></div>
      </div>
      
      <div className="space-y-4">
        {favorites.length > 0 ? (
          favorites.map(product => (
            <Link to={`/product/${product._id}`} state={{ product }} key={product._id}>
              <ProductCard product={product} />
            </Link>
          ))
        ) : (
          <p>No favorite products found.</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteProductsPage;