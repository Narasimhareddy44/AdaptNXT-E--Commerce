import React from 'react';
import { Product } from '../types';
import { useAuth } from '../context/AuthContext';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onImageClick: (product: Product) => void;
}

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
);

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete, onAddToCart, onImageClick }) => {
  const { isAdmin, isAuthenticated } = useAuth();
  
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-700 bg-slate-800 shadow-sm transition-all hover:shadow-lg hover:shadow-primary-900/20">
      <div 
        className="aspect-w-3 aspect-h-2 bg-slate-700 sm:aspect-none sm:h-48 cursor-pointer overflow-hidden"
        onClick={() => onImageClick(product)}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-slate-100">
            {product.name}
        </h3>
        <p className="text-sm text-slate-400">{product.category}</p>
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-base font-medium text-slate-100">₹{product.price.toLocaleString('en-IN')}</p>
        </div>
      </div>
       <div className="p-4 pt-0">
        {isAuthenticated && (
            isAdmin ? (
            <div className="flex items-center justify-between gap-2">
                <button onClick={() => onEdit(product)} className="flex-1 flex items-center justify-center gap-2 rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-yellow-900 hover:bg-yellow-600">
                    <EditIcon /> Edit
                </button>
                <button onClick={() => onDelete(product.id)} className="flex-1 flex items-center justify-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700">
                    <TrashIcon /> Delete
                </button>
            </div>
            ) : (
            <button
                onClick={() => onAddToCart(product)}
                className="w-full rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
                Add to Cart
            </button>
            )
        )}
      </div>
    </div>
  );
};

export default ProductCard;