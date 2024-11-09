import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Home } from "./pages/Home";
import { Points } from "./pages/Points";
import { Detail } from "./pages/Detail";

type IRoutes = {
  home: undefined
  points: undefined
  detail: undefined
  faq: undefined
}

export type NavigatorRoutesProps = NativeStackNavigationProp<IRoutes>

const { Navigator, Screen } = createNativeStackNavigator<IRoutes>()

export function Routes(){
  return (
     <NavigationContainer>
      <Navigator screenOptions={{headerShown: false}}>
          <Screen name="home" component={Home}/>
          <Screen name="points" component={Points}/>
          <Screen name="detail" component={Detail}/>
          {/* <Screen name="faq" component={FAQ}/> */}
        </Navigator>
     </NavigationContainer>
  )
}
