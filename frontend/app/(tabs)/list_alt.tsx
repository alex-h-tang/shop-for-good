import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function AlternativesScreen() {
  const router = useRouter();
  // Retrieve the 'groceries' query parameter and parse it into an array
  const { groceries } = useLocalSearchParams<{ groceries?: string }>();
  const groceryList: string[] = groceries ? JSON.parse(groceries) : [];

  // Render each grocery item as a button (for now, they are not wired to any further functionality)
  const renderGrocery = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.groceryButton}>
      <Text style={styles.groceryText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button title="Back" onPress={() => router.back()} color="#F2994A" />
      <Text style={styles.title}>Select a Grocery</Text>
      <FlatList
        data={groceryList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderGrocery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 16, textAlign: 'center' },
  groceryButton: {
    backgroundColor: '#F2C94C',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  groceryText: { fontSize: 18, color: '#fff' },
});
