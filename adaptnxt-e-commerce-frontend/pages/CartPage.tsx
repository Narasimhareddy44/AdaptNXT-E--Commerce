import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../App';
import Modal from '../components/Modal';

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
);

const CartPage: React.FC = () => {
    const { cart, updateQuantity, removeFromCart, totalPrice, clearCart, cartCount } = useCart();
    const [zoomedImage, setZoomedImage] = useState<{ url: string; name: string } | null>(null);
    const showToast = useToast();
    const navigate = useNavigate();

    const handlePlaceOrder = () => {
        // Simulate order creation API call
        console.log("Placing order with items:", cart);
        showToast("Order placed successfully!", 'success');
        clearCart();
        navigate('/products');
    };

    return (
        <div className="bg-slate-900">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Shopping Cart</h1>

                {cart.length === 0 ? (
                    <div className="mt-12 text-center">
                        <p className="text-lg text-slate-400">Your cart is empty.</p>
                        <Link to="/products" className="mt-4 inline-block rounded-md border border-transparent bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16" onSubmit={(e) => e.preventDefault()}>
                        <section aria-labelledby="cart-heading" className="lg:col-span-7">
                            <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>
                            <ul role="list" className="divide-y divide-slate-700 border-t border-b border-slate-700">
                                {cart.map((item) => (
                                    <li key={item.id} className="flex py-6 sm:py-10">
                                        <div className="flex-shrink-0">
                                            <img 
                                                src={item.imageUrl} 
                                                alt={item.name} 
                                                className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48 cursor-pointer hover:opacity-80 transition-opacity"
                                                onClick={() => setZoomedImage({ url: item.imageUrl, name: item.name })}
                                            />
                                        </div>
                                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-sm"><span className="font-medium text-slate-200 hover:text-white">{item.name}</span></h3>
                                                    </div>
                                                    <p className="mt-1 text-sm font-medium text-slate-100">₹{item.price.toLocaleString('en-IN')}</p>
                                                </div>
                                                <div className="mt-4 sm:mt-0 sm:pr-9">
                                                    <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity, {item.name}</label>
                                                    <input id={`quantity-${item.id}`} name={`quantity-${item.id}`} type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))} className="w-16 rounded-md border border-slate-600 bg-slate-800 py-1.5 text-left text-base font-medium leading-5 text-white shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"/>
                                                    <div className="absolute top-0 right-0">
                                                        <button type="button" onClick={() => removeFromCart(item.id)} className="-m-2 inline-flex p-2 text-slate-400 hover:text-slate-300">
                                                            <span className="sr-only">Remove</span>
                                                            <TrashIcon />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section aria-labelledby="summary-heading" className="mt-16 rounded-lg bg-slate-800 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
                            <h2 id="summary-heading" className="text-lg font-medium text-white">Order summary</h2>
                            <dl className="mt-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm text-slate-400">Subtotal ({cartCount} items)</dt>
                                    <dd className="text-sm font-medium text-slate-100">₹{totalPrice.toLocaleString('en-IN')}</dd>
                                </div>
                                <div className="flex items-center justify-between border-t border-slate-700 pt-4">
                                    <dt className="text-base font-medium text-white">Order total</dt>
                                    <dd className="text-base font-medium text-white">₹{totalPrice.toLocaleString('en-IN')}</dd>
                                </div>
                            </dl>
                            <div className="mt-6">
                                <button type="button" onClick={handlePlaceOrder} className="w-full rounded-md border border-transparent bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-800">
                                    Place Order
                                </button>
                            </div>
                        </section>
                    </form>
                )}
            </div>

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

export default CartPage;