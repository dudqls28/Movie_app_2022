import React , { useEffect, useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator , Dimensions , RefreshControl } from "react-native";
import Swiper from "react-native-swiper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";

const API_KEY = "09e026020d0680091279a8fc5d901b35";

const Container = styled.ScrollView``;


const Loader =styled.View`
    flex : 1;
    justify-content : center;
    align-items : center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
    color:white;
    font-size: 18px;
    font-weight: 600;
    margin-left: 30px;
`;

const TrendingScroll = styled.ScrollView`
    margin-top:20px;
`


const Votes = styled.Text`
    color: rgba(255,255,255,0.8);
    font-size: 10px;
`

const ListContainer = styled.View`
    margin-bottom : 40px;
`
const ComingSoonTitle = styled(ListTitle)`
    margin-bottom:20px;
`


const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    const [refreshing,setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [trending, setTrending] = useState([]);
    const getTrending = async() => {
        const { results } = await (
            await fetch(
                `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
            )
        ).json();
        console.log(results);
        setTrending(results);
    };
    const getUpcoming = async() => {
        const { results } = await (
            await fetch(
                `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&`
            )
        ).json();
        
        setUpcoming(results);
    };
    const getNowPlaying = async() => {
        const { results } = await (
            await fetch(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
            )
        ).json();
        setNowPlaying(results);
    };
    const getData = async() => {
        await Promise.all([getTrending(),getUpcoming(),getNowPlaying()]);
        setLoading(false);
        console.log(nowPlaying);
        console.log(upcoming);
        console.log(trending);
    }
    useEffect (() => {
        getData();
    }, []);
    const onRefresh = async () => {
        setRefreshing(true);
        await getData();
        setRefreshing(false);
    }
    return loading ? (
        <Loader>
            <ActivityIndicator />
        </Loader>
    ) : (
        <Container refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}>
            <Swiper
            loop
            horizontal
            autoplay
            autoplayTimeout={3}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{ marginBottom:40, width: "100%" , height : SCREEN_HEIGHT / 4 , }}
            >
                {nowPlaying.map((movie) => (
                    <Slide
                        key={movie.id}
                        backdropPath={movie.backdrop_path}
                        posterPath={movie.poster_path}
                        originalTitle={movie.original_title}
                        voteAverage={movie.vote_average}
                        overview={movie.overview}
                        />
                ))}
            </Swiper>
            <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll contentContainerStyle={{paddingLeft:30}} horizontal showsHorizontalScrollIndicator={false}>
                {trending.map((movie) => (
                   <VMedia
                    key={movie.id}
                    posterPath={movie.poster_path}
                    originalTitle={movie.original_title}
                    voteAverage={movie.vote_average}
                    />
                ))}
            </TrendingScroll>
            </ListContainer>
            <ComingSoonTitle>Comming soon</ComingSoonTitle>
            {upcoming.map((movie) =>(
                  <HMedia
                    key={movie.id}
                    posterPath={movie.poster_path}
                    originalTitle={movie.original_title}
                    overview={movie.overview}
                    releaseDate={movie.release_date}
                    />
            ))}
        </Container>
    );
};
export default Movies;