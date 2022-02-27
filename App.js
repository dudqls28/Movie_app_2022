import AppLoading from "expo-app-loading";
import React, {useState} from "react";
import { StyleSheet, Text, View } from 'react-native';
//
export default function App() {
  const [ready,setReaday] = useState(false);
  const startLoading = async () => {
    await new Promise((resolve) => setTimeout(resolve,1000))
  };
  const onFinish = () =>  setReaday(true);
  if(!ready){
  return(
  <AppLoading 
    startAsync ={startLoading} 
      onFinish ={onFinish}
      onError ={console.error}
    />
  )
  }
  return <Text>Loaidng 끝!</Text>
}

