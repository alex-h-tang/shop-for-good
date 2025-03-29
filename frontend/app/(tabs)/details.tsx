import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function DetailsScreen() {
  // Dummy product details and scoring
  const product = 'Apples';
  const stats = { quality: 8.5, price: 7.0, popularity: 9.0 };
  const alternatives = [
    { name: 'Apples Alternative 1', score: 7.5 },
    { name: 'Apples Alternative 2', score: 8.0 },
    { name: 'Apples Alternative 3', score: 7.0 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.productTitle}>{product}</Text>
      <View style={styles.statsContainer}>
        <Text style={styles.statText}>Quality: {stats.quality}</Text>
        <Text style={styles.statText}>Price: {stats.price}</Text>
        <Text style={styles.statText}>Popularity: {stats.popularity}</Text>
      </View>
      <Text style={styles.alternativesTitle}>Alternatives</Text>
      <FlatList
        data={alternatives}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.alternativeItem}>
            <Text style={styles.altName}>{item.name}</Text>
            <Text style={styles.altScore}>Score: {item.score}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  productTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  statsContainer: { marginBottom: 24 },
  statText: { fontSize: 18, marginVertical: 4 },
  alternativesTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  alternativeItem: {
    padding: 12,
    backgroundColor: '#f2f2f2',
    marginBottom: 8,
    borderRadius: 4,
  },
  altName: { fontSize: 18 },
  altScore: { fontSize: 16 },
});
