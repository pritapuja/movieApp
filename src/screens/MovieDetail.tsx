import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const MovieDetail = ({navigation}: any): any => {
    const fetchData = (): void => {
        const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGUxNTBiZjJkM2E0NGY2ZDUyMDY1YjVmNDExMDIyNCIsInN1YiI6IjY2NjdjNzQ4YTdmNzVmZDVhODFjM2Y1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Md9pbF1oUVOiA3SOcdzDrJ9nQKsdFoBdZwFEEjB4jcs'

        const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        }

        fetch(url, options)
            .then(async (response) => await response.json())
            .then ((response) => {console.log(response)})
            .catch((err) => {
                console.error(err)
            })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems:'center'}}>
            <Text>Movie Detail Page</Text>
            <Button 
                title="Fetch Data"
                onPress={() => {
                    fetchData()
                }}
            />
        </View>
    )
}

export default MovieDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});