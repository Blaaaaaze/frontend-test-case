import useCart from './useCart';
import './Cart.css';

export default function Cart() {
    const {
        cart,
        cartCount,
        totalPrice,
        showCheckout,
        isOpen,
        handleRemoveItem,
        handleUpdateQuantity,
        handleCheckout,
        handleToggleCart,
        handleCloseCart,
    } = useCart();

    return (
        <div className="cart">
            <button 
                className="cart-toggle"
                onClick={handleToggleCart}
            >
                Корзина ({cartCount})
            </button>

            {isOpen && (
                <div className="cart-dropdown">
                    <div className="cart-header">
                        <h3>Корзина</h3>
                        <button onClick={handleCloseCart}>×</button>
                    </div>

                    <div className="cart-items">
                        {cart.length === 0 ? (
                            <p>Корзина пуста</p>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.name} />
                                    <div className="item-details">
                                        <h4>{item.name}</h4>
                                        <p>${item.price}</p>
                                        <div className="quantity-controls">
                                            <button 
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                disabled={showCheckout}
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button 
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                disabled={showCheckout}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button 
                                        className="remove-btn"
                                        onClick={() => handleRemoveItem(item.id)}
                                        disabled={showCheckout}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="cart-footer">
                        <div className="total">Итого: ${totalPrice}</div>
                        <button 
                            className="checkout-btn"
                            onClick={handleCheckout}
                            disabled={cart.length === 0 || showCheckout}
                        >
                            {showCheckout ? 'Оформляем...' : 'Оформить заказ'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
