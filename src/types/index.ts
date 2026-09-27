export interface ColorVariant {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Living Room' | 'Dining Room' | 'Bedroom' | 'Home Office' | 'Lighting' | 'Decor';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  tag?: 'Bestseller' | 'Solid Oak' | 'New Arrival' | 'Handcrafted' | 'Limited Edition';
  images: string[];
  description: string;
  dimensions: string;
  materials: string;
  inStock: boolean;
  colors: ColorVariant[];
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export interface RoomCategory {
  id: string;
  name: string;
  subtitle: string;
  itemCount: number;
  image: string;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  customer: CustomerInfo;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  deliveryMethod: string;
  paymentMethod: string;
  status: 'Confirmed' | 'Preparing Shipment' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
}
