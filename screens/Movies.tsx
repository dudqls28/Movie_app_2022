import React , { useEffect, useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator , Dimensions , StyleSheet } from "react-native";
import Swiper from "react-native-web-swiper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BlurView } from "expo-blur";
import { makeImgPath } from "../utils";
const API_KEY = "09e026020d0680091279a8fc5d901b35";

const Container = styled.ScrollView``;

const Viewer = styled.View`
    flex : 1;
`;

const Loader =styled.View`
    flex : 1;
    justify-content : center;
    align-items : center;
`;

const BgImg = styled.Image``;

const Title = styled.Text``;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([]);
    const getNowPlaying = async() => {
        const { results } = await (
            await fetch(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
            )
        ).json();
        console.log(results);
        setNowPlaying(results);
        setLoading(false);
    };
    useEffect (() => {
        getNowPlaying();
    }, []);
    return loading ? (
        <Loader>
            <ActivityIndicator />
        </Loader>
    ) : (
        <Container>
            <Swiper
            loop
            timeout={3}
            controlsEnabled={false}
            containerStyle={{ width: "100%" , height : SCREEN_HEIGHT / 4}}
            >
                {nowPlaying.map((movie) => (
                    <Viewer key={movie.id}>
                        <BgImg 
                            style={StyleSheet.absoluteFill}
                            source={{ uri: makeImgPath(movie.backdrop_path)}}
                        />
                        <BlurView intensity={80} style={StyleSheet.absoluteFill}>
                            <Title>{movie.original_title}</Title>
                        </BlurView>
                    </Viewer>
                ))}
            </Swiper>
        </Container>
    );
};
export default Movies;