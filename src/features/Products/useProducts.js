import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setProducts } from './products-slice';
import { useEffect, useState } from 'react';
import './ProductsList.css';
import { selectLoading, selectProducts } from './products-selectors';
import { addToCart } from '../Cart/cart-slice';
import { selectShowCheckout } from '../Cart/cart-selectors';

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
            const mockProducts = [
                {
                    id: 1,
                    name: 'iPhone 14',
                    price: 799,
                    category: 'phones',
                    image: 'https://via.placeholder.com/200',
                    description: 'Новейший iPhone',
                },
                {
                    id: 2,
                    name: 'Samsung Galaxy S23',
                    price: 699,
                    category: 'phones',
                    image: 'https://via.placeholder.com/200',
                    description: 'Флагман Samsung',
                },
                {
                    id: 3,
                    name: 'MacBook Pro',
                    price: 1999,
                    category: 'laptops',
                    image: 'https://via.placeholder.com/200',
                    description: 'Мощный ноутбук Apple',
                },
                {
                    id: 4,
                    name: 'Dell XPS 13',
                    price: 1299,
                    category: 'laptops',
                    image: 'https://via.placeholder.com/200',
                    description: 'Премиум ноутбук Dell',
                },
                {
                    id: 5,
                    name: 'iPad Air',
                    price: 599,
                    category: 'tablets',
                    image: 'https://via.placeholder.com/200',
                    description: 'Планшет Apple',
                },
                {
                    id: 6,
                    name: 'Samsung Galaxy Tab',
                    price: 399,
                    category: 'tablets',
                    image: 'https://via.placeholder.com/200',
                    description: 'Планшет Samsung',
                },
            ];
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
