import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const PromoCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.promoCard}>
        {/* Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Promo</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.promoTitle}>
            Buy one get{'\n'}one FREE
          </Text>
        </View>

        {/* Biryani Image - Right Side */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/promo-biryani.jpg')}
            style={styles.biryaniImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  promoCard: {
    backgroundColor: '#C9956C',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    height: 120,
  },
  badge: {
    backgroundColor: '#E74C3C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    position: 'absolute',
    top: 12,
    left: 16,
    zIndex: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingTop: 8,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 24,
  },
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  biryaniImage: {
    width: '100%',
    height: '100%',
  },
});

export default PromoCard;