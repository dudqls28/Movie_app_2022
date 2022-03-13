import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import { BLACK_COLOR,DARK_COLOR,LIGHT_COLOR,YELLOW_COLOR } from "../colors";
import { Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

const Tabs = () => {
    const isDark = useColorScheme() === "dark";
    return (
    <Tab.Navigator
        sceneContainerStyle={{
            backgroundColor : isDark ? BLACK_COLOR : "white",
        }}
        screenOptions = {{
            // unmountOnBlur: true, // 화면이 다른 스크린으로가면 메모리에서 컴포넌트를 삭제해준다.
            tabBarStyle: {
                backgroundColor : isDark ? BLACK_COLOR : "white",
            },
            tabBarActiveTintColor : isDark ? YELLOW_COLOR : BLACK_COLOR,
            tabBarInactiveTintColor : isDark ? DARK_COLOR : LIGHT_COLOR,
            headerStyle : {
                backgroundColor : isDark ? BLACK_COLOR : "white",
            },
            headerTitleStyle : {
                color: isDark ? "white" : BLACK_COLOR,
            },
            tabBarLabelStyle : {
                marginTop : -5,
                fontSize : 10,
                fontWeight : "600"
            }
        }}
    >
        <Tab.Screen name = "Movies" component = {Movies} 
        options ={{
            tabBarIcon: ({color,size}) => (
                <Ionicons name={"film-outline"} color={color} size={size} />
            )
        }}/>
        <Tab.Screen name = "TV" component = {Tv} 
        options ={{
            tabBarIcon: ({color,size}) => (
                <Ionicons name={"tv-outline"} color={color} size={size} />
            )
        }}/>
        <Tab.Screen name = "Search" component = {Search} 
        options ={{
            tabBarIcon: ({color,size}) => (
                <Ionicons name={"search-outline"} color={color} size={size} />
            )
        }}/>
    </Tab.Navigator>
)
    }
export default Tabs;