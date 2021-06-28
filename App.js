import React, { useState } from 'react';
import { View, TouchableOpacity, Switch, StatusBar, TextInput, Text, NativeModules, PermissionsAndroid, SafeAreaView } from 'react-native'
import NavigationBar from 'react-native-navbar-color'

const DirectSms = NativeModules.DirectSms;

const App = () => {

  const [isLightTheme, setIsLightTheme] = useState(false);
  const toggleSwitch = () => setIsLightTheme(previousState => !previousState);

  const [messageText, setMessageText] = useState('');

  const sendDirectSms = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.SEND_SMS,
            {
                title: 'Application SMS permission',
                message:
                    "L'application souhaite acceder à vos SMS " +
                    'pour pouvoir envoyer des messages en arrière plan.',
                buttonNeutral: 'Me demander plus tard',
                buttonNegative: 'Annuler',
                buttonPositive: 'Ok',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            for (let i = 0; i < 1; i++) {
              await DirectSms.sendDirectSms('0695869890', messageText, (status) => {console.log('Le message envoyé:', status)});
            }
        } else {
            console.log('SMS permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: isLightTheme ? "white" : "#36393f"}}>
        <StatusBar barStyle={isLightTheme ? "dark-content" : "light-content"} backgroundColor={isLightTheme ? "white" : "#36393f"}/>
        {NavigationBar.setColor(isLightTheme ? '#f5f5f5' :'#202225')}
        <View style={{marginTop: 30, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: "#36393f", fontSize: 16, fontWeight: 'bold'}}>Thème clair</Text>
          <Switch
            trackColor={{false: "#0F4C81", true: "#0F4C81"}}
            thumbColor={isLightTheme ? "white" : "white"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isLightTheme}/>
          <Text style={{color: "white", fontSize: 16, fontWeight: 'bold'}}>Thème sombre</Text>
        </View>
        <View style={{flex: 10, justifyContent: "center", alignItems: "center"}}>
        <TextInput
          selectionColor={"#0F4C81"}
          style={{
            height: 40,
            marginBottom: 30,
            width: '80%',
            margin: 12,
            borderWidth: 1.5,
            borderRadius: 5,
            paddingHorizontal: 10,
            borderColor: isLightTheme ? "#36393f" : "white"
          }}
          onChangeText={(text) => setMessageText(text)}
          value={messageText}
          placeholderTextColor={isLightTheme ? "grey" : "#D3D3D3"}
          placeholder="Entrez le message"/>
          <TouchableOpacity style={{backgroundColor: "#0F4C81", paddingHorizontal: 40, paddingVertical: 10, borderRadius: 10}} onPress={() => sendDirectSms()}>
            <Text style={{fontSize: 20, color: "white", fontWeight: 'bold'}}>Envoyer SMS</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
};

export default App;