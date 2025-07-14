
import { Role } from './constants';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  role: Role;
  token: string;
}

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}
