import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


export function Faq() {
  const navigation = useNavigation();

  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={32} color='#34cb79' />
        </TouchableOpacity>

        <Text style={styles.faqName}>FAQ - Duvidas:</Text>

        <Text style={styles.faqTitle}>Como higienizar?</Text>
        <Text style={styles.faqContent}>Quando clica no produto o mesmo consta com um tutorial.</Text>

        <Text style={styles.faqTitle}>Não achei um ponto de coleta próximo?</Text>
        <Text style={styles.faqContent}>Todos os pontos são conforme endereço, porém ele pega a cidade toda, então pode conter algum porém é distante.</Text>

        <Text style={styles.faqTitle}>Não achei o produto nas lista de reciclados ele pode ser de uso unico ou nao ser reciclado?</Text>
        <Text style={styles.faqContent}>A materias que mesmo sendo reciclado algumas empresas não recicla por questão do  tamanho ou não tem tecnologia ou o custo não vale a pena para essas empresas.</Text>
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
  faqName: {
    color: '#34CB79',
    fontSize: 28,
    fontFamily: 'Roboto_700Bold',
    marginVertical: 24,
  },
  faqContainer: {
    marginTop: 32,
  },
  faqTitle: {
    color: '#322153',
    fontFamily: 'Roboto_700Bold',
    fontSize: 16,
  },
  faqContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    marginBottom: 24,
    color: '#6C6C80',
  },
});