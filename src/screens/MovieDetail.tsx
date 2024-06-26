import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { API_ACCESS_TOKEN } from '@env';
import MovieList from '../components/movies/MovieList';
import type { Movie } from '../types/app';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from "@expo/vector-icons"
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, height } = Dimensions.get('window');

const MovieDetail = ({ route }: any): JSX.Element => {
    const { id } = route.params;
    const [movie, setMovie] = useState<Movie | null>(null);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);


    useEffect(() => {
        const fetchMovieDetails = async () => {
            const url = `https://api.themoviedb.org/3/movie/${id}`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${API_ACCESS_TOKEN}`,
                },
            };

            try {
                const response = await fetch(url, options);
                const data = await response.json();
                setMovie(data);
                checkIfFavorite(data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const checkIfFavorite = async (movie: Movie) => {
        try {
            const favoriteList = await AsyncStorage.getItem('@FavoriteList');
            if (favoriteList) {
                const favMovies: Movie[] = JSON.parse(favoriteList);
                const isFav = favMovies.some(favMovie => favMovie.id === movie.id);
                setIsFavorite(isFav);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addFavorite = async (movie: Movie) => {
        try {
            const initialData = await AsyncStorage.getItem('@FavoriteList');
            let favMovieList: Movie[] = initialData ? JSON.parse(initialData) : [];
            favMovieList.push(movie);
            await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList));
            setIsFavorite(true);

        } catch (error) {
            console.log(error);
        }
    }

    const removeFavorite = async (movie: Movie) => {
        try {
            const initialData = await AsyncStorage.getItem('@FavoriteList');
            if (initialData) {
                let favMovieList: Movie[] = JSON.parse(initialData);
                favMovieList = favMovieList.filter(favMovie => favMovie.id !== movie.id);
                await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList));
                setIsFavorite(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (!movie) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <ImageBackground
                    // resizeMode="cover"
                    style={styles.poster}
                    source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}

                >
                    <LinearGradient
                        colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
                        locations={[0.6, 0.8]}
                        style={styles.gradientStyle}
                    >

                        <View style={styles.textContainer}>
                            <Text style={styles.imageText}>{movie.title}</Text>
                            <View style={styles.rowContainer}>
                                <View style={styles.ratingContainer}>
                                    <FontAwesome name="star" size={16} color="yellow" />
                                    <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
                                </View>
                                <TouchableOpacity onPress={() => isFavorite ? removeFavorite(movie) : addFavorite(movie)}>
                                    <FontAwesome name={isFavorite ? "heart" : "heart-o"} size={32} color="pink" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </ImageBackground>

                <Text style={styles.overview}>{movie.overview}</Text>

                <View style={styles.detailsContainer}>
                    <View style={styles.tableRow}>
                        <View style={styles.cell}>
                            <Text style={styles.label}>Original Language: </Text>
                            <Text style={styles.value}>{movie.original_language}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>Popularity: </Text>
                            <Text style={styles.value}>{movie.popularity}</Text>

                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.cell}>
                            <Text style={styles.label}>Release Date: </Text>
                            <Text style={styles.value}>{movie.release_date}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>Vote Count: </Text>
                            <Text style={styles.value}>{movie.vote_count}</Text>
                        </View>
                    </View>
                </View>
            </View>


            <MovieList
                title="Recommendations"
                path={`movie/${id}/recommendations`}
                coverType="poster"
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        marginBottom: 20,
        alignItems: 'center',
    },
    poster: {
        width: width,
        height: height * 0.3,
        marginBottom: 16,
        justifyContent: 'flex-end',
    },

    textContainer: {
        padding: 15,
    },
    imageText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'left',
        fontWeight: 'bold',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    overview: {
        fontSize: 16,
        textAlign: 'left',
        marginTop: 5,
        marginBottom: 8,
        paddingHorizontal: 16,
    },
    detailsContainer: {
        width: '90%',
        marginBottom: 8,
        marginTop: 8
    },

    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 8,
    },

    cell: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    label: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 14,

    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    rating: {
        color: 'yellow',
        fontWeight: '700',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    gradientStyle: {
        padding: 8,
        height: '100%',
        width: '100%',
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'flex-end',
    },
});

export default MovieDetail;
