import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Movie } from '../types/app';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from "@expo/vector-icons";

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

  const renderItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('MovieDetail', { id: item.id })}
      style={styles.itemContainer}
    >
      <ImageBackground
        style={styles.poster}
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
      >
        <LinearGradient
          colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.textContainer}>
            <Text style={styles.imageText}>{item.title}</Text>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={16} color="yellow" />
                <Text style={styles.rating}>{item.vote_average.toFixed(1)}</Text>
              </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Favorite Movies</Text> */}
      <FlatList
        data={favoriteMovies}
        renderItem={renderItem}
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
