import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

// These imports stay the same:
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { IconSymbol } from '@/components/ui/IconSymbol';

import { useRouter } from 'expo-router';

export default function EcoFriendlyAlternativesScreen() {
  // Hardcoded example product name.
  const productName = '12 Pack Carton of Eggs';

  const router = useRouter();


  return (
    <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.scrollContent}>
      {}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ThemedText style={styles.backButtonText}>{'<'} Back</ThemedText>
      </TouchableOpacity>

      <ThemedView style={styles.container}>

        
        <ThemedText style={[styles.productTitle, { color: '#000'}]}>
          {productName}
        </ThemedText>

        
        <View style={{ width: '100%', alignItems: 'center'}}>
          <Image
            source={require('@/assets/images/eggs.png')}
            style={[styles.productImage, { marginLeft: 'auto', marginRight: 'auto' }]}
          />
        </View>

        
        <ThemedText style={[styles.alternativesTitle, { color: '#000'}]}>
          Friendly Alternatives:
        </ThemedText>

        {/* BRAND BOXES (RESPONSIVE WRAP) */}
        <View style={styles.alternativesContainer}>
          {/* Brand 1 */}
          <View style={styles.brandBox}>
            <ThemedText style={[styles.brandName, { color: '#000'}]}>
              Brand 1
            </ThemedText>
            <Image
              source={require('@/assets/images/eggs.png')} // placeholder brand image
              style={styles.brandImage}
            />
            <ThemedText style={[styles.brandScore, { color: '#000'}]}>
              ESG Score: 85
            </ThemedText>
            <TouchableOpacity style={styles.viewButton} onPress={() => router.push('/details?brand=Brand1')}>
              <ThemedText style={[styles.viewButtonText, { color: '#000'}]}>
                View
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Brand 2 */}
          <View style={styles.brandBox}>
            <ThemedText style={[styles.brandName, { color: '#000'}]}>
              Brand 2
            </ThemedText>
            <Image
              source={require('@/assets/images/eggs.png')}
              style={styles.brandImage}
            />
            <ThemedText style={[styles.brandScore, { color: '#000'}]}>
              ESG Score: 90
            </ThemedText>
            <TouchableOpacity style={styles.viewButton} onPress={() => router.push('/details?brand=Brand2')}>
              <ThemedText style={[styles.viewButtonText, { color: '#000'}]}>
                View
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Brand 3 */}
          <View style={styles.brandBox}>
            <ThemedText style={[styles.brandName, { color: '#000'}]}>
              Brand 3
            </ThemedText>
            <Image
              source={require('@/assets/images/eggs.png')}
              style={styles.brandImage}
            />
            <ThemedText style={[styles.brandScore, { color: '#000'}]}>
              ESG Score: 88
            </ThemedText>
            <TouchableOpacity style={styles.viewButton} onPress={() => router.push('/details?brand=Brand3')}>
              <ThemedText style={[styles.viewButtonText, { color: '#000'}]}>
                View
              </ThemedText>
            </TouchableOpacity>
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
    marginTop: 0
  },

  brandName: {
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 50,
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