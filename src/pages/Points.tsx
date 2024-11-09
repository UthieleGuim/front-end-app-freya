import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import * as Location from 'expo-location';
import { Feather as Icon } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Callout, Marker } from "react-native-maps";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface Points {
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: number;
  longitude: number;
}

interface Params {
  uf: string;
  city: string;
}

export function Points() {
  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Points[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const navigation = useNavigation();
  
  async function loadPosition() {
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if(granted) {
      const currentPosition = await Location.getCurrentPositionAsync();
      setLocation(currentPosition)
    }
  }

  useEffect(() => {
    loadPosition();
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToDetail(id: number) {
    // console.log(id)
      navigation.navigate('detail');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={32} color='#34cb79' />
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

        <View style={styles.mapContainer}>
          {location && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >
              {/* {points.map(point =>(
                <Marker
                key={point.id}
                style={styles.mapMarker}
                onPress={() => handleNavigateToDetail(point.id)}
                coordinate={{
                  latitude: point.latitude,
                  longitude: point.longitude,
                }}
               />
              ))} */}
                <Marker
                style={styles.mapMarker}
                onPress={() => handleNavigateToDetail(1)}
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}>
                <Callout>
                  <View style={styles.mapMarkerContainer}>
                    {/* <Image style={styles.mapMarkerImage} source={{ uri: point.image_url }} /> */}
                    <Text style={styles.mapMarkerTitle}>Teste</Text>
                  </View> 
                </Callout>
              </Marker>
            </MapView>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal:32,
    paddingTop: 20,
  }, 
  title: {
    fontSize:20,
    fontFamily: 'Roboto_700Bold',
    marginTop: 24,
  }, 
  description: {
    color: '#6c6c80',
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    marginBottom: 24,
  }, 
  mapContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  }, 
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  }, 
  mapMarker: {
    width: 90,
    height: 80,
  }, 
  mapMarkerContainer: {
    width: 90,
    height: 70,
    borderBlockColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  }, 
  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  }, 
  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    fontSize: 13,
    lineHeight: 23,
    color: '#34CB79',
  },
  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },
  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#EEE',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },
  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
})
