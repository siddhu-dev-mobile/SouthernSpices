import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  type ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MenuItem } from '../constants/menuData';

interface CoffeeCardProps {
  coffee: MenuItem;
  style?: ViewStyle;
  onAddToCart?: (dish: MenuItem) => void;
  onPress?: (dish: MenuItem) => void;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({ coffee, style, onAddToCart, onPress }) => {
  const handleAddToCart = (e: any) => {
    e.stopPropagation(); // Prevent card press when adding to cart
    if (onAddToCart) {
      onAddToCart(coffee);
    }
  };

  const handleCardPress = () => {
    if (onPress) {
      onPress(coffee);
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, style]}
      onPress={handleCardPress}
      activeOpacity={0.7}
    >
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image source={coffee.image} style={styles.image} resizeMode="cover" />
        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Icon name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}> {coffee.rating}</Text>
        </View>
      </View>

      {/* Info Container */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{coffee.name}</Text>
        <Text style={styles.type}>{coffee.type}</Text>

        {/* Price and Add Button */}
        <View style={styles.footer}>
          <Text style={styles.price}>{coffee.price}</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddToCart}
            activeOpacity={0.7}
          >
            <Icon name="plus" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    height: 150,
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 2,
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    color: '#1a1a1a',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  type: {
    color: '#9B8B7E',
    fontSize: 12,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: '700',
  },
  addButton: {
    backgroundColor: '#D17760',
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CoffeeCard;