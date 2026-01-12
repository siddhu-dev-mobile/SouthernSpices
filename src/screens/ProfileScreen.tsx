import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;

interface MenuItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  action: () => void;
  showArrow?: boolean;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
}

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const cartItems = useSelector((state: RootState) => state.cart.totalItems);
  const favoriteItems = useSelector((state: RootState) => state.favorites.items);
  const { isLoggedIn, user, isLoading, logout } = useAuth();
  
  // Settings state
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);

  // If still loading, show loading screen
  if (isLoading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          {/* <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
            <Icon name="shopping" size={24} color="#D17760" />
            {cartItems > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItems}</Text>
              </View>
            )}
          </TouchableOpacity> */}
        </View>
        <View style={styles.loadingContainer}>
          <Icon name="loading" size={40} color="#D17760" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  // If user is not logged in, show login prompt
  if (!isLoggedIn) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          {/* <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
            <Icon name="shopping" size={24} color="#D17760" />
            {cartItems > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItems}</Text>
              </View>
            )}
          </TouchableOpacity> */}
        </View>

        {/* Login Prompt */}
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.loginPromptContainer}>
            {/* Hero Section */}
            <View style={styles.heroSection}>
              <View style={styles.logoContainer}>
                <Icon name="food" size={80} color="#D17760" />
                <Text style={styles.appName}>Southern Spices</Text>
                <Text style={styles.appTagline}>Authentic Indian Cuisine</Text>
              </View>
            </View>

            {/* Welcome Card */}
            <View style={styles.welcomeCard}>
              <Text style={styles.welcomeTitle}>Join Southern Spices Family!</Text>
              <Text style={styles.welcomeSubtitle}>
                Sign in to unlock exclusive features, track your orders, and enjoy a personalized dining experience
              </Text>

              {/* Benefits Grid */}
              <View style={styles.benefitsGrid}>
                <View style={styles.benefitCard}>
                  <Icon name="history" size={32} color="#4CAF50" />
                  <Text style={styles.benefitTitle}>Order History</Text>
                  <Text style={styles.benefitDesc}>Track all your orders</Text>
                </View>
                
                <View style={styles.benefitCard}>
                  <Icon name="heart" size={32} color="#FF6B6B" />
                  <Text style={styles.benefitTitle}>Favorites</Text>
                  <Text style={styles.benefitDesc}>Save your loved dishes</Text>
                </View>
                
                <View style={styles.benefitCard}>
                  <Icon name="flash" size={32} color="#FF9800" />
                  <Text style={styles.benefitTitle}>Quick Checkout</Text>
                  <Text style={styles.benefitDesc}>Faster ordering process</Text>
                </View>
                
                <View style={styles.benefitCard}>
                  <Icon name="gift" size={32} color="#9C27B0" />
                  <Text style={styles.benefitTitle}>Exclusive Offers</Text>
                  <Text style={styles.benefitDesc}>Special deals & discounts</Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.primaryButton}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Icon name="login" size={20} color="#fff" style={{ marginRight: 8 }} />
                  <Text style={styles.primaryButtonText}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.secondaryButton}
                  onPress={() => navigation.navigate('Register')}
                >
                  <Icon name="account-plus" size={20} color="#D17760" style={{ marginRight: 8 }} />
                  <Text style={styles.secondaryButtonText}>Create Account</Text>
                </TouchableOpacity>
              </View>

              {/* Guest Option */}
              <TouchableOpacity 
                style={styles.guestOption}
                onPress={() => navigation.navigate('Home')}
              >
                <Icon name="account-outline" size={18} color="#666" />
                <Text style={styles.guestText}>Continue as Guest</Text>
                <Icon name="chevron-right" size={16} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  // Logged in user profile
  const handleAddresses = () => {
    Alert.alert('Manage Addresses', 'Address management feature coming soon!');
  };

  const handlePaymentMethods = () => {
    Alert.alert('Payment Methods', 'Payment methods feature coming soon!');
  };

  const handleSupport = () => {
    Alert.alert('Customer Support', 'How can we help you today?', [
      { text: 'Call Support', onPress: () => Alert.alert('Calling...', '+91 1800-123-4567') },
      { text: 'Chat Support', onPress: () => Alert.alert('Chat', 'Opening chat support...') },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  const handleRateApp = () => {
    Alert.alert('Rate Southern Spices', 'Thank you for using our app! Please rate us on the app store.');
  };

  const handleShareApp = () => {
    Alert.alert('Share App', 'Share Southern Spices with your friends and family!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            Alert.alert('Logged Out', 'You have been successfully logged out.');
          }
        }
      ]
    );
  };

  const accountMenuItems: MenuItem[] = [
    {
      id: '3',
      title: 'Manage Addresses',
      subtitle: 'Home, Work, and other addresses',
      icon: 'map-marker',
      action: handleAddresses,
      showArrow: true,
    },
    {
      id: '4',
      title: 'Payment Methods',
      subtitle: 'Cards, wallets, and other methods',
      icon: 'credit-card',
      action: handlePaymentMethods,
      showArrow: true,
    },
  ];

  const settingsMenuItems: MenuItem[] = [
    {
      id: '5',
      title: 'Push Notifications',
      subtitle: 'Order updates and offers',
      icon: 'bell',
      action: () => {},
      showSwitch: true,
      switchValue: notifications,
      onSwitchChange: setNotifications,
    },
    {
      id: '6',
      title: 'Location Services',
      subtitle: 'For better delivery experience',
      icon: 'crosshairs-gps',
      action: () => {},
      showSwitch: true,
      switchValue: locationServices,
      onSwitchChange: setLocationServices,
    },
  ];

  const supportMenuItems: MenuItem[] = [
    {
      id: '8',
      title: 'Customer Support',
      subtitle: '24/7 help and support',
      icon: 'headset',
      action: handleSupport,
      showArrow: true,
    },
    {
      id: '9',
      title: 'Rate Our App',
      subtitle: 'Help us improve',
      icon: 'star',
      action: handleRateApp,
      showArrow: true,
    },
    {
      id: '10',
      title: 'Share App',
      subtitle: 'Invite friends and family',
      icon: 'share',
      action: handleShareApp,
      showArrow: true,
    },
  ];

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={item.action}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIconContainer}>
          <Icon name={item.icon} size={24} color="#D17760" />
        </View>
        <View style={styles.menuItemContent}>
          <Text style={styles.menuItemTitle}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
          )}
        </View>
      </View>
      
      <View style={styles.menuItemRight}>
        {item.showSwitch && (
          <Switch
            value={item.switchValue}
            onValueChange={item.onSwitchChange}
            trackColor={{ false: '#ccc', true: '#D17760' }}
            thumbColor="#fff"
          />
        )}
        {item.showArrow && (
          <Icon name="chevron-right" size={20} color="#ccc" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        {/* <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping" size={24} color="#D17760" />
          {cartItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItems}</Text>
            </View>
          )}
        </TouchableOpacity> */}
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {user?.email.split('@')[0].charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.email.split('@')[0]}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
            <Text style={styles.memberSince}>Member since {user?.memberSince}</Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Icon name="shopping" size={28} color="#D17760" />
            </View>
            <Text style={styles.statNumber}>{user?.totalOrders || 0}</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Icon name="heart" size={28} color="#FF6B6B" />
            </View>
            <Text style={styles.statNumber}>{favoriteItems.length}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuContainer}>
            {accountMenuItems.map(renderMenuItem)}
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.menuContainer}>
            {settingsMenuItems.map(renderMenuItem)}
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.menuContainer}>
            {supportMenuItems.map(renderMenuItem)}
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={20} color="#FF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Padding */}
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  cartButton: {
    position: 'relative',
    padding: 5,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#D17760',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  scrollContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  
  // Login Prompt Styles
  loginPromptContainer: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: '#D17760',
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginTop: 15,
  },
  appTagline: {
    fontSize: 16,
    color: '#FFE0DB',
    marginTop: 5,
  },
  welcomeCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 20,
    padding: 25,
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  benefitCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 10,
    marginBottom: 5,
  },
  benefitDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  actionButtons: {
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#D17760',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 12,
    shadowColor: '#D17760',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#D17760',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  secondaryButtonText: {
    color: '#D17760',
    fontSize: 16,
    fontWeight: '600',
  },
  guestOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginTop: 10,
  },
  guestText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },

  // Logged In Profile Styles
  profileHeader: {
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D17760',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  memberSince: {
    fontSize: 14,
    color: '#999',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
    gap: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  menuContainer: {
    backgroundColor: '#fff',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  menuItemRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF4444',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF4444',
    marginLeft: 8,
  },
});

export default ProfileScreen;