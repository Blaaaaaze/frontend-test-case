import useProducts from './useProducts';
import './ProductsList.css';

export default function ProductList() {
    const {
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
    } = useProducts();

    if (loading) {
        return <div className="loading">Загрузка товаров...</div>;
    }

    return (
        <div className="product-list">
            <div className="filters">
                <div className="search">
                    <input
                        type="text"
                        placeholder="Поиск товаров..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="filter-controls">
                    {showFilters ? (
                        <>
                            <select value={selectedCategory} onChange={handleCategoryChange}>
                                <option value="all">Все категории</option>
                                <option value="phones">Телефоны</option>
                                <option value="laptops">Ноутбуки</option>
                                <option value="tablets">Планшеты</option>
                            </select>

                            <select value={sortBy} onChange={handleSortChange}>
                                <option value="name">По названию</option>
                                <option value="price">По цене</option>
                            </select>
                        </>

                    ) : null}

                    <button onClick={handleToggleFilters}>
                        {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
                    </button>
                </div>
            </div>

            <div className="products">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <div className="price">${product.price}</div>
                        <button
                            onClick={() => handleAddToCart(product)}
                            disabled={showCheckout}
                        >
                            Добавить в корзину
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
