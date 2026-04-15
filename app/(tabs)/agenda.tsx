import React, { useCallback, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { AppText } from '@/components/atoms/AppText';
import { TopBar } from '@/components/organisms/TopBar';
import { ThemedView } from '@/components/themed-view';
import { BackgroundBall } from '@/components/ui/background-ball';
import { useThemeColor } from '@/hooks/use-theme-color';
import { getBookings, type Booking } from '@/utils/booking-storage';

export default function AgendaScreen() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const cardBackground = useThemeColor({ light: '#edf7ff', dark: '#1f2937' }, 'background');

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadBookings = async () => {
        try {
          setLoading(true);
          const savedBookings = await getBookings();

          if (isActive) {
            setBookings(savedBookings);
          }
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      void loadBookings();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <ThemedView style={styles.container}>
      <BackgroundBall />
      <TopBar onNotificationsPress={() => {}} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <AppText variant="subtitle">Agenda</AppText>
          <AppText variant="body" style={styles.paragraph}>
            Suas quadras agendadas aparecerão aqui.
          </AppText>
        </View>

        {loading ? (
          <View style={styles.emptyState}>
            <AppText variant="body">Carregando agendamentos...</AppText>
          </View>
        ) : bookings.length === 0 ? (
          <View style={styles.emptyState}>
            <AppText variant="subtitle">Nenhum agendamento salvo</AppText>
            <AppText variant="body" style={styles.paragraph}>
              Volte na Home, escolha uma quadra e confirme um horário para vê-la aqui.
            </AppText>
          </View>
        ) : (
          <View style={styles.bookingsList}>
            {bookings.map((booking) => (
              <View key={booking.id} style={[styles.bookingCard, { backgroundColor: cardBackground }]}> 
                <View style={styles.bookingHeader}>
                  <AppText variant="subtitle" style={styles.bookingTitle}>
                    {booking.courtName}
                  </AppText>
                  <View style={styles.timeBadge}>
                    <AppText variant="caption" style={styles.timeBadgeText}>
                      {booking.time}
                    </AppText>
                  </View>
                </View>
                <AppText variant="body" style={styles.bookingLocation}>
                  {booking.neighborhood} • {booking.city}
                </AppText>
                <AppText variant="caption" style={styles.bookingMeta}>
                  Agendamento salvo na Agenda
                </AppText>
              </View>
            ))}
          </View>
        )}
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
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 16,
  },
  emptyState: {
    marginTop: 18,
    padding: 18,
    borderRadius: 18,
    backgroundColor: 'rgba(249, 115, 22, 0.08)',
  },
  paragraph: {
    marginTop: 8,
    opacity: 0.9,
  },
  bookingsList: {
    gap: 14,
  },
  bookingCard: {
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  bookingTitle: {
    flex: 1,
  },
  timeBadge: {
    backgroundColor: '#f97316',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  timeBadgeText: {
    color: '#fff',
    fontWeight: '700',
  },
  bookingLocation: {
    marginBottom: 6,
  },
  bookingMeta: {
    opacity: 0.75,
  },
});
