import { useEffect, useState } from "react";
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailComposer from 'expo-mail-composer'

import api from "../services/api";

interface Item {
  code: number;
  description: string;
}

interface Point {
  _id: string;
  name: string;
  material: string;
  email: string;
  whatsapp: string;
  zipCode: string;
  address: string;
  number: string;
  uf: string;
  city: string;
  items: Item[]
}

interface Params {
  id: string;
}

export function Detail() {
  const [point, setPoint] = useState<Point>({} as Point);
  const [items, setItems] = useState<string>("");

  const navigation = useNavigation();
  const route = useRoute()

  const { id } = route.params as Params

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [point.email],
    });
  }

  function handleWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=55${point.whatsapp}&text=Tenho intesse sobre coleta de resíduos`);
  }

  useEffect(() => {
    api.get<Point>(`/points/id/${id}`).then(res => {
      setPoint(res.data);
      const items = res.data.items.map(item => item.description).join(', ')
      setItems(items);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={32} color='#34cb79' />
        </TouchableOpacity>

        <Image style={styles.pointImage} source={require('../assets/background.png')} />

        <Text style={styles.pointName}>{point.name}</Text>
        <Text style={styles.pointItems}>
          {items}
        </Text>
        <Text style={styles.addressTitle}>Sobre o material:</Text>
        <Text style={styles.addressContent}>{point.material}</Text>

        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>{`${point.address}, ${point.number}`}</Text>
          <Text style={styles.addressContent}>{`${point.city}, ${point.uf} - ${point.zipCode}`}</Text>
          <Text style={styles.addressContent}>Horário de Funcionamento: 10:00 às 17:00</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleComposeMail}>
          <Icon name="mail" size={20} color="#FFF" />
          <Text style={styles.buttonText}>E-mail</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20,
  },
  pointImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },
  pointName: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'Roboto_700Bold',
    marginTop: 24,
  },
  pointItems: {
    fontFamily: 'Roboto_500Medium',
    marginVertical: 16,
    fontSize: 18,
    lineHeight: 24,
    color: '#34CB79',
  },
  addressContainer: {
    marginTop: 32,
  },
  addressTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80',
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
  },
});