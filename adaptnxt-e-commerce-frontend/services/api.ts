import { Product } from '../types';

let mockProducts: Product[] = [
  { id: '1', name: 'Starlight Silver Laptop', category: 'Electronics', price: 95999, imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=400&h=300&auto=format&fit=crop', description: 'A sleek, high-performance laptop for professionals, in a stunning silver finish.' },
  { id: '2', name: 'Ergonomic Wireless Mouse', category: 'Electronics', price: 2499, imageUrl: 'https://www.netcombrunei.com/media/catalog/product/cache/f9c79f757b685538d4168da37b3725fb/r/a/razer-706.jpg', description: 'A comfortable and responsive ergonomic wireless mouse.' },
  { id: '3', name: 'RGB Mechanical Keyboard', category: 'Electronics', price: 7999, imageUrl: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=400&h=300&auto=format&fit=crop', description: 'A vibrant RGB mechanical keyboard for an immersive gaming experience.' },
  { id: '4', name: 'Ergonomic Office Chair', category: 'Furniture', price: 14999, imageUrl: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=400&h=300&auto=format&fit=crop', description: 'A stylish and comfortable ergonomic office chair with lumbar support.' },
  { id: '5', name: 'Adjustable Standing Desk', category: 'Furniture', price: 29999, imageUrl: 'https://hulalahome.com/cdn/shop/files/Z6DKGR0517-ACR_1_77816155-e9b7-460b-b3e6-a61d619cd130.jpg?v=1750839672&width=1946', description: 'An adjustable height standing desk for a healthier workspace.' },
  { id: '6', name: 'Studio Headphones', category: 'Electronics', price: 19999, imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=400&h=300&auto=format&fit=crop', description: 'Over-ear noise-cancelling headphones for an immersive sound experience.' },
  { id: '7', name: 'Espresso Coffee Machine', category: 'Appliances', price: 4999, imageUrl: 'https://vassilias.gr/wp-content/uploads/2024/10/R-98041h2500x2500-500x500.jpg', description: 'Brews the perfect cup of espresso or coffee every morning.' },
  { id: '8', name: 'Fitness Smart Watch', category: 'Electronics', price: 17999, imageUrl: 'https://www.androidauthority.com/wp-content/uploads/2019/09/samsung-galaxy-watch-active-2-review-watch-face-clock-face-5-1918w-1080h.jpg.webp', description: 'Track your fitness and stay connected on the go with this smart watch.' },
  { id: '9', name: 'Industrial Bookshelf', category: 'Furniture', price: 8999, imageUrl: 'https://thetimberguy.com/cdn/shop/files/Industrial-style-bookcase-bookshelf-Display-rack-in-solid-wood-Metal-combination_1200x.png?v=1713377507', description: 'A sleek and sturdy industrial-style bookshelf for any modern home.' },
  { id: '10', name: 'Eco-Friendly Yoga Mat', category: 'Sports', price: 1499, imageUrl: 'https://images-cdn.ubuy.co.in/633b5eab3142b127f32c1e44-iuga-eco-friendly-yoga-mat-with.jpg', description: 'A non-slip, eco-friendly yoga mat for your daily practice.' },
  { id: '11', name: 'High-Speed Blender', category: 'Appliances', price: 5999, imageUrl: 'https://www.balzano.in/s/5ffef0f4e87dbbaa9bac7da0/66a23f63d13c590024303910/b0d8ft6tqj-main.jpeg', description: 'A powerful high-speed blender for smoothies, soups, and more.' },
  { id: '12', name: 'Trail Running Shoes', category: 'Sports', price: 6999, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&h=300&auto=format&fit=crop', description: 'Lightweight and comfortable trail running shoes for any terrain.' },
];

const simulateDelay = <T,>(data: T): Promise<T> => {
  return new Promise(resolve => setTimeout(() => resolve(data), 500));
};

export const api = {
  fetchProducts: async ({ page = 1, limit = 8, searchTerm = '', category = '' }: { page?: number, limit?: number, searchTerm?: string, category?: string }) => {
    let filteredProducts = mockProducts;

    if (searchTerm) {
      filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    const totalProducts = filteredProducts.length;
    const paginatedProducts = filteredProducts.slice((page - 1) * limit, page * limit);
    
    return simulateDelay({
      products: paginatedProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    });
  },

  fetchProduct: async (id: string) => {
    const product = mockProducts.find(p => p.id === id);
    return simulateDelay(product);
  },

  getCategories: async () => {
    const categories = [...new Set(mockProducts.map(p => p.category))];
    return simulateDelay(categories);
  },

  addProduct: async (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
    };
    mockProducts.unshift(newProduct);
    return simulateDelay(newProduct);
  },

  updateProduct: async (id: string, productData: Partial<Product>) => {
    mockProducts = mockProducts.map(p => (p.id === id ? { ...p, ...productData } : p));
    const updatedProduct = mockProducts.find(p => p.id === id);
    return simulateDelay(updatedProduct);
  },

  deleteProduct: async (id: string) => {
    mockProducts = mockProducts.filter(p => p.id !== id);
    return simulateDelay({ success: true });
  },
};