import React, { useState } from 'react';
import { View, TouchableOpacity, Switch, StatusBar, Text, NativeModules, PermissionsAndroid } from 'react-native'
import NavigationBar from 'react-native-navbar-color'

const DirectSms = NativeModules.DirectSms;

const App = () => {

  const [isLightTheme, setIsLightTheme] = useState(false);
  const toggleSwitch = () => setIsLightTheme(previousState => !previousState);

  const sendDirectSms = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.SEND_SMS,
            {
                title: 'Tadiwanashe App Sms Permission',
                message:
                    'Tadiwanashe App needs access to your inbox ' +
                    'so you can send messages in background.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            for (let i = 0; i < 5; i++) {
              DirectSms.sendDirectSms('0695869890', 'This is a direct message from your app.');
            }
        } else {
            console.log('SMS permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: isLightTheme ? "white" : "#36393f"}}>
        <StatusBar barStyle={isLightTheme ? "dark-content" : "light-content"} backgroundColor={isLightTheme ? "white" : "#36393f"}/>
        {NavigationBar.setColor(isLightTheme ? '#f5f5f5' :'#202225')}
        <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: "#36393f", fontSize: 16}}>Thème clair</Text>
          <Switch
            trackColor={{false: "#0F4C81", true: "#0F4C81"}}
            thumbColor={isLightTheme ? "white" : "white"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isLightTheme}/>
          <Text style={{color: "white", fontSize: 16}}>Thème sombre</Text>
        </View>
        <View style={{flex: 9, justifyContent: "center", alignItems: "center"}}>
          <TouchableOpacity style={{backgroundColor: "#0F4C81", paddingHorizontal: 40, paddingVertical: 10, borderRadius: 10}} onPress={() => sendDirectSms()}>
            <Text style={{fontSize: 20, color: "white"}}>Envoyer SMS</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default App;

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#bbb',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */
