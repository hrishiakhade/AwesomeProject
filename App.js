/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import Toast, {DURATION} from 'react-native-easy-toast';

import React, { Component } from 'react';
import {

  Text,
  View,
  List,
  Left,Right
} from 'native-base';

import { Picker,Button,TextInput,Keyboard} from 'react-native';

export default class App extends Component<{}> {
constructor(props){
  super(props);
  //this.handleChange = this.handleChange.bind(this);
     //   this.handleSubmit = this.handleSubmit.bind(this);
  this.state={
        PickerValue:'',
        Data:'',
        email:''
  }
} ; 
submit=()=>{
  var data=this.state.PickerValue;
  if(data=="" || this.state.Data=="" || this.state.email==""){
    alert("Please Fill the Complete Form");
  }
  else{
    Keyboard.dismiss();
this.refs.toast.show('Data Saved in '+data, 500);
const info = {
table: data,
Inforamtion:this.state.Data,
Email:this.state.email
};
fetch("https://hooks.zapier.com/hooks/catch/2832603/8mza3m/", {method: "POST", body: JSON.stringify(info)})
        .then((response) => response.json())
        .then((responseData) => {
            //alert(
           //     "POST Response",
           //     "Response Body -> " + JSON.stringify(info)
           // )
        })
        .done();

  }
}
  render() {
    return (


      <View style={{flex:1, justifyContent: 'center', alignItems:'center',backgroundColor: '#F5FCFF'}}>
       
       
                <Picker 
                  style={{width:'50%'}}
                  selectedValue={this.state.PickerValue}
                  onValueChange={(itemValue,itemIndex)=> this.setState({PickerValue : itemValue})}
                  >
                  <Picker.Item label="Select a Table " value=""/>
                    <Picker.Item label='Article' value='Article'/>
                    <Picker.Item label='Author' value="Author"/>

                </Picker>

                <TextInput 
                style={{
                  height:50,
                  width:250,
                  fontSize:15,
                  
                  color:'black',
                  textAlign:'center'
                
                }}
                
                  onChangeText={(Data) => this.setState({Data})}
        value={this.state.Data}
                placeholder="Fill the Data "></TextInput>


                 <TextInput 
                style={{
                  height:50,
                  width:250,
                  fontSize:15,
                
                  color:'black',
                  textAlign:'center'
               
                }}
                
                  onChangeText={(email) => this.setState({email})}
        value={this.state.email}
                placeholder="Enter email Address "></TextInput>


                

                
           

                <Button  title="Submit" onPress={this.submit} />
       
        <Toast ref="toast" position='bottom'/>
      </View>
    );
  }
}

;
