import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FavoritesScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Favorites Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});

export default FavoritesScreen;