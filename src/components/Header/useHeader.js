import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../features/User/user-slice';
import { selectUser } from '../../features/User/user-selectors';
import { mockUser } from '../../mock/User';

export default function useHeader() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch(
                setUser(mockUser),
            );
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [dispatch]);

    return { user };
}
