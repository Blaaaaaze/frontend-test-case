import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, selectCartCount, selectShowCheckout, selectTotalPrice } from './cart-selectors';
import { clearCart, removeFromCart, setCheckout, updateQuantity } from './cart-slice';

export default function useCart() {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const cartCount = useSelector(selectCartCount);
    const totalPrice = useSelector(selectTotalPrice);
    const showCheckout = useSelector(selectShowCheckout);
  
    const [isOpen, setIsOpen] = useState(false);

    const timeoutRef = useRef(null);

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleUpdateQuantity = (id, quantity) => {
        dispatch(updateQuantity({ id, quantity }));
    };

    const handleCheckout = () => {
        if (timeoutRef.current !== null) {
            return;
        }

        dispatch(setCheckout(true));

        timeoutRef.current = setTimeout(() => {
            timeoutRef.current = null;

            alert('Заказ оформлен!');
            dispatch(clearCart());
            setIsOpen(false);
        }, 1000);
    };

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
            dispatch(setCheckout(false));
        };
    }, [dispatch]);

    const handleToggleCart = () => {
        setIsOpen(previous => !previous);
    };

    const handleCloseCart = () => {
        setIsOpen(false);
    };

    return {
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
    };
}
