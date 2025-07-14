import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Product } from '../types';

const HomePage: React.FC = () => {
  const [heroProducts, setHeroProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch a few products to display on the homepage
    api.fetchProducts({ limit: 5 }).then(data => {
        setHeroProducts(data.products);
    }).catch(err => console.error("Failed to fetch hero products:", err));
  }, []);

  const getImageOrPlaceholder = (index: number) => {
      return heroProducts[index]?.imageUrl || `https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&h=600&auto=format&fit=crop`;
  }
  
  const getAltText = (index: number) => {
      return heroProducts[index]?.name || "E-commerce product image";
  }

  return (
    <div className="flex-grow bg-slate-900">
      <main>
        <div className="relative isolate">
          <svg
            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-slate-800 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
          </svg>
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    Welcome to the AdaptNXT Store
                  </h1>
                  <p className="relative mt-6 text-lg leading-8 text-slate-400 sm:max-w-md lg:max-w-none">
                    This is a frontend implementation for the simple e-commerce API assignment. It showcases a modern React application with features like product browsing, cart management, and role-based access for customers and administrators.
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                    <Link
                      to="/products"
                      className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                    >
                      Shop Now
                    </Link>
                    <Link to="/login" className="text-sm font-semibold leading-6 text-slate-300 hover:text-white">
                      Login <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative">
                      <img
                        src={getImageOrPlaceholder(0)}
                        alt={getAltText(0)}
                        className="aspect-[2/3] w-full rounded-xl bg-slate-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <img
                        src={getImageOrPlaceholder(1)}
                        alt={getAltText(1)}
                        className="aspect-[2/3] w-full rounded-xl bg-slate-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
                    </div>
                    <div className="relative">
                      <img
                        src={getImageOrPlaceholder(2)}
                        alt={getAltText(2)}
                        className="aspect-[2/3] w-full rounded-xl bg-slate-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <img
                        src={getImageOrPlaceholder(3)}
                        alt={getAltText(3)}
                        className="aspect-[2/3] w-full rounded-xl bg-slate-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
                    </div>
                    <div className="relative">
                      <img
                        src={getImageOrPlaceholder(4)}
                        alt={getAltText(4)}
                        className="aspect-[2/3] w-full rounded-xl bg-slate-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;