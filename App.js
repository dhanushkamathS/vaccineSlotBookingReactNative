
import React , {useState ,useEffect}from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from 'react-native-modal';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableHighlight,
} from 'react-native';

import MainScreen from './screens/MainScreen'
import DetailScreen from './screens/DetailScreen'

const Stack = createStackNavigator();

const App = () =>{

 return(
  <NavigationContainer>
  <Stack.Navigator screenOptions={{  headerShown: false }} 
>
    <Stack.Screen
      name="Home"
      component={MainScreen}
    />
    <Stack.Screen name="detailScreen" component={DetailScreen} />
  </Stack.Navigator>
</NavigationContainer>
 )

}




export default App;
