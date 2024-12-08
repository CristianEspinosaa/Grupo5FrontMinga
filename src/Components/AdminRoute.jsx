import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { setUser, validateToken } from '../store/actions/authActions';

const AdminRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { user, status, token } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchUser = async () => {
            if (token && !user) {
                try {
                    const response = await axios.get('http://localhost:8080/api/users/validateToken', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (response.data) {
                        dispatch(setUser(response.data));
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                    dispatch(validateToken(null));
                }
            }
        };

        fetchUser();
    }, [dispatch, token, user]);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (status === 'loading' || !user) {
        return <div>Loading...</div>;
    }

    if (user.role !== 3) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default AdminRoute;