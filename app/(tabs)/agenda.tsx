import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { AppText } from '@/components/atoms/AppText';
import { TopBar } from '@/components/organisms/TopBar';
import { ThemedView } from '@/components/themed-view';
import { BackgroundBall } from '@/components/ui/background-ball';

export default function AgendaScreen() {
  return (
    <ThemedView style={styles.container}>
      <BackgroundBall />
      <TopBar onNotificationsPress={() => {}} />
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <AppText variant="subtitle">Agenda</AppText>
          <AppText variant="body" style={styles.paragraph}>
            Suas quadras agendadas aparecerão aqui. Agende uma nova quadra para ver detalhes.
          </AppText>
        </View>
      </ScrollView>
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
  section: {
    marginBottom: 16,
  },
  paragraph: {
    marginTop: 8,
    opacity: 0.9,
  },
});
