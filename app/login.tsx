import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { LoginForm } from '@/components/molecules/LoginForm';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (email: string, password: string) => {
    setLoading(true);
    login(email, password);
    setLoading(false);
    router.replace('/(tabs)');
  };

  return (
    <View style={[styles.background, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>

      {/* Bola posicionada no centro-direita */}
      <Image
        source={require('@/assets/images/boletaVolei.jpg')}
        style={styles.ballImage}
        resizeMode="cover"
      />

      {/* Logo no topo */}
      <View style={styles.header}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>
            <Text style={styles.titleAccent}>S</Text>portHub
          </Text>
        </View>
      </View>

      {/* Formulário na parte inferior */}
      <View style={styles.formWrapper}>
        <LoginForm onSubmit={handleSubmit} loading={loading} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  ballImage: {
    position: 'absolute',
    width: 360,
    height: 360,
    borderRadius: 180,
    top: '20%',
    right: -180,
    opacity: 0.45,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 16,
    alignItems: 'flex-start',
  },
  titleBox: {
    backgroundColor: '#000000',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  titleAccent: {
    color: '#FF6600',
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.8,
  },
  formWrapper: {
    paddingBottom: 40,
  },
});
