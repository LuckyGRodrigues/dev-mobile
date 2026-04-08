import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';

import { AppText } from '@/components/atoms/AppText';
import { Button } from '@/components/atoms/Button';
import { TopBar } from '@/components/organisms/TopBar';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

const courts = [
  {
    name: 'Quadra 1',
    hours: ['08:00 – 09:00', '10:00 – 11:00', '14:00 – 15:00'],
    image: require('@/assets/images/boletaVolei.jpg'),
  },
  {
    name: 'Quadra 2',
    hours: ['09:00 – 10:00', '11:00 – 12:00', '15:00 – 16:00'],
    image: require('@/assets/images/boletaVolei.jpg'),
  },
  {
    name: 'Quadra 3',
    hours: ['08:30 – 09:30', '12:00 – 13:00', '17:00 – 18:00'],
    image: require('@/assets/images/boletaVolei.jpg'),
  },
];

function HomeScreenContent() {
  const cardBackground = useThemeColor({ light: '#edf7ff', dark: '#1f2937' }, 'background');

  return (
    <ThemedView style={styles.container}>
      <TopBar onNotificationsPress={() => {}} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <AppText variant="subtitle">Quadras disponíveis</AppText>
          <AppText variant="body" style={styles.paragraph}>
            Veja as quadras que ainda estão livres e entre em contato para reservar o horário.
          </AppText>
        </View>

        {courts.map((court) => (
          <View key={court.name} style={[styles.card, { backgroundColor: cardBackground }]}> 
            <View style={styles.cardRow}>
              <View style={styles.cardInfo}>
                <AppText variant="subtitle" style={styles.cardTitle}>
                  {court.name}
                </AppText>
                <View style={styles.hoursList}>
                  {court.hours.map((hour) => (
                    <AppText key={hour} variant="body" style={styles.hourItem}>
                      • {hour}
                    </AppText>
                  ))}
                </View>
                <Button
                  title="Entre em contato"
                  variant="outline"
                  onPress={() => {
                    // Substitua por ação real de contato
                  }}
                  style={styles.contactButton}
                />
              </View>
              <Image source={court.image} style={styles.courtImage} />
            </View>
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

export default function HomeScreen() {
  return <HomeScreenContent />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 16,
  },
  paragraph: {
    marginTop: 8,
    opacity: 0.9,
  },
  card: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    marginBottom: 12,
  },
  hoursList: {
    gap: 8,
    marginBottom: 18,
  },
  hourItem: {
    opacity: 0.95,
  },
  courtImage: {
    width: 100,
    height: 100,
    borderRadius: 14,
    backgroundColor: '#d9d9d9',
  },
  contactButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 22,
  },
});
