import React from 'react';
import { View, StyleSheet } from 'react-native';

import { AppText } from '@/components/atoms/AppText';
import { TopBar } from '@/components/organisms/TopBar';
import { ThemedView } from '@/components/themed-view';

export default function AgendaScreen() {
  return (
    <ThemedView style={styles.container}>
      <TopBar onNotificationsPress={() => {}} />
      <View style={styles.content} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});
