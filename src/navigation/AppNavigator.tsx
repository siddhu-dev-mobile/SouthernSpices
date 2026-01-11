import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList, BottomTabParamList } from './types';
import {
  HomeScreen,
  ProductScreen,
  CartScreen,
  FavoritesScreen,
  NotificationsScreen,
  ProfileScreen,
  LoginScreen,
  RegisterScreen,
  LandingScreen,
} from '../screens';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Favorites') {
            iconName = 'heart-outline';
          } else if (route.name === 'Cart') {
            iconName = 'shopping-outline';
          } else if (route.name === 'Notifications') {
            iconName = 'bell-outline';
          } else {
            iconName = 'home';
          }

          // Use filled icons when focused
          if (focused) {
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Favorites') {
              iconName = 'heart';
            } else if (route.name === 'Cart') {
              iconName = 'shopping';
            } else if (route.name === 'Notifications') {
              iconName = 'bell';
            }
          }

          return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={iconName} size={size} color={color} />
              {focused && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -6,
                    width: 13,
                    height: 4,
                    backgroundColor: '#D17760',
                    borderRadius: 2,
                  }}
                />
              )}
            </View>
          );
        },
        tabBarActiveTintColor: '#D17760',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E5E5',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ tabBarLabel: '' }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{ tabBarLabel: '' }}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen}
        options={{ tabBarLabel: '' }}
      />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationsScreen}
        options={{ tabBarLabel: '' }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen 
          name="Landing" 
          component={LandingScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={TabNavigator} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ 
            title: 'Profile',
            headerStyle: {
              backgroundColor: '#1a1a1a',
            },
            headerTintColor: '#fff',
          }} 
        />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;