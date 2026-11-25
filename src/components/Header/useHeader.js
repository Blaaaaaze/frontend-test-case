import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../features/User/user-slice';
import { selectUser } from '../../features/User/user-selectors';

export default function useHeader() {
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

    return { user };
}
