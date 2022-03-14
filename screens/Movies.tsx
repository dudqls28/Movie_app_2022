import React , {  useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator , Dimensions , FlatList } from "react-native";
import Swiper from "react-native-swiper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import { useQuery ,useQueryClient } from "react-query";
import { moviesApi ,MovieResponse, Movie } from "../api";
import  Loader  from "../components/Loader";
import HList from "../components/HList";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
    color:white;
    font-size: 18px;
    font-weight: 600;
    margin-left: 30px;
`;

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

const VSeparator = styled.View`
    width:20px;
`
const HSeparator = styled.View`
    height: 20px;
`


const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    const queryClient = useQueryClient();
    const [refreshing,setRefreshing] = useState(false);
    const { isLoading: nowPlayingLoading, data : nowPlayingData} 
    = useQuery<MovieResponse>(
        ["movies","nowPlaying"],
        moviesApi.nowPlaying
    );
    const { isLoading: upcomingLoading, data : upcomingData} 
    = useQuery<MovieResponse>(
        ["movies","upcoming"],
        moviesApi.upcoming
    );
    const { isLoading: trendingLoading, data : trendingData} 
    = useQuery<MovieResponse>(
        ["movies","trending"],
        moviesApi.trending
    );
    const onRefresh = async () => {
        setRefreshing(true);
        await queryClient.refetchQueries(["movies"]);
        setRefreshing(false);
    };
    const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
    return loading ? (
        <Loader />
    ) : upcomingData? (
        <FlatList
            onRefresh={onRefresh}
            refreshing={refreshing}
            ListHeaderComponent={<>
            <Swiper
            loop
            horizontal
            autoplay
            autoplayTimeout={3}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{ marginBottom:40, width: "100%" , height : SCREEN_HEIGHT / 4 , }}
            >
                {nowPlayingData?.results.map((movie) => (
                    <Slide
                        key={movie.id}
                        backdropPath={movie.backdrop_path || ""}
                        posterPath={movie.poster_path || ""}
                        originalTitle={movie.original_title}
                        voteAverage={movie.vote_average}
                        overview={movie.overview}
                        />
                ))}
            </Swiper>
            {trendingData ? (
                <HList title="Trending Movies" data={trendingData.results} />
            ) : null }
            <ComingSoonTitle>Comming soon</ComingSoonTitle>
            </>
            }
            data={upcomingData.results}
            keyExtractor={(item) => item.id + ""}
            ItemSeparatorComponent={HSeparator}
            renderItem = {({item }) => (
                <HMedia
                    posterPath={item.poster_path || ""}
                    originalTitle={item.original_title}
                    overview={item.overview}
                    releaseDate={item.release_date}
                />
            )}
        />
    ) : null ;
};
export default Movies;