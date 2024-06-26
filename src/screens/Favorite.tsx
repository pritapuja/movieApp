import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Movie } from '../types/app';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from "@expo/vector-icons";
import MovieItem from '../components/movies/MovieItem';

const Favorite = ({ navigation }: any): JSX.Element => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteList = await AsyncStorage.getItem('@FavoriteList');
        if (favoriteList) {
          setFavoriteMovies(JSON.parse(favoriteList));
        }
      } catch (error) {
        console.log(error);
      }
    };

    const unsubscribe = navigation.addListener('focus', fetchFavorites);

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Favorite Movies</Text> */}
      <FlatList
        data={favoriteMovies}
        renderItem={({ item }) => (
          <MovieItem movie={item} size={{ width: 100, height: 160 }} coverType="poster" />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  movieTitle: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  list: {
    alignItems: 'center',
  },
  itemContainer: {
    margin: 5,
  },
  poster: {
    width: 100, // Adjusted to fit three columns
    height: 150,
    borderRadius: 10,
    overflow: 'hidden', // Ensures children don't overflow
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 10,
  },
  textContainer: {
    width: '100%',
  },
  imageText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  rating: {
    color: 'yellow',
    fontWeight: '700',
    marginLeft: 2,
  },
});

export default Favorite;
