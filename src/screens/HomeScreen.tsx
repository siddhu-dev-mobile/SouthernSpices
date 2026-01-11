import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { PromoCard, CoffeeCard, CategoryTabs } from '../components';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Coffee {
  id: string;
  name: string;
  type: string;
  price: string;
  rating: number;
  image: any;
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState('All Coffee');
  const [searchText, setSearchText] = useState('');
  const [location, setLocation] = useState('Location');
  const [locationDetails, setLocationDetails] = useState('Fetching location...');

  useEffect(() => {
    requestLocationPermission();
  }, []);

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

  const coffees: Coffee[] = [
    {
      id: '1',
      name: 'Caffe Mocha',
      type: 'Deep Foam',
      price: '$4.53',
      rating: 4.8,
      image: require('../assets/coffee4.jpg'),
    },
    {
      id: '2',
      name: 'Flat White',
      type: 'Espresso',
      price: '$3.53',
      rating: 4.8,
      image: require('../assets/coffee2.jpg'),
    },
    {
      id: '3',
      name: 'Americano',
      type: 'Strong & Bold',
      price: '$3.53',
      rating: 4.8,
      image: require('../assets/coffee3.jpg'),
    },
    {
      id: '4',
      name: 'Cappuccino',
      type: 'Rich Cream',
      price: '$4.53',
      rating: 4.8,
      image: require('../assets/coffee4.jpg'),
    },
  ];

  const categories = ['All Coffee', 'Machiato', 'Latte', 'Americ'];

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
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Icon name="magnify" size={20} color="#888" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search coffee"
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
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
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Coffee Grid */}
          <View style={styles.gridContainer}>
            <View style={styles.row}>
              <CoffeeCard coffee={coffees[0]} style={styles.coffee} />
              <CoffeeCard coffee={coffees[1]} style={styles.coffee} />
            </View>
            <View style={styles.row}>
              <CoffeeCard coffee={coffees[2]} style={styles.coffee} />
              <CoffeeCard coffee={coffees[3]} style={styles.coffee} />
            </View>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 16,
  },
  coffee: {
    flex: 1,
  },
});

export default HomeScreen;