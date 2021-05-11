
import React , {useState ,useEffect,useCallback}from 'react';
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
  Alert,
  Linking,
  ImageBackground
} from 'react-native';
import infoBg from '../assets/info.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
const supportedURL = "https://selfregistration.cowin.gov.in/";


    const handlePress = async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(supportedURL);
       
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(supportedURL);
      } else {
        Alert.alert(`Don't know how to open this URL: ${supportedURL}`);
      }
    }
  

    // <Button title={children} onPress={handlePress} />;


const DetailScreen = ({ navigation, route }) => {
    
   return(
    <ImageBackground source={infoBg} style={{width:'100%',height:'100%',display:'flex',flex:1}}>
        <View style={{display:'flex'}}>
           <Text style={{backgroundColor:'white',width:250,height:50,borderRadius:10,textAlign:'center',marginLeft:"17%",marginTop:'7%',fontSize:20}}>{route.params.item["name"]}</Text> 
            
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',marginTop:'8%'}}>
           <Text style={{backgroundColor:'white',fontSize:20,borderRadius:10,width:120,height:30}}>{route.params.item["date"]}</Text> 
           <Text style={{backgroundColor:'white',fontSize:20,borderRadius:10}}>{route.params.item["center_id"]}</Text>  
            </View>
        </View>
        
        <View style={{display:'flex',marginTop:"25%"}}>
        <Text style={styles.mainBlock}>{route.params.item["block_name"]}</Text>
        <Text style={styles.mainBlock}>age : {route.params.item["min_age_limit"]}</Text>
        <Text style={styles.mainBlock}>fee : {route.params.item["fee"]}</Text>
        </View>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',marginTop:'-35%',height:35}}>
        <Text style={styles.secondBlock}>{route.params.item["vaccine"]}</Text>
        <Text style={{backgroundColor:'rgb(102,102,255)',width:"20%",borderRadius:10,textAlign:'center',fontSize:20}}>{route.params.item["available_capacity"]}</Text>
        </View>

        <View style={{display:'flex',marginTop:"25%"}}>
            <TouchableOpacity onPress={handlePress}>
             <Text style={{backgroundColor:"rgb(255,165,0)",height:40,width:300,borderRadius:10,fontSize:20,textAlign:'center',marginLeft:40}}>BOOK YOUR SLOT!!</Text>
            </TouchableOpacity>
        </View>
    
    </ImageBackground>
  
   )
  };

export default DetailScreen;

const styles = StyleSheet.create({
    mainBlock:{
        backgroundColor:'rgb(102,102,255)',
        width:"56%",height:'11%',
         fontSize:20,
         textAlign:'center',
         borderRadius:10,
         justifyContent:'space-between',
         marginLeft:10,
         marginBottom:10
        },
        secondBlock:{
        backgroundColor:'rgb(102,102,255)',
        width:"56%",
        height:"100%",
         fontSize:20,
         textAlign:'center',
         borderRadius:10,
         marginLeft:-18
        }
})