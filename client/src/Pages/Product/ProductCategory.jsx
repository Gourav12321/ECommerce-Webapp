import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import CategoryFilter from './CategoryFilter';
import SortingOptions from './SortingOptions';
import ProductList from './ProductList';
import { fetchCategories, fetchProductsByCategory, fetchAllProducts } from './ApiService.js';

function ProductCategory() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const location = useLocation(); // Hook to get the current location
  const searchParams = new URLSearchParams(location.search); // Create a URLSearchParams object from the query string
  const categoryQuery = searchParams.get('category'); // Get the 'category' parameter from the query string

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    if (categoryQuery) {
      setSelectedCategories(categoryQuery.split(','));
    }
  }, [categoryQuery]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let products;
        if (selectedCategories.length > 0) {
          products = await fetchProductsByCategory(selectedCategories.join(','));
        } else {
          products = await fetchAllProducts();
        }
        setSortedProducts(Array.isArray(products) ? products : []);
      } catch (error) {
        console.error('Failed to fetch products', error);
        setSortedProducts([]);
      }
    };

    getProducts();
  }, [selectedCategories]);

  useEffect(() => {
    if (selectedCategories.length === 0 && categoryQuery) {
      searchParams.delete('category');
    } else {
      searchParams.set('category', selectedCategories.join(','));
    }

    // Update the URL without reloading the page
    window.history.replaceState(null, '', `${location.pathname}?${searchParams.toString()}`);
  }, [selectedCategories]);

  const handleCategoryChange = (categoryId) => {
    let updatedCategories;

    if (selectedCategories.includes(categoryId)) {
      updatedCategories = selectedCategories.filter((id) => id !== categoryId);
    } else {
      updatedCategories = [...selectedCategories, categoryId];
    }

    setSelectedCategories(updatedCategories);
    
    if (updatedCategories.length === 0) {
      fetchAllProducts().then(products => {
        setSortedProducts(products);
      });
    }
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const sortedProductsList = useMemo(() => {
    let productsArray = Array.isArray(sortedProducts) ? [...sortedProducts] : [];

    switch (sortOption) {
      case 'priceLowToHigh':
        productsArray.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'priceHighToLow':
        productsArray.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'nameAToZ':
        productsArray.sort((a, b) => {
          const nameA = a.title || '';
          const nameB = b.title || '';
          return nameA.localeCompare(nameB);
        });
        break;
      case 'nameZToA':
        productsArray.sort((a, b) => {
          const nameA = a.title || '';
          const nameB = b.title || '';
          return nameB.localeCompare(nameA);
        });
        break;
      case 'ratingHighToLow':
        productsArray.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'ratingLowToHigh':
        productsArray.sort((a, b) => (a.rating || 0) - (b.rating || 0));
        break;
      default:
        break;
    }

    return productsArray;
  }, [sortedProducts, sortOption]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row gap-4 md:p-4 md:pt-[5rem] lg:pt-4 pt-[5rem] pl-0 lg:h-[100vw] ">
      <aside
        className={`md:w-1/4  fixed md:m-4 lg:pt-16 md:pt-[10rem] top-0  left-0 h-full bg-white shadow-md p-4 rounded-lg transform ${
          isFilterOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } transition-transform duration-300 ease-in-out z-50 md:z-0`}
      >
        <button
          className="md:hidden block absolute top-4 right-4 bg-red-500 w-8 h-8 text-white rounded-full"
          onClick={toggleFilter}
        >
          X
        </button>
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
        />
      </aside>
      <main className="w-full px-4 md:w-3/4 ml-auto">
        <div className="flex justify-between items-center">
          <button
            className="md:hidden block font-semibold text-start top-0 bg-slate-300 p-2 mr-10 w-1/3 rounded-xl"
            onClick={toggleFilter}
          >
            Filter By Category
          </button>
          <SortingOptions handleSortChange={handleSortChange} className="w-1/2" />
        </div>
        <p className=' font-bold py-3'>Total Result : {sortedProductsList.length}</p>
        <ProductList products={sortedProductsList} /> {/* Use sortedProductsList here */}
      </main>
    </div>
  );
}

export default ProductCategory;
