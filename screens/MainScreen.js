
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
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground
} from 'react-native';
import MonthToNum from '../MonthsInYear'
const  headers = {'Content-Type': 'application/json',"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
import calendarPng from '../assets/calendar.png'
import mainVaccine from '../assets/mainvaccine.png'
import appBg from '../assets/appbg.png'
/*
 name , date , center_id ,block_name ,min_age_limit ,vaccine ,available_capacity ,fee ,slots[]
*/


const MainScreen = ({ navigation }) => {
    const [pincode , setPincode] = useState('')
    const [hospitalData , setHospitalData] = useState([])
    const [date , setDate]  = useState('set date')
    const[datePickerVisibility , setDatePickerVisibility] = useState(false)
    const dateHandler = (value) =>{
        const dataArray = value.split(" ")
        const dateString = `${dataArray[2]}-${MonthToNum[dataArray[1]]}-${dataArray[3]}`
        setDate(dateString)

    }

    const getData = async ()=> {
        const baseurl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`
        
        const response = await fetch(baseurl,{headers})
        const rawData = await response.json()
        const session = rawData["sessions"]
        var dataArray = []
        if(Object.entries(session).length === 0){
            setHospitalData(dataArray)
            console.log("empty")
        }  
        else{
            Object.keys(session).map((item)=>{
            const structure = {
                "name":session[item]["name"],
                "date":session[item]["date"],
                "center_id":session[item]["center_id"],
                "block_name":session[item]["block_name"],
                "min_age_limit":session[item]["min_age_limit"],
                "vaccine":session[item]["vaccine"],
                "available_capacity":session[item]["available_capacity"],
                "fee":session[item]["fee"],
                "slots":session[item]["slots"]
            }
            dataArray.push(structure)
            
        })
        setHospitalData(dataArray)
        console.log("not empty")
        }
    }
    const nextScreen = (item) =>{
        navigation.navigate('detailScreen', {item})
    }

  return (

   <View style={{display:'flex',flex:1,flexWrap:'wrap'}}>

        <View style={styles.inputContainer}>
        <TextInput placeholder="PINCODE" style ={styles.input}
            keyboardType="numeric"
            onChangeText={(value) =>(setPincode(value))}
            value={pincode}
        />
        <Image source ={mainVaccine} style={{width:45,height:45}}/>
        </View>

        <View style ={{display:'flex',flexDirection:'row' ,justifyContent:'space-around'}}>
        <TouchableOpacity style ={styles.dateContainer} onPress={() =>(setDatePickerVisibility(!datePickerVisibility))}>
        <Text style={styles.dateStyle}>{date}</Text>
        <Image source ={calendarPng} style={{width:40,height:40 ,marginRight:1}}/>
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor:"rgb(61,159,230)",width:60,borderRadius:10,justifyContent:'center'}} onPress={getData}>
        <Text style={{textAlign:'center',color:'white'}}>GO</Text>
        </TouchableOpacity>
        </View>
       
     
   
   

    {/* <Button title="choose date" onPress={() =>(setDatePickerVisibility(!datePickerVisibility))}/> */}

    {/* calander picker code */}
    <View>
        <Modal animationType = {"slide"} transparent = {false}
        visible = {datePickerVisibility}>
        <View style = {styles.modal}>
            <CalendarPicker  onDateChange = {(value) => (dateHandler(value.toString()))}/>
            <Button title="select" onPress={()=>{console.log(date) ; setDatePickerVisibility(!datePickerVisibility)}}/>
        </View>
        </Modal>
    </View>
   
    <View style={{display:'flex',width:"70%",height:300,marginLeft:'10%',marginTop:'30%',alignItems:'center',width:300}}>
        {Object.entries(hospitalData).length === 0?
        <Text style={{fontSize:20}}>no hospital found</Text>:
            <ScrollView>
                {Object.keys(hospitalData).map((item,key)=>(
                    <TouchableOpacity style={{backgroundColor:'rgb(255,165,0)',borderRadius:10,fontSize:20,marginTop:'5%',marginBottom:'5%',height:50}} key={item} onPress={()=>{nextScreen(hospitalData[item])}}>
                        <Text style={{fontSize:20,textAlign:'center',justifyContent:'center'}}>{hospitalData[item]["name"]}</Text>
                    </TouchableOpacity>
                ))}
             </ScrollView>
        }
   
   
    </View>    
    
    </View>

 
  );
};

export default MainScreen;

const styles = StyleSheet.create({
    inputContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'baseline',
        flexWrap:'wrap',
        marginLeft:20,
        marginTop:30
    },
    dateContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'baseline',
        flexWrap:'wrap',
        backgroundColor:'rgba(12,223,191,0.95)',
        width:210,
        borderRadius:10,
        paddingTop:-10
    },
    input: {
      height: 40,
      margin: 12,
      width:200,
      borderRadius:10,
      backgroundColor:'rgba(12,223,191,0.95)',
      fontSize:20,
      
    },
    dateStyle:{
        height: 40,
        margin: 12,
        width:150,
        borderRadius:10,
        backgroundColor:'rgba(12,223,191,0.95)',
        color:"black",
        fontSize:20,
        textAlign:'center',
        paddingTop:5,
        marginLeft:1,
        marginBottom:1,
        marginTop:1,
    },
    text:{
        fontSize:20
    },
     modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 100
     },
     text: {
        color: '#3f2949',
        marginTop: 10
     }
  });
  
  