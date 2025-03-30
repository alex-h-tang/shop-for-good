import React, { useEffect, useState } from "react";
import Linking from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';

// These imports stay the same:
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { IconSymbol } from '@/components/ui/IconSymbol';

import { useRouter } from 'expo-router';

import { filterAndSortResults } from '@/hooks/useFilter';
import { search } from '@/services/apiService';

export default function EcoFriendlyAlternativesScreen() {
  // Hardcoded example product name.
  const { item } = useLocalSearchParams<{ item: string }>();
  const [results, setResults] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      console.log("Fetching data for ", item);
      const data = await search(item); // Await search results
      const filteredData = filterAndSortResults(data); // Sort and filter results
      setResults(filteredData);
      console.log(JSON.stringify(filteredData, null, 2));
    }

    fetchData();
  }, [item]);

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContent}>
      { }
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ThemedText style={styles.backButtonText}>{'<'} Back</ThemedText>
      </TouchableOpacity>

      <ThemedView style={styles.container}>


        <ThemedText style={[styles.productTitle, { color: '#000' }]}>
          {item}
        </ThemedText>


        <View style={{ width: '100%', alignItems: 'center' }}>
          <Image
            source={require('@/assets/images/eggs.png')}
            style={[styles.productImage, { marginLeft: 'auto', marginRight: 'auto' }]}
          />
        </View>


        <ThemedText style={[styles.alternativesTitle, { color: '#000' }]}>
          Friendly Alternatives:
        </ThemedText>

        {/* BRAND BOXES (RESPONSIVE WRAP) */}

        <View style={styles.alternativesContainer}>
          {/* Brand 1 */}
          <View style={styles.brandBox}>
            <ThemedText style={[styles.brandName, { color: '#000' }]}>
              {results[0]?.parent_company}
            </ThemedText>
            <img
              src={results[0]?.image} // placeholder brand image
              style={styles.brandImage}
            />
            <ThemedText style={[styles.priceText, { color: '#000' }]}>
              Overall ESG Score: {results[0]?.esg?.["Overall Score"]?.toFixed(2)}
            </ThemedText>
            <Text style={styles.priceText}>Price: ${results[0]?.price}</Text>
            <Text style={styles.priceText}>Social Score: {results[0]?.esg?.["Social Pillar Score"]?.toFixed(2)}</Text>
            <Text style={styles.priceText}>Governance Score: {results[0]?.esg?.["Governance Pillar Score"]?.toFixed(2)}</Text>
            <Text style={styles.priceText}>Environmental Score: {results[0]?.esg?.["Environmental Pillar Score"]?.toFixed(2)}</Text>
          </View>

          {/* Brand 2 */}
          <View style={styles.brandBox}>
            <ThemedText style={[styles.brandName, { color: '#000' }]}>
              {results[1]?.parent_company}
            </ThemedText>
              <img
                src={results[1]?.image} // placeholder brand image
                style={styles.brandImage}
              />
            <ThemedText style={[styles.priceText, { color: '#000' }]}>
              Overall ESG Score: {results[1]?.esg?.["Overall Score"]?.toFixed(2)}
            </ThemedText>
            <Text style={styles.priceText}>Price: ${results[1]?.price}</Text>
            <Text style={styles.priceText}>Social Score: {results[1]?.esg?.["Social Pillar Score"]?.toFixed(2)}</Text>
            <Text style={styles.priceText}>Governance Score: {results[1]?.esg?.["Governance Pillar Score"]?.toFixed(2)}</Text>
            <Text style={styles.priceText}>Environmental Score: {results[1]?.esg?.["Environmental Pillar Score"]?.toFixed(2)}</Text>
          </View>

          {/* Brand 3 */}
          <View style={styles.brandBox}>
            <ThemedText style={[styles.brandName, { color: '#000' }]}>
              {results[2]?.parent_company}
            </ThemedText>
            <img
              src={results[2]?.image}
              style={styles.brandImage}
            />
            <ThemedText style={[styles.priceText, { color: '#000' }]}>
              Overall ESG Score: {results[2]?.esg?.["Overall Score"]?.toFixed(2)}
            </ThemedText>
            <Text style={styles.priceText}>Price: ${results[2]?.price}</Text>
            <Text style={styles.priceText}>Social Score: {results[2]?.esg?.["Social Pillar Score"]?.toFixed(2)}</Text>
            <Text style={styles.priceText}>Governance Score: {results[2]?.esg?.["Governance Pillar Score"]?.toFixed(2)}</Text>
            <Text style={styles.priceText}>Environmental Score: {results[2]?.esg?.["Environmental Pillar Score"]?.toFixed(2)}</Text>
          </View>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({


  scrollContainer: {
    flex: 1,
    backgroundColor: '#FCE0A2',
  },
  priceText: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 16,
  },

  scrollContent: {
    paddingTop: 80,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  // Main Container
  container: {

    backgroundColor: '#FCE0A2',
    width: '100%',
  },

  // Product Title
  productTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },

  // Product Image
  productImage: {
    width: 400,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 16,
  },

  // Alternatives Title
  alternativesTitle: {
    fontSize: 36,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },


  alternativesContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },

  brandBox: {
    // aspectRatio: 1,   
    flexBasis: '50%',
    minWidth: 200,
    maxWidth: 400,

    alignItems: 'center',
    justifyContent: 'flex-start',

    backgroundColor: '#FFF7E6',
    paddingVertical: 0,
    paddingHorizontal: 10,
    margin: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    overflow: 'visible',
    padding: 10,
  },

  brandImage: {
    width: '60%',
    // marginBottom: 8,
    resizeMode: 'contain',
    marginTop: 0,
    padding: 15,
  },

  brandName: {
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    padding: 15,
    fontSize: 30,
  },
  brandScore: {
    // marginBottom: 8,
    textAlign: 'center',
  },

  viewButton: {
    backgroundColor: '#ffd600',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  viewButtonText: {
    fontWeight: '600',
  },

  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 8,
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 4,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000',
  },
});