export const selectCart = (state) => state.cart.cart;
export const selectCartCount = (state) => selectCart(state).reduce((total, item) => total + item.quantity, 0);
export const selectTotalPrice = (state) => selectCart(state).reduce((total, item) => total + (item.price * item.quantity), 0);