import React, {useState} from "react";
import HList from "../components/HList";
import { ScrollView } from "react-native";
import { RefreshControl  } from "react-native";
import { useQuery , useQueryClient } from "react-query";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import styled from "styled-components/native";

const ListTitle = styled.Text`
    color:white;
    font-size: 18px;
    font-weight: 600;
    margin-left: 30px;
`;
const Tv = () => {
    const [refreshing,setRefreshing] = useState(false);
    const queryClient = useQueryClient();
    const { isLoading: todayLoading, data : todayData } 
    = useQuery(
        ["tv","today"],
        tvApi.airingToday
    );
    const { isLoading: topLoading, data : topData } 
    = useQuery(
        ["tv","top"],
        tvApi.topRated
    );
    const { isLoading: trendingLoading, data : trendingData } 
    = useQuery(
        ["tv","trending"],
        tvApi.trending
    );
    
    const onRefresh = async() => {
        setRefreshing(true);
        await queryClient.refetchQueries(["tv"]);
        setRefreshing(false);
    }
    const loading = todayLoading ||topLoading ||trendingLoading;
    if (loading) {
        return <Loader />
    }
    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle ={{ paddingVertical : 30}}
            >
            <HList title="Trending TV" data={trendingData.results} />
            <HList title="Airing Today" data={todayData.results} />
            <HList title="Top Rated TV" data={topData.results} />
        </ScrollView>
    )
};
export default Tv;