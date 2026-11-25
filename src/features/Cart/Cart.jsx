import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Cart.css';
import { selectCart, selectCartCount, selectShowCheckout, selectTotalPrice } from './cart-selectors';
import { clearCart, removeFromCart, updateChekout, updateQuantity } from './cart-slice';

export default function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const cartCount = useSelector(selectCartCount);
    const totalPrice = useSelector(selectTotalPrice);
    const showCheckout = useSelector(selectShowCheckout);
  
    const [isOpen, setIsOpen] = useState(false);

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleUpdateQuantity = (id, quantity) => {
        dispatch(updateQuantity({ id, quantity }));
    };

    const handleCheckout = () => {
        dispatch(updateChekout());

        setTimeout(() => {
            alert('Заказ оформлен!');
            dispatch(clearCart());
            setIsOpen(false);
        }, 1000);
    };

    return (
        <div className="cart">
            <button 
                className="cart-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                Корзина ({cartCount})
            </button>

            {isOpen && (
                <div className="cart-dropdown">
                    <div className="cart-header">
                        <h3>Корзина</h3>
                        <button onClick={() => setIsOpen(false)}>×</button>
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