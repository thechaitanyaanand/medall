import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Reminders')}>
          <Text style={styles.buttonText}>Reminders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Appointments')}>
          <Text style={styles.buttonText}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Profile')}>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Chatbot')}>
          <Text style={styles.buttonText}>Chatbot</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Family')}>
          <Text style={styles.buttonText}>Family</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Connections')}>
          <Text style={styles.buttonText}>Connections</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    margin: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
