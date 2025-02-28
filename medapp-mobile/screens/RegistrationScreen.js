import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function RegistrationScreen({ navigation }) {
  const [formData, setFormData] = useState({
    username: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // Call backend API here for registration
    console.log('Registration data:', formData);
    navigation.navigate('OTP');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        placeholder="Username"
        value={formData.username}
        onChangeText={(text) => handleChange('username', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Mobile Number"
        value={formData.mobile}
        onChangeText={(text) => handleChange('mobile', text)}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(text) => handleChange('confirmPassword', text)}
        style={styles.input}
        secureTextEntry
      />
      <Text style={styles.label}>Role:</Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleButton, formData.role === 'patient' && styles.activeRole]}
          onPress={() => handleChange('role', 'patient')}
        >
          <Text style={styles.roleText}>Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, formData.role === 'doctor' && styles.activeRole]}
          onPress={() => handleChange('role', 'doctor')}
        >
          <Text style={styles.roleText}>Doctor</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
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
  label: {
    alignSelf: 'flex-start',
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  roleButton: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 5,
    backgroundColor: '#ffffff',
  },
  activeRole: {
    borderColor: '#007bff',
    backgroundColor: '#e0efff',
  },
  roleText: {
    fontSize: 16,
    color: '#333',
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
