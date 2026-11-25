import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setProducts } from './products-slice';
import { useEffect, useState } from 'react';
import { selectLoading, selectProducts } from './products-selectors';
import { addToCart } from '../Cart/cart-slice';
import { selectShowCheckout } from '../Cart/cart-selectors';
import { mockProducts } from '../../mock/Products';

export default function useProducts() {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const loading = useSelector(selectLoading);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [showFilters, setShowFilters] = useState(false);

    const showCheckout = useSelector(selectShowCheckout);

    useEffect(() => {
        dispatch(setLoading(true));

        const timeoutId = setTimeout(() => {

            dispatch(setProducts(mockProducts));
            dispatch(setLoading(false));
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [dispatch]);

    const filteredProducts = products
        .filter((product) => {
            const matchesSearch = product.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'price') return a.price - b.price;
            return 0;
        });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleToggleFilters = () => {
        setShowFilters(previous => !previous);
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return {
        loading,
        searchTerm,
        selectedCategory,
        sortBy,
        showFilters,
        showCheckout,
        filteredProducts,
        handleSearchChange,
        handleCategoryChange,
        handleSortChange,
        handleToggleFilters,
        handleAddToCart,
    };
}
