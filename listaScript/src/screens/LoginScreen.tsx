import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types'; // Importe o tipo
import AsyncStorage from "@react-native-community/async-storage";

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          role: 'user',
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }

      const { token } = await response.json();
      await AsyncStorage.setItem('token', token);
      setError(null);
      navigation.navigate('TarefasScreen');
    } catch (error) {
      setError('Erro de autenticação. Verifique suas credenciais.');
    }
  };

  return (
    <View style={styles.container}>
      
      <Image
        source={require('../../assets/images/TechLogo.png')} 
        style={styles.logo}
        resizeMode="contain" // Ajusta a imagem ao container sem distorcer
      />

      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="#A9A9A9"
        />

        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#A9A9A9"
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202123',
    paddingVertical: 40, // Adiciona um pouco de espaçamento vertical geral
  },
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#2C2C2C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center', // Centraliza o conteúdo dentro do card
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30, // Aumenta a margem abaixo da logo
    marginTop: -30,  // Levanta a logo mais próximo do topo
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#3E3F42',
    borderRadius: 8,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 15,
    backgroundColor: '#3E3F42',
  },
  loginButton: {
    backgroundColor: '#B556F6',
    paddingVertical: 15,
    paddingHorizontal: 80, // Aumenta a largura do botão
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default LoginScreen;
