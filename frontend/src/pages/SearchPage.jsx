import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/fetchUtils';
import ProductCard from '../components/ProductCard';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const { user } = useUser();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length > 0) {
        setIsLoading(true);
        try {
          const products = await fetchProducts();
          const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
          );
          setResults(filteredProducts);
        } catch (error) {
          console.error('Error fetching products:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="p-4 text-white">
      <h1 className='text-center mb-4 text-xl font-semibold'>
        Search
      </h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 rounded-md bg-inherit border border-white border-opacity-50"
        />
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {results.length > 0 ? (
            results.map((product) => (
              <Link to={`/product/${product._id}`} state={{ product }} key={product._id}>
                <ProductCard product={product} />
              </Link>
            ))
          ) : (
            <p className="text-xl text-center font-bold text-darkgray mt-4">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;