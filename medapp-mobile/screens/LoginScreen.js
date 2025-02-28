import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [credentials, setCredentials] = useState({ identifier: '', password: '' });

  const handleChange = (name, value) => {
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = () => {
    // Authenticate user with backend API
    console.log('Logging in with:', credentials);
    navigation.navigate('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Username or Mobile"
        value={credentials.identifier}
        onChangeText={(text) => handleChange('identifier', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={credentials.password}
        onChangeText={(text) => handleChange('password', text)}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
