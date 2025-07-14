import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ShoppingCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

const Header: React.FC = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { cartCount } = useCart();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-primary-500' : 'text-slate-400 hover:text-white'}`;

  return (
    <header className="sticky top-0 z-30 w-full bg-slate-900/80 shadow-sm backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-bold text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500 h-6 w-6"><path d="m12 19-7-7 7-7 7 7-7 7Z"/><path d="m22 12-7-7"/><path d="m6 6 7 7"/></svg>
          AdaptNXT Store
        </NavLink>
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/products" className={navLinkClass}>Products</NavLink>
          {isAdmin && <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>}
        </nav>
        <div className="flex items-center gap-4">
          <NavLink to="/cart" className="relative text-slate-400 hover:text-white">
            <ShoppingCartIcon />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </NavLink>
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-sm sm:inline text-slate-300">{user?.name}</span>
              <button onClick={logout} className="rounded-md bg-primary-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700">Logout</button>
            </div>
          ) : (
            <NavLink to="/login" className="flex items-center gap-2 rounded-md bg-primary-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700">
                <UserIcon />
                <span className="hidden sm:inline">Login</span>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;