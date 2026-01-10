export const API_BASE_URL = 'https://api.yourapp.com';

export const COLORS = {
  primary: '#FF6B35',
  secondary: '#F7931E',
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: '#333333',
  textSecondary: '#666666',
  border: '#DDDDDD',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const SCREEN_NAMES = {
  HOME: 'Home' as const,
  PRODUCT: 'Product' as const,
  CART: 'Cart' as const,
  PROFILE: 'Profile' as const,
  LOGIN: 'Login' as const,
  REGISTER: 'Register' as const,
};

export const ORDER_STATUS = {
  PENDING: 'pending' as const,
  CONFIRMED: 'confirmed' as const,
  PREPARING: 'preparing' as const,
  OUT_FOR_DELIVERY: 'out_for_delivery' as const,
  DELIVERED: 'delivered' as const,
  CANCELLED: 'cancelled' as const,
};