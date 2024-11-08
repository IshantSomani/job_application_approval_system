import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom'
import { setAuth } from '../redux/slices/authSlice';

const ProtectedParent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchToken = async () => {
            const token = localStorage.getItem("token");
            const role = localStorage.getItem("role");
            if (token && role) {
                const decodedToken = jwtDecode(token);
                dispatch(setAuth({ token, role, auth: true, user: decodedToken }));
            }
        };
        fetchToken();
    }, [dispatch]);

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default ProtectedParent