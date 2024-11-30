import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import * as Location from 'expo-location';
import { Feather as Icon } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Callout, Marker } from "react-native-maps";
import api from "../services/api";
import { LocalSvg, SvgXml } from "react-native-svg";

interface Item {
  code: number;
  description: string;
}

interface Point {
  _id: string;
  name: string;
  latitude: string;
  longitude: string;
  items: Item[];
}

interface Params {
  city: string;
}

const items = [
 {
    image: require('../assets/lampadas.png'),
    code: 1,
    description: 'Lâmpadas'
  },
  {
    image: require('../assets/baterias.png'),
    code: 2,
    description: 'Pilha e Baterias'
  },
  {
    image: require('../assets/papeis-papelao.png'),
    code: 3,
    description: 'Papéis e Papelão'
  },
  {
    image: require('../assets/eletronicos.png'),
    code: 4,
    description: 'Resíduos Eletrônicos'
  },
  {
    image: require('../assets/organincos.png'),
    code: 5,
    description: 'Resíduos Orgânicos'
  },
  {
    image: require('../assets/oleo.png'),
    code: 6,
    description: 'Óleo de Cozinha'
  },
  {
    image: require('../assets/metal.png'),
    code: 7,
    description: 'Metal'
  },
  {
    image: require('../assets/plastico.png'),
    code: 8,
    description: 'Plástico'
  },
  {
    image: require('../assets/vidro.png'),
    code: 9,
    description: 'Vidro'
  },
]

export function Points() {
  const [points, setPoints] = useState<Point[]>([]);
  const [pointsFilter, setPointsFilter] = useState<Point[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const navigation = useNavigation();
  const route = useRoute()

  const { city } = route.params as Params
  
  async function loadPosition() {
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if(granted) {
      const currentPosition = await Location.getCurrentPositionAsync();
      setLocation(currentPosition)
    }
  }

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToDetail(id: string) {
    navigation.navigate('detail', { id });
  } 

  function handleNavigateToFaq() {
    navigation.navigate('faq');
  } 
  
  function handleSelectItems(code: number) {
    const alreadySelected = selectedItems.findIndex((item: number) => item === code);

    if(alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== code);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([ ...selectedItems, code ]);
    }
  }

  useEffect(() => {
    const filterPoints = selectedItems.length === 0
    ? points 
    : points.filter(point =>
        selectedItems.every(selectedItemCode =>
          point.items.some((item: Item) => item.code === selectedItemCode)
        )
      );
  
    setPointsFilter(filterPoints);
  }, [selectedItems]);

  useEffect(() => {
    loadPosition();

    api.get(`/points/city/${city}`).then(res => {
      setPoints(res.data);
      setPointsFilter(res.data);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.containerIcon}>
          <TouchableOpacity onPress={handleNavigateBack} style={styles.buttonFaqIcon}>
            <Icon name="arrow-left" size={32} color='#34CB79' />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNavigateToFaq} style={styles.buttonFaqIcon}>
            <Icon name="help-circle" size={32} color='#34CB79' /> 
            <Text style={styles.titleFaqIcon}>FAQ</Text>
          </TouchableOpacity>
        </View>

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
              {pointsFilter.map(point => (
                <Marker
                  key={point._id}
                  onPress={() => handleNavigateToDetail(point._id)}
                  coordinate={{
                    latitude: parseFloat(point.latitude),
                    longitude: parseFloat(point.longitude),
                  }}
                  title={point.name}
                />
              ))}
            </MapView>
          )}
        </View>
        <View style={styles.itemsContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20}}
          >
            {items.map(item => (
              <TouchableOpacity 
                key={String(item.code)} 
                style={[
                    styles.item,
                    selectedItems.includes(item.code) ? styles.selectedItem : {}
                ]} 
                onPress={() => handleSelectItems(item.code)}
                activeOpacity={0.6}
              >
              <Image source={item.image}/>
                <Text style={styles.itemTitle}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
  containerIcon: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight:8,
  },
  buttonFaqIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  }, 
  titleFaqIcon: {
    color: '#34CB79',
    fontSize:20,
    fontFamily: 'Roboto_700Bold',
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
  mapMarkerContainer: {
    width: 90,
    height: 100,
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  }, 
  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'contain',
  }, 
  mapMarkerTitle: {
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
    height: 100,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
