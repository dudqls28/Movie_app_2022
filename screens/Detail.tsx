import React , {useEffect} from "react";
import { ImageBackground } from "react-native";
import styled from "styled-components/native";
import { Movie,TV } from "../api";
import Poster from "../components/Poster";

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};
`;

type RootStackParamList = {
    Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail" >;

const Detail =({
    navigation : { setOptions},
    route: {
        params
    },
}) => {
    useEffect(() => {
        setOptions({
            title: "originalTitle" in params
                ? params.origianl_title
                : params.origianl_name,
        });
    }, []);
    return (
    <Container>
        <Poster path={params.poster_path || ""} />
    </Container>
);
};

export default Detail;