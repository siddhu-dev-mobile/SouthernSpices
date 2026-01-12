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
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

const { width } = Dimensions.get('window');

type NotificationsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Notifications'
>;

interface Notification {
  id: string;
  type: 'order' | 'promotion' | 'delivery' | 'payment' | 'general' | 'review';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  image?: any;
  actionText?: string;
  onAction?: () => void;
  priority: 'high' | 'medium' | 'low';
}

const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation<NotificationsScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'order',
      title: 'Order Delivered! 🎉',
      message: 'Your Chicken Biryani order #SB1234 has been delivered successfully. Enjoy your meal!',
      time: '2 minutes ago',
      isRead: false,
      image: require('../assets/biryani1.jpg'),
      actionText: 'Rate Order',
      onAction: () => Alert.alert('Rate Order', 'How was your Chicken Biryani?'),
      priority: 'high',
    },
    {
      id: '2',
      type: 'delivery',
      title: 'Out for Delivery 🚗',
      message: 'Your Mutton Biryani is on the way! Estimated delivery: 15 minutes. Track your order.',
      time: '12 minutes ago',
      isRead: false,
      actionText: 'Track Order',
      onAction: () => Alert.alert('Track Order', 'Opening order tracking...'),
      priority: 'high',
    },
    {
      id: '3',
      type: 'promotion',
      title: '🔥 Weekend Special Offer!',
      message: 'Get 30% OFF on all Biryani orders above $25. Use code: WEEKEND30. Valid till Sunday!',
      time: '1 hour ago',
      isRead: true,
      image: require('../assets/promo-biryani.jpg'),
      actionText: 'Order Now',
      onAction: () => navigation.navigate('Home'),
      priority: 'medium',
    },
    {
      id: '4',
      type: 'order',
      title: 'Order Confirmed ✅',
      message: 'Your order for Veg Biryani has been confirmed. Estimated preparation time: 25 minutes.',
      time: '2 hours ago',
      isRead: true,
      priority: 'medium',
    },
    {
      id: '5',
      type: 'payment',
      title: 'Payment Successful 💳',
      message: 'Payment of $28.47 for order #SB1233 has been processed successfully via Credit Card.',
      time: '2 hours ago',
      isRead: true,
      priority: 'low',
    },
    {
      id: '6',
      type: 'promotion',
      title: '🎊 Welcome Bonus!',
      message: 'Welcome to Southern Spices! Get 20% OFF on your first order. Use code: WELCOME20',
      time: '1 day ago',
      isRead: true,
      actionText: 'Claim Offer',
      onAction: () => Alert.alert('Welcome Offer', 'Offer applied to your account!'),
      priority: 'medium',
    },
    {
      id: '7',
      type: 'review',
      title: 'Rate Your Experience ⭐',
      message: 'How was your recent Prawn Biryani order? Your feedback helps us improve our service.',
      time: '2 days ago',
      isRead: true,
      actionText: 'Write Review',
      onAction: () => Alert.alert('Review', 'Thank you for your feedback!'),
      priority: 'low',
    },
    {
      id: '8',
      type: 'general',
      title: 'New Menu Items! 🍽️',
      message: 'Discover our new Hyderabadi Dum Biryani and Kolkata Biryani. Limited time special pricing!',
      time: '3 days ago',
      isRead: true,
      image: require('../assets/biryani4.jpg'),
      actionText: 'Explore Menu',
      onAction: () => navigation.navigate('Home'),
      priority: 'low',
    },
    {
      id: '9',
      type: 'delivery',
      title: 'Delivery Address Updated 📍',
      message: 'Your default delivery address has been updated to: 123 New Street, Food District.',
      time: '1 week ago',
      isRead: true,
      priority: 'low',
    },
    {
      id: '10',
      type: 'promotion',
      title: '🏆 Loyalty Reward Earned!',
      message: 'Congratulations! You\'ve earned 150 loyalty points. Redeem them for exciting rewards.',
      time: '1 week ago',
      isRead: true,
      actionText: 'View Rewards',
      onAction: () => Alert.alert('Loyalty Rewards', 'Check your profile for available rewards!'),
      priority: 'medium',
    },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('Refreshed', 'Notifications updated!');
    }, 1000);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleNotificationPress = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    
    if (notification.onAction) {
      notification.onAction();
    }
  };

  const getNotificationIcon = (type: string, priority: string) => {
    const iconMap = {
      order: 'shopping',
      promotion: 'tag',
      delivery: 'truck-delivery',
      payment: 'credit-card',
      general: 'information',
      review: 'star',
    };

    const colorMap = {
      high: '#FF6B6B',
      medium: '#D17760',
      low: '#666',
    };

    return {
      name: iconMap[type] || 'bell',
      color: colorMap[priority] || '#666',
    };
  };

  const getTimeColor = (isRead: boolean) => {
    return isRead ? '#999' : '#D17760';
  };

  const renderNotification = (notification: Notification) => {
    const icon = getNotificationIcon(notification.type, notification.priority);
    
    return (
      <TouchableOpacity
        key={notification.id}
        style={[
          styles.notificationItem,
          !notification.isRead && styles.unreadNotification
        ]}
        onPress={() => handleNotificationPress(notification)}
        activeOpacity={0.7}
      >
        <View style={styles.notificationContent}>
          {/* Icon or Image */}
          <View style={styles.notificationLeft}>
            {notification.image ? (
              <Image source={notification.image} style={styles.notificationImage} />
            ) : (
              <View style={[styles.notificationIcon, { backgroundColor: `${icon.color}20` }]}>
                <Icon name={icon.name} size={24} color={icon.color} />
              </View>
            )}
            {!notification.isRead && <View style={styles.unreadDot} />}
          </View>

          {/* Content */}
          <View style={styles.notificationBody}>
            <View style={styles.notificationHeader}>
              <Text style={[
                styles.notificationTitle,
                !notification.isRead && styles.unreadTitle
              ]}>
                {notification.title}
              </Text>
              <Text style={[styles.notificationTime, { color: getTimeColor(notification.isRead) }]}>
                {notification.time}
              </Text>
            </View>
            
            <Text style={styles.notificationMessage}>
              {notification.message}
            </Text>

            {notification.actionText && (
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={(e) => {
                  e.stopPropagation();
                  notification.onAction?.();
                }}
              >
                <Text style={styles.actionButtonText}>{notification.actionText}</Text>
                <Icon name="chevron-right" size={16} color="#D17760" />
              </TouchableOpacity>
            )}
          </View>

          {/* Delete Button */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={(e) => {
              e.stopPropagation();
              Alert.alert(
                'Delete Notification',
                'Are you sure you want to delete this notification?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { 
                    text: 'Delete', 
                    style: 'destructive',
                    onPress: () => deleteNotification(notification.id)
                  }
                ]
              );
            }}
          >
            <Icon name="close" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Notifications {unreadCount > 0 && `(${unreadCount})`}
        </Text>
        {unreadCount > 0 && (
          <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
            <Text style={styles.markAllText}>Mark All Read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Notifications List */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#D17760']}
            tintColor="#D17760"
          />
        }
      >
        {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="bell-outline" size={80} color="#ccc" />
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptySubtitle}>
              You're all caught up! New notifications will appear here.
            </Text>
          </View>
        ) : (
          <View style={styles.notificationsContainer}>
            {notifications.map(renderNotification)}
          </View>
        )}

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
  markAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  markAllText: {
    color: '#D17760',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContainer: {
    flex: 1,
  },
  notificationsContainer: {
    paddingTop: 10,
  },
  notificationItem: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#D17760',
  },
  notificationContent: {
    flexDirection: 'row',
    padding: 15,
  },
  notificationLeft: {
    position: 'relative',
    marginRight: 15,
  },
  notificationImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  notificationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D17760',
    borderWidth: 2,
    borderColor: '#fff',
  },
  notificationBody: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
    marginRight: 10,
  },
  unreadTitle: {
    fontWeight: '700',
  },
  notificationTime: {
    fontSize: 12,
    fontWeight: '500',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D17760',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D17760',
    marginRight: 4,
  },
  deleteButton: {
    padding: 5,
    alignSelf: 'flex-start',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
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

export default NotificationsScreen;