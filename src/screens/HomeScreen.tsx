import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '../components';
import { COLORS, SPACING } from '../common/constants';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="store" size={32} color={COLORS.primary} />
        <Text style={styles.title}>Southern Spices</Text>
        <TouchableOpacity>
          <Icon name="search" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.subtitle}>Welcome to your food delivery app!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default HomeScreen;