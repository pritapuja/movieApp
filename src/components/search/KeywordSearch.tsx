import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_ACCESS_TOKEN } from "@env";
import type { Movie } from '../../types/app';
import MovieItem from '../movies/MovieItem';

const KeywordSearch = (): JSX.Element => {
  const [keyword, setKeyword] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigation = useNavigation();

  const searchMovies = (): void => {
    if (keyword.trim().length === 0) {
      return;
    }

    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&api_key=${API_ACCESS_TOKEN}`;
    
    fetch(url)
      .then(async response => await response.json())
      .then(response => {
        setMovies(response.results);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Search for a movie..."
        onSubmitEditing={searchMovies}
      />
      <Button title="Search" onPress={searchMovies} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default KeywordSearch;
