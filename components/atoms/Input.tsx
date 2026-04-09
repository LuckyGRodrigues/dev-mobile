import React from 'react';
import {
  type ComponentProps,
  TextInput,
  StyleSheet,
  type TextInputProps,
  View,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useThemeColor } from '@/hooks/use-theme-color';

export type InputProps = TextInputProps & {
  error?: boolean;
  rightIconName?: ComponentProps<typeof MaterialIcons>['name'];
  rightIconColor?: string;
};

export function Input({
  style,
  error,
  secureTextEntry,
  rightIconName,
  rightIconColor,
  ...rest
}: InputProps) {
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const placeholderColor = useThemeColor({}, 'icon');
  const borderColor = error ? '#e74c3c' : 'rgba(0,0,0,0.1)';
  const iconColor = rightIconColor ?? placeholderColor;

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={[
          styles.input,
          rightIconName ? styles.inputWithRightIcon : null,
          {
            color: textColor,
            backgroundColor,
            borderColor,
          },
          style,
        ]}
        placeholderTextColor={placeholderColor}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoCorrect={false}
        {...rest}
      />
      {rightIconName ? (
        <View pointerEvents="none" style={styles.rightIcon}>
          <MaterialIcons name={rightIconName} size={20} color={iconColor} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  inputWithRightIcon: {
    paddingRight: 46,
  },
  rightIcon: {
    position: 'absolute',
    right: 14,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
