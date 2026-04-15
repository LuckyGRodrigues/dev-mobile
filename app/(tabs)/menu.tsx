import React, { useState } from 'react';
import { Alert, Image, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

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
  const [phone, setPhone] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const handleEditPhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch {
      Alert.alert(
        'Não foi possível abrir a galeria',
        'Verifique as permissões do app e tente novamente.',
      );
    }
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
          <TouchableOpacity onPress={handleEditPhoto} activeOpacity={0.85} style={styles.photoSection}>
            <View style={styles.photoPlaceholder}>
              {photoUri ? (
                <Image source={{ uri: photoUri }} style={styles.photoImage} />
              ) : (
                <AppText variant="caption" style={styles.photoPlaceholderText}>
                  Foto
                </AppText>
              )}
            </View>
            <AppText variant="subtitle" style={styles.editPhotoText}>
              Editar foto perfil
            </AppText>
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
  photoSection: {
    alignItems: 'center',
  },
  photoPlaceholder: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.18)',
    backgroundColor: '#fff',
    marginTop: 14,
    marginBottom: 26,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholderText: {
    opacity: 0.65,
    fontWeight: '600',
  },
  editPhotoText: {
    color: '#f97316',
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
