import React, { useState, useCallback, ReactNode, useContext, createContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import { Toast } from './types';

// Toast Notification System
const ToastContext = createContext<(message: string, type: 'success' | 'error') => void>(() => {});

const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    }, []);

    const toastBg = {
        success: 'bg-green-500',
        error: 'bg-red-500'
    };

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            <div className="fixed bottom-5 right-5 z-50 space-y-2">
                {toasts.map(toast => (
                    <div key={toast.id} className={`flex items-center text-white px-6 py-3 rounded-md shadow-lg ${toastBg[toast.type]}`}>
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);


const AdminRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { isAdmin, isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" />;
    return isAdmin ? children : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <HashRouter>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/admin" element={
                    <AdminRoute>
                      <AdminPage />
                    </AdminRoute>
                  } />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
              <footer className="bg-slate-800 border-t border-slate-700">
                <div className="container mx-auto max-w-7xl py-6 px-4 text-center text-sm text-slate-400">
                    <p>&copy; {new Date().getFullYear()} AdaptNXT E-commerce. All rights reserved. Solution by a React expert.</p>
                </div>
              </footer>
            </div>
          </HashRouter>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;