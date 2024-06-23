import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { API_ACCESS_TOKEN } from "@env";
import type { Genre, Movie } from '../../types/app';
import MovieItem from '../movies/MovieItem';

const CategorySearch = (): JSX.Element => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_ACCESS_TOKEN}`;
      
      fetch(url)
        .then(async response => await response.json())
        .then(response => {
          setGenres(response.genres);
        })
        .catch(error => {
          console.error(error);
        });
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    if (selectedGenre !== null) {
      const fetchMovies = async () => {
        const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenre}&api_key=${API_ACCESS_TOKEN}`;
        
        fetch(url)
          .then(async response => await response.json())
          .then(response => {
            setMovies(response.results);
          })
          .catch(error => {
            console.error(error);
          });
      };

      fetchMovies();
    }
  }, [selectedGenre]);

  return (
    <View style={styles.container}>
      <FlatList
        data={genres}
        keyExtractor={item => item.id.toString()}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.genreItem,
              selectedGenre === item.id && styles.selectedGenreItem
            ]}
            onPress={() => setSelectedGenre(item.id)}
          >
            <Text style={styles.genreText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <MovieItem 
            movie={item}
            size={{ width: 100, height: 150 }} // Adjust size as needed
            coverType="poster"
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  genreItem: {
    padding: 10,
    backgroundColor: '#C0B4D5',
    borderRadius: 20,
    marginRight: 10,
  },
  selectedGenreItem: {
    backgroundColor: '#8978A4',
  },
  genreText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CategorySearch;
