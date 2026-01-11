import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateQuantity, removeFromCart, clearCart } from '../redux/slices/cartSlice';

const { width } = Dimensions.get('window');

const CartScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { items: cartItems, totalAmount: cartTotal, totalItems } = useSelector((state: RootState) => state.cart);

  const deliveryFee = 2.99;
  const platformFee = 1.50;
  const gstRate = 0.18; // 18% GST

  const updateItemQuantity = (id: string, change: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const removeItem = (id: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => dispatch(removeFromCart(id))
        },
      ]
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => dispatch(clearCart())
        },
      ]
    );
  };

  const subtotal = cartTotal;
  const gstAmount = subtotal * gstRate;
  const total = subtotal + deliveryFee + platformFee + gstAmount;

  const handleCheckout = () => {
    Alert.alert(
      'Order Placed!',
      `Your order of $${total.toFixed(2)} has been placed successfully. Estimated delivery: 30-45 minutes.`,
      [{ text: 'OK' }]
    );
  };

  if (cartItems.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cart</Text>
        </View>
        <View style={styles.emptyCart}>
          <Icon name="cart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add some delicious items to get started</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cart ({cartItems.length} items)</Text>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Restaurant Info */}
        <View style={styles.restaurantInfo}>
          <View style={styles.restaurantHeader}>
            <Text style={styles.restaurantName}>Southern Spices</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>4.8</Text>
            </View>
          </View>
          <Text style={styles.restaurantAddress}>123 Spice Street, Food District</Text>
          <Text style={styles.deliveryTime}>🕒 30-45 mins delivery</Text>
        </View>

        {/* Cart Items */}
        <View style={styles.itemsContainer}>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={item.image} style={styles.itemImage} />
              
              <View style={styles.itemDetails}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemType}>{item.type}</Text>
                    {item.customizations && (
                      <Text style={styles.customizations}>
                        {item.customizations.join(', ')}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => removeItem(item.id)}
                  >
                    <Icon name="close" size={20} color="#666" />
                  </TouchableOpacity>
                </View>

                <View style={styles.itemFooter}>
                  <View style={styles.priceContainer}>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                    {item.originalPrice && (
                      <Text style={styles.originalPrice}>${item.originalPrice}</Text>
                    )}
                  </View>
                  
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity 
                      style={styles.quantityButton}
                      onPress={() => updateItemQuantity(item.id, -1)}
                    >
                      <Icon name="minus" size={16} color="#D17760" />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity 
                      style={styles.quantityButton}
                      onPress={() => updateItemQuantity(item.id, 1)}
                    >
                      <Icon name="plus" size={16} color="#D17760" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Add More Items */}
        <TouchableOpacity style={styles.addMoreButton}>
          <Icon name="plus" size={20} color="#D17760" />
          <Text style={styles.addMoreText}>Add more items</Text>
        </TouchableOpacity>

        {/* Bill Details */}
        <View style={styles.billContainer}>
          <Text style={styles.billTitle}>Bill Details</Text>
          
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Item Total</Text>
            <Text style={styles.billValue}>${subtotal.toFixed(2)}</Text>
          </View>
          
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery Fee</Text>
            <Text style={styles.billValue}>${deliveryFee.toFixed(2)}</Text>
          </View>
          
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Platform Fee</Text>
            <Text style={styles.billValue}>${platformFee.toFixed(2)}</Text>
          </View>
          
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>GST (18%)</Text>
            <Text style={styles.billValue}>${gstAmount.toFixed(2)}</Text>
          </View>
          
          <View style={[styles.billRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Delivery Instructions */}
        <TouchableOpacity style={styles.instructionsButton}>
          <Icon name="note-text-outline" size={20} color="#666" />
          <Text style={styles.instructionsText}>Add delivery instructions</Text>
          <Icon name="chevron-right" size={20} color="#666" />
        </TouchableOpacity>

        {/* Bottom Padding */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Checkout Button */}
      <View style={[styles.checkoutContainer, { paddingBottom: insets.bottom + 10 }]}>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <View style={styles.checkoutContent}>
            <Text style={styles.checkoutText}>Place Order</Text>
            <Text style={styles.checkoutAmount}>${total.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
      </View>
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
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  clearButtonText: {
    color: '#D17760',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContainer: {
    flex: 1,
  },
  restaurantInfo: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
  },
  restaurantAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  deliveryTime: {
    fontSize: 14,
    color: '#D17760',
    fontWeight: '500',
  },
  itemsContainer: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  itemType: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  customizations: {
    fontSize: 12,
    color: '#D17760',
    fontStyle: 'italic',
  },
  removeButton: {
    padding: 5,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D17760',
    borderRadius: 6,
  },
  quantityButton: {
    padding: 8,
    minWidth: 32,
    alignItems: 'center',
  },
  quantity: {
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#D17760',
    borderStyle: 'dashed',
  },
  addMoreText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#D17760',
    fontWeight: '600',
  },
  billContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  billTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  billLabel: {
    fontSize: 14,
    color: '#666',
  },
  billValue: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#D17760',
  },
  instructionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
  },
  instructionsText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  checkoutContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  checkoutButton: {
    backgroundColor: '#D17760',
    borderRadius: 12,
    overflow: 'hidden',
  },
  checkoutContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  checkoutText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  checkoutAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default CartScreen;