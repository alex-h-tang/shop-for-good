// grocerylist.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function GroceryListScreen() {
  // Grab the 'groceries' query param from the URL
  const { groceries } = useLocalSearchParams<{ groceries?: string }>();

  // Parse the groceries array (or fallback to an empty array)
  const groceryList: string[] = groceries ? JSON.parse(groceries) : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Grocery List</Text>
      <FlatList
        data={groceryList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 16 },
  listItem: { fontSize: 16, marginVertical: 4 },
});
