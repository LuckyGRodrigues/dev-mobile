import React from 'react';
import { View, StyleSheet, ScrollView, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/components/atoms/AppText';
import { Button } from '@/components/atoms/Button';
import { TopBar } from '@/components/organisms/TopBar';
import { ThemedView } from '@/components/themed-view';
import { BackgroundBall } from '@/components/ui/background-ball';
import { useThemeColor } from '@/hooks/use-theme-color';

const courts = [
  {
    name: 'Quadra 1',
    location: { neighborhood: 'Centro', city: 'Chapecó' },
    image: require('@/assets/images/boletaVolei.jpg'),
  },
  {
    name: 'Quadra 2',
    location: { neighborhood: 'Efapi', city: 'Chapecó' },
    image: require('@/assets/images/boletaVolei.jpg'),
  },
  {
    name: 'Quadra 3',
    location: { neighborhood: 'Passo dos Fortes', city: 'Chapecó' },
    image: require('@/assets/images/boletaVolei.jpg'),
  },
];

function HomeScreenContent() {
  const router = useRouter();
  const cardBackground = useThemeColor({ light: '#edf7ff', dark: '#1f2937' }, 'background');
  const [search, setSearch] = React.useState('');

  return (
    <ThemedView style={styles.container}>
      <BackgroundBall />
      <TopBar onNotificationsPress={() => {}} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <AppText variant="subtitle">Quadras disponíveis</AppText>
          <View style={styles.searchContainer}>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Pesquisar quadra"
              placeholderTextColor="#8b8b8b"
              style={styles.searchInput}
            />
            <Ionicons name="search" size={18} color="#5f5f5f" style={styles.searchIcon} />
          </View>
        </View>

        {courts.map((court) => (
          <View key={court.name} style={[styles.card, { backgroundColor: cardBackground }]}> 
            <View style={styles.cardRow}>
              <View style={styles.cardInfo}>
                <AppText variant="subtitle" style={styles.cardTitle}>
                  {court.name}
                </AppText>
                <AppText variant="body" style={styles.locationText}>
                  {court.location.neighborhood} • {court.location.city}
                </AppText>
                <Button
                  title="Agendar"
                  variant="outline"
                  onPress={() => {
                    router.push({
                      pathname: '/agendar',
                      params: {
                        courtName: court.name,
                        neighborhood: court.location.neighborhood,
                        city: court.location.city,
                      },
                    });
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
  searchContainer: {
    marginTop: 10,
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    minHeight: 46,
    paddingLeft: 14,
    paddingRight: 42,
    justifyContent: 'center',
    position: 'relative',
  },
  searchInput: {
    fontSize: 15,
    color: '#1f2937',
    paddingVertical: 10,
  },
  searchIcon: {
    position: 'absolute',
    right: 14,
    top: 14,
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
  locationText: {
    marginBottom: 18,
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
