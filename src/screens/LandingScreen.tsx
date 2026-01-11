import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

const { width, height } = Dimensions.get('window');

type LandingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Landing'
>;

const LandingScreen: React.FC = () => {
  const navigation = useNavigation<LandingScreenNavigationProp>();
  const insets = useSafeAreaInsets();

  const handleGetStarted = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Full Screen Background Image 
          ResizeMode options you can try:
          - "cover": Fills entire screen, may crop image
          - "contain": Shows full image, may have empty space
          - "stretch": Stretches to fit exactly, may distort image (current)
          - "center": Centers image at original size
      */}
      <Image
        source={require('../assets/landingimage.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Dark Overlay */}
      <View style={styles.overlay} />
      
      {/* Spice scattered effect */}
      <View style={[styles.spice, styles.spice1]} />
      <View style={[styles.spice, styles.spice2]} />
      <View style={[styles.spice, styles.spice3]} />
      <View style={[styles.spice, styles.spice4]} />
      <View style={[styles.spice, styles.spice5]} />
      <View style={[styles.spice, styles.spice6]} />
      <View style={[styles.spice, styles.spice7]} />
      <View style={[styles.spice, styles.spice8]} />

      {/* Spacer to push content to bottom */}
      <View style={styles.spacer} />

      {/* Content Section - Positioned at bottom above button */}
      <View style={styles.contentContainer}>
        {/* Main Heading */}
        <Text style={styles.mainHeading}>
          Are you starving?
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Within a few clicks, find meals that are accessible near you
        </Text>
      </View>

      {/* Button Container with Safe Area */}
      <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleGetStarted}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height,
    backgroundColor: '#000000', // Fallback color while image loads
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  // Spice scatter effects
  spice: {
    position: 'absolute',
    backgroundColor: '#D2691E',
    borderRadius: 50,
    opacity: 0.8,
    zIndex: 2,
  },
  spice1: {
    width: 8,
    height: 12,
    top: '15%',
    left: '20%',
    transform: [{ rotate: '15deg' }],
  },
  spice2: {
    width: 6,
    height: 10,
    top: '20%',
    right: '25%',
    transform: [{ rotate: '-20deg' }],
  },
  spice3: {
    width: 10,
    height: 14,
    top: '25%',
    left: '15%',
    transform: [{ rotate: '45deg' }],
  },
  spice4: {
    width: 7,
    height: 11,
    top: '30%',
    right: '20%',
    transform: [{ rotate: '-10deg' }],
  },
  spice5: {
    width: 9,
    height: 13,
    bottom: '35%',
    left: '18%',
    transform: [{ rotate: '30deg' }],
  },
  spice6: {
    width: 6,
    height: 9,
    bottom: '40%',
    right: '22%',
    transform: [{ rotate: '-25deg' }],
  },
  spice7: {
    width: 8,
    height: 11,
    bottom: '30%',
    left: '25%',
    transform: [{ rotate: '60deg' }],
  },
  spice8: {
    width: 7,
    height: 10,
    bottom: '25%',
    right: '18%',
    transform: [{ rotate: '-35deg' }],
  },
  spacer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 32,
    paddingVertical: 20,
    alignItems: 'center',
    zIndex: 3,
  },
  mainHeading: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    lineHeight: 40,
    letterSpacing: -0.5,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#E5E5E5',
    lineHeight: 24,
    fontWeight: '400',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  buttonContainer: {
    paddingHorizontal: 32,
    paddingTop: 10,
    zIndex: 3,
  },
  button: {
    backgroundColor: '#CD8B65',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#CD8B65',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default LandingScreen;