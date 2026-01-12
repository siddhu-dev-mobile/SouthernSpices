import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addToCart, type Dish } from '../redux/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../redux/slices/favoritesSlice';

const { width, height } = Dimensions.get('window');

type ProductScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Product'
>;

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  userAvatar?: string;
}

const ProductScreen: React.FC = () => {
  const navigation = useNavigation<ProductScreenNavigationProp>();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state: RootState) => state.favorites.items);
  
  // Get dish data from route params
  const dish = (route.params as any)?.dish || MENU_ITEMS.find(item => item.category === 'Biryanis') || {
    id: '1',
    name: 'Chicken Biryani',
    type: 'Hyderabadi Style',
    price: '$12.99',
    rating: 4.8,
    image: require('../assets/biryani1.jpg'),
    description: 'Aromatic basmati rice cooked with tender chicken pieces, fragrant spices, and saffron. Served with raita, boiled egg, and pickle. A traditional Hyderabadi delicacy that melts in your mouth.',
    ingredients: ['Basmati Rice', 'Chicken', 'Saffron', 'Yogurt', 'Onions', 'Spices'],
    prepTime: '45 mins',
    serves: '2-3 people',
    calories: '650 per serving',
  };

  const [quantity, setQuantity] = useState(1);
  
  // Check if item is in favorites
  const isFavorite = favoriteItems.some(item => item.id === dish.id);

  const reviews: Review[] = [
    {
      id: '1',
      userName: 'Rajesh Kumar',
      rating: 5,
      comment: 'Absolutely delicious! The best biryani I\'ve had in a long time. Perfect spice level and tender chicken.',
      date: '2 days ago',
    },
    {
      id: '2',
      userName: 'Priya Sharma',
      rating: 4,
      comment: 'Great taste and authentic flavors. The portion size is good for the price. Will order again!',
      date: '1 week ago',
    },
    {
      id: '3',
      userName: 'Mohammed Ali',
      rating: 5,
      comment: 'Outstanding quality! The rice was perfectly cooked and the chicken was so tender. Highly recommended.',
      date: '2 weeks ago',
    },
    {
      id: '4',
      userName: 'Sneha Patel',
      rating: 4,
      comment: 'Very good biryani with authentic taste. The delivery was quick and food was still hot.',
      date: '3 weeks ago',
    },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddToCart = () => {
    const dishForCart = {
      ...dish,
      price: parseFloat(dish.price.replace('$', '')),
    };
    
    // Add multiple quantities if selected
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(dishForCart));
    }
    
    Alert.alert(
      'Added to Cart! 🛒',
      `${quantity} x ${dish.name} added to your cart.`,
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

  const handleFavorite = () => {
    const dishForFavorites = {
      ...dish,
      price: typeof dish.price === 'string' ? parseFloat(dish.price.replace('$', '')) : dish.price,
    };
    
    if (isFavorite) {
      dispatch(removeFromFavorites(dish.id));
      Alert.alert(
        'Removed from Favorites',
        `${dish.name} removed from your favorites.`,
        [{ text: 'OK' }]
      );
    } else {
      dispatch(addToFavorites(dishForFavorites));
      Alert.alert(
        'Added to Favorites',
        `${dish.name} added to your favorites.`,
        [{ text: 'OK' }]
      );
    }
  };

  const updateQuantity = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={16}
          color="#FFD700"
        />
      );
    }
    return stars;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton} onPress={handleFavorite}>
          <Icon 
            name={isFavorite ? 'heart' : 'heart-outline'} 
            size={24} 
            color={isFavorite ? '#FF6B6B' : '#fff'} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={dish.image} style={styles.productImage} resizeMode="cover" />
          
          {/* Rating Badge */}
          <View style={styles.ratingBadge}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{dish.rating}</Text>
          </View>
        </View>

        {/* Product Details */}
        <View style={styles.detailsContainer}>
          {/* Name and Type */}
          <View style={styles.titleSection}>
            <Text style={styles.productName}>{dish.name}</Text>
            <Text style={styles.productType}>{dish.type}</Text>
          </View>

          {/* Price and Quantity */}
          <View style={styles.priceSection}>
            <Text style={styles.price}>{dish.price}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => updateQuantity(-1)}
              >
                <Icon name="minus" size={18} color="#D17760" />
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => updateQuantity(1)}
              >
                <Icon name="plus" size={18} color="#D17760" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{dish.description}</Text>
          </View>

          {/* Quick Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Info</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Icon name="clock-outline" size={20} color="#666" />
                <Text style={styles.infoText}>{dish.prepTime}</Text>
              </View>
              <View style={styles.infoItem}>
                <Icon name="account-group-outline" size={20} color="#666" />
                <Text style={styles.infoText}>{dish.serves}</Text>
              </View>
              <View style={styles.infoItem}>
                <Icon name="fire" size={20} color="#666" />
                <Text style={styles.infoText}>{dish.calories}</Text>
              </View>
            </View>
          </View>

          {/* Ingredients */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsContainer}>
              {dish.ingredients?.map((ingredient: string, index: number) => (
                <View key={index} style={styles.ingredientTag}>
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Reviews Section */}
          <View style={styles.section}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Reviews ({reviews.length})</Text>
              <View style={styles.overallRating}>
                <Icon name="star" size={18} color="#FFD700" />
                <Text style={styles.overallRatingText}>{dish.rating}</Text>
              </View>
            </View>

            {reviews.map((review) => (
              <View key={review.id} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewUser}>
                    <View style={styles.userAvatar}>
                      <Text style={styles.userInitial}>
                        {review.userName.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.userName}>{review.userName}</Text>
                      <Text style={styles.reviewDate}>{review.date}</Text>
                    </View>
                  </View>
                  <View style={styles.reviewRating}>
                    {renderStars(review.rating)}
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>

          {/* Bottom Padding */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={[styles.addToCartContainer, { paddingBottom: insets.bottom + 10 }]}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <View style={styles.addToCartContent}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
            <Text style={styles.addToCartPrice}>
              ${(parseFloat(dish.price.replace('$', '')) * quantity).toFixed(2)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  imageContainer: {
    height: height * 0.4,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  detailsContainer: {
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  titleSection: {
    marginBottom: 20,
  },
  productName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  productType: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#D17760',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D17760',
    borderRadius: 8,
  },
  quantityButton: {
    padding: 12,
    minWidth: 40,
    alignItems: 'center',
  },
  quantity: {
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ingredientTag: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  ingredientText: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '500',
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  overallRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  overallRatingText: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
  },
  reviewItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D17760',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  userInitial: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  addToCartContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  addToCartButton: {
    backgroundColor: '#D17760',
    borderRadius: 12,
    overflow: 'hidden',
  },
  addToCartContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  addToCartText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  addToCartPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
});

export default ProductScreen;