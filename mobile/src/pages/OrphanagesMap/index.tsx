import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Mapview, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import MapMarker from '../../assets/MapMarker.png';

import styles from './styles';

export default function OrphanagesMap() {
  const navigation = useNavigation();

  function handleNavigateToOrphanageDetails(){
    navigation.navigate('OrphanageDetails');
  }

  return (
    <View style={styles.container}>
      <Mapview
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -24.0258378,
          longitude: -52.3485369,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
      >
        <Marker
          icon={MapMarker}
          calloutAnchor={{
            x: 2.7,
            y: 0.8
          }}
          coordinate={{
            latitude: -24.0258378,
            longitude: -52.3485369,
          }}>
          <Callout tooltip onPress={handleNavigateToOrphanageDetails}>
            <View style={styles.callOutContainer}>
              <Text style={styles.callOutText} >Orfanato do Mineiro</Text>
            </View>
          </Callout>
        </Marker>
      </Mapview>
      <View style={styles.footer}>
        <Text style={styles.footerText}>3 orfanatos encontrados</Text>
        <TouchableOpacity style={styles.createOrphanageButton}>
          <Feather name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  )
}