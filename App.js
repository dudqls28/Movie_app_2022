import AppLoading from "expo-app-loading";
import React, {useState} from "react";
import { StyleSheet, Text, View } from 'react-native';
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  //const [ready,setReaday] = useState(false);
  const [fontLoad] = Font.useFonts(Ionicons.font);
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
  return <Text>Loaidng 끝!</Text>
}

