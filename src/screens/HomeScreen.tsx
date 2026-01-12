import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { PromoCard, CoffeeCard, CategoryTabs } from '../components';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addToCart, type Dish } from '../redux/slices/cartSlice';
import { FOOD_CATEGORIES, DEFAULT_CATEGORY } from '../constants/categories';
import { MENU_ITEMS, type MenuItem } from '../constants/menuData';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.totalItems);
  
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [searchText, setSearchText] = useState('');
  const [location, setLocation] = useState('Location');
  const [locationDetails, setLocationDetails] = useState('Fetching location...');
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    requestLocationPermission();
    filterItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [selectedCategory, searchText]);

  // Dynamic placeholder effect with smooth animation
  useEffect(() => {
    const startPlaceholderAnimation = () => {
      intervalRef.current = setInterval(() => {
        if (!isSearching) {
          // Subtle pulse effect
          Animated.sequence([
            Animated.timing(fadeAnim, {
              toValue: 0.6,
              duration: 200,
              useNativeDriver: false,
            }),
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: false,
            }),
          ]).start();
          
          // Change placeholder after animation starts
          setTimeout(() => {
            setPlaceholderIndex((prevIndex) => 
              (prevIndex + 1) % FOOD_CATEGORIES.length
            );
          }, 100);
        }
      }, 5000); // Change every 5 seconds
    };

    if (!isSearching) {
      startPlaceholderAnimation();
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fadeAnim, isSearching]);

  const getDynamicPlaceholder = () => {
    const category = FOOD_CATEGORIES[placeholderIndex];
    return `Search ${category}...`;
  };

  const filterItems = () => {
    let items = MENU_ITEMS.filter(item => item.category === selectedCategory);
    
    if (searchText.trim()) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.type.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    setFilteredItems(items);
  };

  const requestLocationPermission = async () => {
    try {
      const permission = Platform.OS === 'ios' 
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE 
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      const result = await request(permission);
      
      if (result === RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        setLocation('Location');
        setLocationDetails('Location access denied');
      }
    } catch (error) {
      console.log('Location permission error:', error);
      setLocation('Location');
      setLocationDetails('Unable to get location');
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        reverseGeocode(latitude, longitude);
      },
      (error) => {
        console.log('Location error:', error);
        setLocation('Location');
        setLocationDetails('Unable to get location');
      },
      { 
        enableHighAccuracy: true, 
        timeout: 15000, 
        maximumAge: 10000 
      }
    );
  };

  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      // Using a simple reverse geocoding service
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const data = await response.json();
      
      if (data.city && data.countryName) {
        setLocation('Location');
        setLocationDetails(`${data.city}, ${data.countryName}`);
      } else {
        setLocation('Location');
        setLocationDetails(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
      }
    } catch (error) {
      console.log('Reverse geocoding error:', error);
      setLocation('Location');
      setLocationDetails('Current Location');
    }
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleAddToCart = (dish: MenuItem) => {
    // Convert MenuItem to Dish format for cart
    const dishForCart = {
      ...dish,
      price: parseFloat(dish.price.replace('$', '')),
    };
    
    dispatch(addToCart(dishForCart));
    
    // Show success feedback
    Alert.alert(
      'Added to Cart! 🛒',
      `${dish.name} has been added to your cart.`,
      [
        { text: 'Continue Shopping', style: 'default' },
        { 
          text: 'View Cart', 
          style: 'default',
          onPress: () => navigation.navigate('Cart')
        }
      ]
    );
  };

  const handleDishPress = (dish: MenuItem) => {
    navigation.navigate('Product', { dish });
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    setIsSearching(text.length > 0);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Status Bar Spacing */}
        <View style={styles.statusBarSpace} />

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.locationLabel}>{location}</Text>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>{locationDetails}</Text>
              <Icon name="chevron-down" size={20} color="#fff" />
            </View>
          </View>
          
          {/* Profile Icon */}
          <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
            <Icon name="account" size={24} color="#1a1a1a" />
            {/* Cart Badge */}
            {cartItems > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItems}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <Animated.View style={[styles.searchContainer, { opacity: fadeAnim }]}>
            <Icon name="magnify" size={20} color="#888" />
            <TextInput
              style={styles.searchInput}
              placeholder={getDynamicPlaceholder()}
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={handleSearchChange}
            />
          </Animated.View>
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="tune-vertical" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Promo Banner - stays on dark background */}
        <PromoCard />

        {/* Background Transition Point - starts after promo card */}
        <View style={styles.backgroundTransition}>
          {/* Category Tabs */}
          <CategoryTabs
            categories={FOOD_CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />

          {/* Filtered Items Grid */}
          <View style={styles.gridContainer}>
            {filteredItems.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Icon name="food-off" size={60} color="#ccc" />
                <Text style={styles.emptyText}>
                  {searchText ? 'No items found for your search' : 'No items in this category'}
                </Text>
              </View>
            ) : (
              <View style={styles.itemsGrid}>
                {filteredItems.map((item, index) => (
                  <CoffeeCard 
                    key={item.id}
                    coffee={item} 
                    style={styles.coffee} 
                    onAddToCart={handleAddToCart}
                    onPress={handleDishPress}
                  />
                ))}
              </View>
            )}
          </View>

          {/* Bottom Padding */}
          <View style={{ height: 30 }} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollContainer: {
    flex: 1,
  },
  backgroundTransition: {
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 0,
    paddingTop: 20,
  },
  statusBarSpace: {
    height: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  searchSection: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    color: '#fff',
    fontSize: 14,
  },
  filterButton: {
    backgroundColor: '#D17760',
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    paddingHorizontal: 20,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 16,
  },
  coffee: {
    width: '48%',
    marginBottom: 15,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
  },
});

export default HomeScreen;