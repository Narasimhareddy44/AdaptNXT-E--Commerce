import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Role } from '../constants';

const LoginPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role>(Role.CUSTOMER);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
    navigate(selectedRole === Role.ADMIN ? '/admin' : '/products');
  };

  return (
    <div className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-slate-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            Select a role to continue (no password needed for this demo)
          </p>
        </div>
        <form className="mt-8 space-y-6 rounded-xl bg-slate-800 p-8 shadow-lg" onSubmit={handleLogin}>
          <div className="space-y-4">
            <label htmlFor="role" className="block text-sm font-medium text-slate-300">
              Select Role
            </label>
            <select
              id="role"
              name="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as Role)}
              className="relative block w-full appearance-none rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            >
              <option value={Role.CUSTOMER}>Customer</option>
              <option value={Role.ADMIN}>Admin</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;