import { MenuItem } from '../constants/menuData';

export type RootStackParamList = {
  Landing: undefined;
  Home: undefined;
  Product: { dish: MenuItem };
  Cart: undefined;
  Profile: undefined;
  Login: undefined;
  Register: undefined;
  OTPVerification: { email: string };
};

export type BottomTabParamList = {
  Home: undefined;
  Favorites: undefined;
  Cart: undefined;
  Notifications: undefined;
};