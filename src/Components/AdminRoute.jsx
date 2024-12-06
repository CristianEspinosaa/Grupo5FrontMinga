import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
    const user = useSelector((state) => state.auth.user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== 3) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default AdminRoute;