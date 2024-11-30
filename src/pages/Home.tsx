import {  Alert, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Feather as Icon} from '@expo/vector-icons'
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export function Home() {
    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');
  
    const navigation = useNavigation();
  
    function handleNavigateToPoints() {
        if(!city) {
            return Alert.alert("Obrigatório", "Necessário digita uma cidade!")
        }

        navigation.navigate('points', { city });
    }

    return (
       <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding':undefined}>
         <View style={styles.container}>
            <View style={styles.main}>
                <Image source={require('../assets/logo.png')} />
                <Text style={styles.title} >Procure um ponto proximo a você.</Text>
                <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
            </View>

            <TextInput style={styles.input} placeholder="Digite sua cidade" value={city} autoCorrect={false} onChangeText={setCity} />

            <TouchableOpacity style={styles.button} onPress={handleNavigateToPoints}>
                <View style={styles.buttonIcon}>
                   <Icon name="arrow-right" color="#fff" size={24} /> 
                </View>
                <Text style={styles.buttonText} >Pesquisar</Text>
            </TouchableOpacity>
            
        </View>
    
       </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
       padding:32,
       backgroundColor:'#F0F0F5'
    }, 
    main:{
        flex:1,
        justifyContent:'center',
    }, 
    title: {
        color:'#322153',
        fontSize:32,
        fontFamily:'Roboto_700Bold', 
        maxWidth:260,
        marginTop:64,
    },
    description: {
        color:'#6C6C80',
        fontSize:16,
        fontFamily:'Roboto_400Regular', 
        maxWidth:260,
        lineHeight:24,
    },
    input: {
      height:60,
      backgroundColor:'#fff',
      borderRadius:10,
      marginBottom:8,
      paddingHorizontal:24,
      fontSize:16, 
    },
    button:{
        backgroundColor:'#34CB79',
        height:60,
        flexDirection:'row',
        overflow:'hidden',
        alignItems:'center',
        marginTop:8,
        borderRadius:10,

    },
    buttonIcon:{
        backgroundColor:'rgba(0, 0, 0, 0.1)',
        height:60,
        width:60,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonText:{
        justifyContent:'center',
        flex:1,
        textAlign:'center',
        color:'#fff',
        fontFamily:'Roboto_500Medium',
        fontSize:16,
    },
    imageLogo:{
        marginTop:200,
        marginHorizontal:24,

    },
})

