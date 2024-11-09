import { StatusBar, View } from 'react-native';
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';

import { Loading } from './src/components/Loading';
import { Routes } from './src/router';


export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })
  

  return (
    <View style={{flex:1}}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      {fontsLoaded ? <Routes /> : <Loading />}
    </View>
  );
}

