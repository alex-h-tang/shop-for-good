import React, { useState } from 'react';
import { Image, StyleSheet, Platform, TextInput, Button, FlatList, Text } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  // State for the input field and the grocery list
  const [groceryInput, setGroceryInput] = useState('');
  const [groceries, setGroceries] = useState<string[]>([]);
  const router = useRouter();

  // Function to add an item to the grocery list
  const addGrocery = () => {
    if (groceryInput.trim()) {
      setGroceries([...groceries, groceryInput.trim()]);
      setGroceryInput('');
    }
  };

  // Navigate to the Alternatives screen, passing the grocery list as a query parameter
  const goToAlternatives = () => {
    if (groceries.length > 0) {
      router.push(
        ("/(tabs)/actually_alt?groceries=" +
          encodeURIComponent(JSON.stringify(groceries))) as any
      );
      
    } else {
      alert("Please add a grocery item first.");
    }
  };
  

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F2C94C', dark: '#F2994A' }} // Figma Yellow-Orange colors
      headerImage={
        <Image
          source={require('@/assets/images/logo 3.png')}
          style={styles.reactLogo}
        />
      }
    >
      {/* Title Section */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Input Section: Minimal Duolingo-style input for groceries */}
      <ThemedView style={styles.inputSection}>
        <ThemedText type="subtitle">Enter Your Grocery Items</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="e.g., Apples, Milk, Bread"
          placeholderTextColor="#999"
          value={groceryInput}
          onChangeText={setGroceryInput}
        />
        <Button title="Add Item" onPress={addGrocery} color="#F2994A" />
      </ThemedView>

      {/* Grocery List Section (shown only if there are items) */}
      {groceries.length > 0 && (
        <ThemedView style={styles.listSection}>
          <ThemedText type="subtitle">Your List:</ThemedText>
          <FlatList
            data={groceries}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
          />
        </ThemedView>
      )}

      {/* "Find Alternatives" Button at the bottom */}
      <ThemedView style={styles.buttonContainer}>
        <Button title="Find Alternatives" onPress={goToAlternatives} color="#F2994A" />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 16,
  },
  inputSection: {
    marginHorizontal: 16,
    marginVertical: 20,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F2994A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    fontSize: 18,
    color: '#333',
    paddingVertical: 8,
    marginBottom: 8,
  },
  listSection: {
    marginHorizontal: 16,
    marginVertical: 10,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F2994A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listItem: {
    fontSize: 16,
    marginVertical: 4,
    color: '#333',
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginVertical: 20,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
