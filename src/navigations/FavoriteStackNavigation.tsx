import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import MovieDetail from '../screens/MovieDetail';
import Favorite from '../screens/Favorite';


const Stack = createNativeStackNavigator();

const FavoriteStackNavigation = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen
      name="Favorite"
      component={Favorite}
      options={{ headerShown: false, title: 'Favorite' }}
    />
    <Stack.Screen
      name="MovieDetail"
      component={MovieDetail}
      options={{ headerShown: true, title: 'Movie Detail' }}
    />
  </Stack.Navigator>
);

export default FavoriteStackNavigation;
