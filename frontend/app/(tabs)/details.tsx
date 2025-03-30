import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { search } from '@/services/apiService';
import { useFilteredData, FilteredDataProvider } from '@/context/FilterDataContext'; 


export default function DetailsScreen() {
  const router = useRouter();
  const { parent_company } = useLocalSearchParams<{ parent_company: string }>();
  const { filteredData } = useFilteredData();

  // Hard-coded placeholders for demonstration
  // const brandName = 'Brand 1';
  // const price = '$25.50';
  // const esgRating = '68.70';
  // const description =
  //   'Setting the bar as one of the sturdiest designs in its class, Brand 1 is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.';
  // const extendedStats = [
  //   { label: 'Overall Transparency Score', value: '89.20' },
  //   { label: 'Environmental Pillar Score', value: '80.62' },
  //   { label: 'Social Pillar Score', value: '66.95' },
  //   { label: 'Governance Pillar Score', value: '65.85' },
  //   { label: 'Overall Score Global Rank', value: '1756/17154' },
  //   { label: 'Overall Industry Rank', value: '28/151' },
  //   { label: 'Overall Region Rank', value: '434/3509' },
  // ];

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (filteredData && parent_company) {
      // Filter the data based on the parent_company
      const brandData = filteredData.find((item: any) => item.parent_company === parent_company);
      if (brandData) {
        setData(brandData.esg);  // Set the data to display
      }
    }
  }, [filteredData, parent_company]);

  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // console.log(JSON.stringify(data));

  return (
    <FilteredDataProvider>
    <ScrollView style={styles.container}>

      {/* BACK BUTTON */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/alternatives')}
      // onPress={() => router.back()} // or navigation.goBack()
      >
        <Text style={styles.backButtonText}>{'<'} Back</Text>
      </TouchableOpacity>

      <View style={styles.contentWrapper}>


        <View style={styles.imageContainer}>

          <Image
            source={require('@/assets/images/eggs.png')} // e.g., placeholder
            style={styles.mainImage}
          />
        </View>

        {/* RIGHT SIDE: PRODUCT DETAILS */}
        <View style={styles.detailsContainer}>

          {/* Brand Name */}
          <Text style={styles.brandName}>{data.name}</Text>
          {/* Price */}
          <Text style={styles.priceText}>Price: {data.price}</Text>
          {/* Rating Row */}
          <View style={styles.ratingRow}>


            <Text style={styles.esgLabel}>Overall ESG Rating: [InputRating] </Text>
          </View>

          {/* <Text style={styles.description}>{description}</Text> */}

          <View style={styles.statsCard}>
            {data.esg.map((item: any) => (
              <Text style={styles.statLine} key={item.label}>
                <Text style={{ fontWeight: 'bold' }}>{item.label}:</Text> {item.value}
              </Text>
            ))}
          </View>

          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Where to Buy</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
    </FilteredDataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

  contentWrapper: {
    flexDirection: 'row',
    paddingTop: 100,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  mainImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 8,
  },

  detailsContainer: {
    flex: 1,
    paddingLeft: 16,
  },
  brandName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 8,
  },
  priceText: {
    fontSize: 20,
    color: '#9f9f9f',
    marginBottom: 16,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  starWrapper: {
    width: 79,
    height: 76,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  starBackground: {
    position: 'absolute',
    width: 79,
    height: 76,
    resizeMode: 'contain',
  },
  starNumber: {
    zIndex: 1,
    fontSize: 13,
    color: '#000',
    fontWeight: '600',
  },
  esgLabel: {
    fontSize: 13,
    color: '#9f9f9f',
  },

  description: {
    fontSize: 14,
    color: '#000',
    marginBottom: 16,
    lineHeight: 20,
  },

  statsCard: {
    width: '100%',
    minHeight: 100,
    backgroundColor: '#f9f1e7',
    borderRadius: 5,
    padding: 12,
    marginBottom: 16,
  },
  statLine: {
    fontSize: 13,
    marginBottom: 4,
  },

  buyButton: {
    width: 220,
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFA500',
  },
  buyButtonText: {
    fontSize: 16,
    color: '#000',
  },
});
