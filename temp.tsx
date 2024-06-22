import React from 'react';
import { ScrollView ,View, StatusBar, Text, StyleSheet, Button } from 'react-native'
import type {MovieListProps} from '../types/app'
import MovieList from '../components/movies/MovieList'


type Props = {
  navigation: any;
};

export default function Home({ navigation }: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Movie Page</Text>
      <Button
        title="PERGI KE MOVIEDETAIL"
        onPress={() => navigation.navigate('MovieDetail')}
      />
    </View>
  );
}


  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
