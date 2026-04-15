import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/atoms/AppText';
import { Button } from '@/components/atoms/Button';
import { BackgroundBall } from '@/components/ui/background-ball';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { saveBooking } from '@/utils/booking-storage';

type AgendarParams = {
  courtName?: string | string[];
  neighborhood?: string | string[];
  city?: string | string[];
};

const availableTimesByCourt: Record<string, string[]> = {
  'Quadra 1': ['08:00', '09:30', '11:00', '14:00', '16:00'],
  'Quadra 2': ['08:30', '10:00', '12:00', '15:00', '18:00'],
  'Quadra 3': ['07:30', '09:00', '13:30', '17:00', '19:00'],
};

const defaultTimes = ['08:00', '09:00', '10:30', '14:30', '16:30'];

function getParamValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default function ScheduleScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<AgendarParams>();
  const courtName = getParamValue(params.courtName) ?? 'Quadra';
  const neighborhood = getParamValue(params.neighborhood) ?? 'Chapecó';
  const city = getParamValue(params.city) ?? 'SC';
  const availableTimes = availableTimesByCourt[courtName] ?? defaultTimes;
  const [selectedTime, setSelectedTime] = useState(availableTimes[0] ?? '');
  const summaryBackground = useThemeColor({ light: '#edf7ff', dark: '#1f2937' }, 'background');
  const chipBackground = useThemeColor({ light: '#ffffff', dark: '#2a2f36' }, 'background');

  useEffect(() => {
    setSelectedTime(availableTimes[0] ?? '');
  }, [availableTimes]);

  const handleConfirm = async () => {
    if (!selectedTime) {
      Alert.alert('Selecione um horário', 'Escolha um horário disponível para continuar.');
      return;
    }

    try {
      await saveBooking({
        courtName,
        neighborhood,
        city,
        time: selectedTime,
      });

      router.replace('/(tabs)');
    } catch {
      Alert.alert('Erro ao salvar', 'Não foi possível salvar o agendamento.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <BackgroundBall />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={22} color="#f97316" />
            <AppText variant="body" style={styles.backText}>
              Voltar
            </AppText>
          </TouchableOpacity>
          <AppText variant="caption" style={styles.pageLabel}>
            Agendamento
          </AppText>
        </View>

        <View style={styles.titleBlock}>
          <AppText variant="title" style={styles.title}>
            Horários disponíveis
          </AppText>
          <AppText variant="body" style={styles.subtitle}>
            Escolha um horário para {courtName}.
          </AppText>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: summaryBackground }]}> 
          <AppText variant="subtitle" style={styles.summaryTitle}>
            {courtName}
          </AppText>
          <AppText variant="body" style={styles.summaryLocation}>
            {neighborhood} • {city}
          </AppText>
        </View>

        <View style={styles.section}>
          <AppText variant="subtitle" style={styles.sectionTitle}>
            Horários disponíveis
          </AppText>
          <View style={styles.timesGrid}>
            {availableTimes.map((time) => {
              const isSelected = selectedTime === time;

              return (
                <Pressable
                  key={time}
                  onPress={() => setSelectedTime(time)}
                  style={[
                    styles.timeChip,
                    { backgroundColor: isSelected ? '#f97316' : chipBackground },
                    isSelected && styles.timeChipSelected,
                  ]}
                >
                  <AppText
                    variant="body"
                    style={[styles.timeChipText, isSelected && styles.timeChipTextSelected]}
                  >
                    {time}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Button
          title="Confirmar agendamento"
          onPress={handleConfirm}
          style={styles.confirmButton}
          textStyle={styles.confirmButtonText}
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    gap: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backText: {
    color: '#f97316',
    fontWeight: '600',
  },
  pageLabel: {
    color: '#f97316',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  titleBlock: {
    gap: 8,
  },
  title: {
    color: '#f97316',
  },
  subtitle: {
    opacity: 0.9,
  },
  summaryCard: {
    borderRadius: 18,
    padding: 18,
  },
  summaryTitle: {
    marginBottom: 8,
  },
  summaryLocation: {
    opacity: 0.9,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    marginBottom: 2,
  },
  timesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeChip: {
    minWidth: '30%',
    flexGrow: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeChipSelected: {
    borderColor: '#f97316',
  },
  timeChipText: {
    fontWeight: '600',
  },
  timeChipTextSelected: {
    color: '#fff',
  },
  confirmButton: {
    marginTop: 8,
    backgroundColor: '#f97316',
  },
  confirmButtonText: {
    color: '#fff',
  },
});