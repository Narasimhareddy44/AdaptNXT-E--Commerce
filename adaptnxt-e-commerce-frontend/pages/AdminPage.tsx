import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProductsPage from './ProductsPage'; // Reuse the product page for management UI

const AdminPage: React.FC = () => {
    const { isAdmin, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return (
            <div className="container mx-auto max-w-7xl px-4 py-16 text-center">
                <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
                <p className="mt-4 text-lg text-slate-400">You do not have permission to view this page.</p>
            </div>
        );
    }
    
    // Admins will manage products directly from the main products page, which has admin-specific controls.
    // This page serves as a protected route entry point and could be expanded with more admin-specific dashboards.
    return (
        <div>
           {/* Admin content is now integrated into ProductsPage, showing a unified view */}
           <ProductsPage />
        </div>
    );
};

export default AdminPage;