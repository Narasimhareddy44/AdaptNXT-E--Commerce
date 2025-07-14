import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import Modal from '../components/Modal';
import { useToast } from '../App';

const ProductForm: React.FC<{ product: Product | null; onSave: (productData: any) => void; onCancel: () => void; }> = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        category: product?.category || '',
        price: product?.price || 0,
        description: product?.description || '',
        imageUrl: product?.imageUrl || ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300">Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-300">Category</label>
                <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-slate-300">Price</label>
                <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required className="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-300">Description</label>
                <textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows={3} className="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"></textarea>
            </div>
            <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-300">Image URL</label>
                <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} required placeholder="Enter a direct image URL" className="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>
            <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={onCancel} className="rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-medium text-slate-200 shadow-sm hover:bg-slate-600">Cancel</button>
                <button type="submit" className="rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700">Save</button>
            </div>
        </form>
    );
};


const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
    
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [zoomedImage, setZoomedImage] = useState<{ url: string; name: string } | null>(null);
    
    const { isAdmin } = useAuth();
    const { addToCart } = useCart();
    const showToast = useToast();

    const fetchProducts = useCallback(() => {
        setIsLoading(true);
        api.fetchProducts({ page: currentPage, searchTerm, category })
            .then(data => {
                setProducts(data.products);
                setTotalPages(data.totalPages);
            })
            .catch(err => {
                console.error("Failed to fetch products:", err);
                showToast('Failed to load products.', 'error');
            })
            .finally(() => setIsLoading(false));
    }, [currentPage, searchTerm, category, showToast]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        api.getCategories().then(setCategories);
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };
    
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
        setCurrentPage(1);
    }
    
    const handleAddToCart = (product: Product) => {
        addToCart(product);
        showToast(`${product.name} added to cart!`, 'success');
    };
    
    const handleImageClick = (product: Product) => {
        setZoomedImage({ url: product.imageUrl, name: product.name });
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsFormModalOpen(true);
    };
    
    const handleDelete = (productId: string) => {
        if(window.confirm('Are you sure you want to delete this product?')) {
            api.deleteProduct(productId).then(() => {
                showToast('Product deleted successfully.', 'success');
                fetchProducts();
            });
        }
    };
    
    const handleSaveProduct = (productData: Omit<Product, 'id'>) => {
        const promise = editingProduct
            ? api.updateProduct(editingProduct.id, productData)
            : api.addProduct(productData);

        promise.then(() => {
            showToast(`Product ${editingProduct ? 'updated' : 'added'} successfully.`, 'success');
            setIsFormModalOpen(false);
            setEditingProduct(null);
            fetchProducts();
        }).catch(() => {
            showToast('Failed to save product.', 'error');
        });
    };

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="bg-slate-900">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="pb-8 border-b border-slate-700 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-white">Our Products</h2>
                        <p className="mt-2 text-lg text-slate-400">Find the best products for your needs.</p>
                    </div>
                    {isAdmin && (
                        <button onClick={() => { setEditingProduct(null); setIsFormModalOpen(true); }} className="mt-4 sm:mt-0 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700">
                           Add New Product
                        </button>
                    )}
                </div>

                <div className="py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="lg:col-span-2 w-full rounded-md bg-slate-800 border-slate-600 text-white placeholder-slate-400 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                     <select onChange={handleCategoryChange} value={category} className="w-full rounded-md bg-slate-800 border-slate-600 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500">
                        <option value="">All Categories</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                     <button onClick={() => { setSearchTerm(''); setCategory(''); setCurrentPage(1); }} className="w-full rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-medium text-slate-300 shadow-sm hover:bg-slate-600">
                        Clear Filters
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Spinner size="lg" />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={handleAddToCart}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onImageClick={handleImageClick}
                                />
                            ))}
                        </div>
                        {products.length === 0 && <p className="text-center py-10 text-slate-500">No products found.</p>}
                        
                        <nav className="flex items-center justify-between border-t border-slate-700 px-4 py-3 sm:px-6 mt-10">
                           <div className="flex flex-1 justify-between sm:justify-end">
                             <button
                               onClick={() => handlePageChange(currentPage - 1)}
                               disabled={currentPage === 1}
                               className="relative inline-flex items-center rounded-md border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 disabled:opacity-50"
                             >
                               Previous
                             </button>
                             <span className="mx-4 self-center text-sm text-slate-400">Page {currentPage} of {totalPages}</span>
                             <button
                               onClick={() => handlePageChange(currentPage + 1)}
                               disabled={currentPage === totalPages}
                               className="relative ml-3 inline-flex items-center rounded-md border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 disabled:opacity-50"
                             >
                               Next
                             </button>
                           </div>
                         </nav>
                    </>
                )}
            </div>

            <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} title={editingProduct ? 'Edit Product' : 'Add New Product'}>
                <ProductForm 
                    product={editingProduct}
                    onSave={handleSaveProduct}
                    onCancel={() => setIsFormModalOpen(false)}
                />
            </Modal>
            
            <Modal isOpen={!!zoomedImage} onClose={() => setZoomedImage(null)} title={zoomedImage?.name || 'Product Image'}>
                {zoomedImage && (
                    <img
                        src={zoomedImage.url.replace('w=400&h=300', 'w=800&h=600')}
                        alt={zoomedImage.name}
                        className="w-full h-auto rounded-lg object-contain"
                    />
                )}
            </Modal>
        </div>
    );
};

export default ProductsPage;