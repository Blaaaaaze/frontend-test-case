import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../features/User/user-slice';
import './Header.css';
import { selectUser } from '../../features/User/user-selectors';

export default function Header() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch(
                setUser({
                    id: 1,
                    name: 'Иван Иванов',
                    email: 'ivan@example.com',
                }),
            );
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [dispatch]);

    return (
        <header className="header">
            <h1>🛒 Интернет-магазин</h1>
            <div className="user-info">
                {user ? <span>Привет, {user.name}!</span> : <span>Загрузка...</span>}
            </div>
        </header>
    );
}
