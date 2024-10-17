import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
    const token = localStorage.getItem('token');
    console.log("PrivateRoutes의 토큰:", token);

    return (
        token ? <Outlet /> : <Navigate to='/' />
    );
};

export default PrivateRoutes;
