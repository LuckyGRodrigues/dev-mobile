import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { Input } from '@/components/atoms/Input';

export type AddTaskFormProps = {
  onSubmit: (title: string) => void;
};

export function AddTaskForm({ onSubmit }: AddTaskFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    onSubmit(title);
    setTitle('');
  };

  return (
    <View style={styles.container}>
      <Input
        value={title}
        onChangeText={setTitle}
        placeholder="Pesquisa por quadras, esportes ou locais"
        rightIconName="search"
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
        autoCapitalize="sentences"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
  },
});
