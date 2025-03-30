// app/(tabs)/actually_alt.tsx
import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function AlternativeScreen() {
  const router = useRouter();

  // Retrieve the groceries query parameter (a JSON string) and parse it into an array
  const { groceries } = useLocalSearchParams<{ groceries?: string }>();
  let groceryList: string[] = [];

  try {
    groceryList = groceries ? JSON.parse(groceries) : [];
  } catch (e) {
    console.warn('Invalid groceries array passed in URL.');
  }

  // Render each grocery as a button that navigates to my_alternatives screen
  function renderGrocery({ item }: { item: string }) {
    return (
      <TouchableOpacity
        style={styles.groceryButton}
        onPress={() =>
          router.push({
            pathname: '/(tabs)/alternatives',
            params: { item },
          })
        }
      >
        <Text style={styles.groceryButtonText}>{item}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Back" onPress={() => router.back()} color="#F2994A" />
      <Text style={styles.title}>Your Groceries</Text>
      <FlatList
        data={groceryList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderGrocery}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, marginVertical: 16, textAlign: 'center' },
  listContainer: { paddingBottom: 20 },
  groceryButton: {
    backgroundColor: '#F2C94C',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  groceryButtonText: { fontSize: 18, color: '#fff' },
});
