import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity`
    flex:1;
    justify-content : center;
    align-items: center;
    background-color: ${(props) => props.theme.mainBgColor};
`;
const Title = styled.Text`
    color: ${(props) => props.theme.textColor};
`;
const Movies = () => (
    <Btn>
        <Title>Movies</Title>
    </Btn>
);
export default Movies;