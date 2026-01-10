import React from 'react';
import { Text, TextStyle } from 'react-native';
import { COLORS } from '../../common/constants';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: TextStyle;
}

const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = COLORS.text, 
  style 
}) => {
  const getIconText = (iconName: string): string => {
    switch (iconName) {
      case 'home':
        return '🏠';
      case 'bag':
      case 'cart':
        return '🛍️';
      case 'user':
      case 'person':
        return '👤';
      case 'search':
        return '🔍';
      case 'store':
      case 'restaurant':
        return '🏪';
      case 'heart':
        return '❤️';
      case 'star':
        return '⭐';
      case 'plus':
        return '➕';
      case 'minus':
        return '➖';
      case 'back':
        return '⬅️';
      case 'forward':
        return '➡️';
      case 'up':
        return '⬆️';
      case 'down':
        return '⬇️';
      default:
        return '●';
    }
  };

  return (
    <Text 
      style={[
        {
          fontSize: size,
          color,
          textAlign: 'center',
        },
        style
      ]}
    >
      {getIconText(name)}
    </Text>
  );
};

export default Icon;