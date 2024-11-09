import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export function Detail() {
  const navigation = useNavigation();

  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
      <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
              <TouchableOpacity onPress={handleNavigateBack}>
                  <Icon name="arrow-left" size={24} color='#34cb79' />
              </TouchableOpacity>

              {/* <Image style={styles.pointImage} source={{ uri: data.point.image_url }} /> */}

              <Text style={styles.pointName}>Teste</Text>
              {/* <Text style={styles.pointItems}>
                  {data.items.map(item => item.title).join(', ')}
              </Text> */}

              <View style={styles.addressContainer}>
                  <Text style={styles.addressTitle}>Endereço</Text>
                  <Text style={styles.addressContent}>São Paulo, SP</Text>
              </View>
          </View>

          <View style={styles.footer}>
              <TouchableOpacity style={styles.button}>
                  <FontAwesome name="whatsapp" size={20} color="#FFF" />
                  <Text style={styles.buttonText}>Whatsapp</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.button}>
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
    height: 120,
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
    marginTop: 8,
    fontSize: 14,
    lineHeight: 24,
    color: '#6C6C80',
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