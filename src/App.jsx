import { Provider } from 'react-redux';
import { store } from './store/store';
import ProductList from './features/Products/ProductsList';
import Header from './components/Header/Header';
import Cart from './features/Cart/Cart';
import './App.css';

function App() {
    return (
        <Provider store={store}>
            <div className="app">
                <Header />
                <div className="main-content">
                    <ProductList />
                    <Cart />
                </div>
            </div>
        </Provider>
    );
}

export default App;
