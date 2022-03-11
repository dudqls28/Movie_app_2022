import AppLoading from "expo-app-loading";
import React, {useState} from "react";
import { StyleSheet, Text, View , useColorScheme } from 'react-native';
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import {  QueryClient, QueryClientProvider} from "react-query";
import { ThemeProvider } from "styled-components/native";
import { darkTheme,lightTheme } from "./styled";
import Root from "./navigation/Root";
//apiKey
//09e026020d0680091279a8fc5d901b35
export default function App() {
  //const [ready,setReaday] = useState(false);
  const isDark = useColorScheme() === "dark";
  const [fontLoad] = Font.useFonts(Ionicons.font);
  const queryClient = new QueryClient();
  //const startLoading = async () => {
  //  await Font.loadAsync(Ionicons.font);
  //};
  //const onFinish = () =>  setReaday(true);
  if(!fontLoad){
  return(
  <AppLoading 
    //startAsync ={startLoading} 
    //  onFinish ={onFinish}
    //  onError ={console.error}
    />
  );
  }
  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme ={isDark ? darkTheme : lightTheme}>
    <NavigationContainer>
      <Root />
    </NavigationContainer>
    </ThemeProvider>
    </QueryClientProvider>
  )
}

