import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { AppText } from '@/components/atoms/AppText';
import { Input } from '@/components/atoms/Input';
import { TopBar } from '@/components/organisms/TopBar';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/contexts/AuthContext';

export default function MenuScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [phone, setPhone] = useState('');

  const handleEditPhoto = () => {
    // Placeholder for future edit photo action.
  };

  const handleSave = () => {
    // Placeholder for future save action.
  };

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <ThemedView style={styles.container}>
      <TopBar onNotificationsPress={() => {}} />
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <AppText variant="subtitle">Perfil</AppText>
          <View style={styles.photoPlaceholder}>
            <AppText variant="caption" style={styles.photoPlaceholderText}>
              Foto
            </AppText>
          </View>
          <TouchableOpacity onPress={handleEditPhoto} activeOpacity={0.8}>
            <AppText variant="subtitle">Editar foto perfil</AppText>
          </TouchableOpacity>
          <View style={styles.form}>
            <Input
              value={name}
              onChangeText={setName}
              placeholder="Nome"
              style={styles.input}
            />
            <Input
              value={cpf}
              onChangeText={setCpf}
              placeholder="CPF"
              keyboardType="numeric"
              style={styles.input}
            />
            <Input
              value={phone}
              onChangeText={setPhone}
              placeholder="Número de telefone"
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <AppText variant="body" style={styles.logoutText}>
                Sair
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <AppText variant="body" style={styles.saveText}>
                Salvar
              </AppText>
            </TouchableOpacity>
          </View>
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
  },
  scrollContent: {
    flexGrow: 1,
  },
  section: {
    padding: 20,
    flex: 1,
  },
  photoPlaceholder: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.18)',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 14,
    marginBottom: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPlaceholderText: {
    opacity: 0.65,
    fontWeight: '600',
  },
  form: {
    gap: 20,
    marginTop: 22,
    marginBottom: 32,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
  },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: 100,
    backgroundColor: '#f97316',
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: 100,
    backgroundColor: '#f97316',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    fontWeight: '600',
    color: '#fff',
  },
  saveText: {
    fontWeight: '600',
    color: '#fff',
  },
});
