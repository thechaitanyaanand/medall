import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function ProfileSetupScreen({ navigation }) {
  const [profile, setProfile] = useState({
    fullName: '',
    address: '',
    dob: '',
  });

  const handleChange = (name, value) => {
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = () => {
    // Submit profile data to backend API
    console.log('Profile data:', profile);
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile Setup</Text>
      <TextInput
        placeholder="Full Name"
        value={profile.fullName}
        onChangeText={(text) => handleChange('fullName', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Address"
        value={profile.address}
        onChangeText={(text) => handleChange('address', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Date of Birth"
        value={profile.dob}
        onChangeText={(text) => handleChange('dob', text)}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Profile</Text>
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
