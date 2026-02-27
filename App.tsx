
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/ui/screens/HomeScreen";
import DetailScreen from "./src/ui/screens/DetailScreen";
import { useFonts } from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { View, ActivityIndicator } from "react-native";
import {  StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import CreateLocalSreen from "./src/ui/screens/CreateLocalScreen";
import { appStyle } from "./src/ui/screens/components/Header";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();
// Impede splash de fechar automaticamente
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  // Esconde splash quando tudo estiver pronto
  useEffect(() => {
  async function hide() {
    if (fontsLoaded) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      await SplashScreen.hideAsync();
    }
  }

  hide();
}, [fontsLoaded]);

  // Enquanto fontes não carregam, NÃO renderiza nada
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={appStyle.safeArea}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Lista de Itens",
            headerShown: true 
          }}
        />
        <Stack.Screen
          name="Create"
          component={CreateLocalSreen}
           options={{
            title: "Voltar",
            headerShown: false,

          }}
        />
        <Stack.Screen
        name="Details"
        component={DetailScreen}
        options={{ title: "", headerShown: false }}
      />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}
