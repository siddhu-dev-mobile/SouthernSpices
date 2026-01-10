export type NavigationScreens = 
  | 'Home'
  | 'Product'
  | 'Cart'
  | 'Profile'
  | 'Login'
  | 'Register';

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
};

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';