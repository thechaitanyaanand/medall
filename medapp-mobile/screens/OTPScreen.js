import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function OTPScreen({ navigation }) {
  const [otp, setOtp] = useState('');

  const handleSubmit = () => {
    // Verify OTP via backend API
    console.log('Verifying OTP:', otp);
    navigation.navigate('ProfileSetup');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <TextInput
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChangeText={setOtp}
        style={styles.input}
        keyboardType="number-pad"
        maxLength={6}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Verify OTP</Text>
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
