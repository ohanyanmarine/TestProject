import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Camera from './components/Camera';
import ContactsList from './components';
import ActionBar from './components/Microphone'

function App() {
  return (
    <View>
      {/* <Camera /> */}
      {/* <ContactsList /> */}
      <ActionBar />
    </View>
  );
}

const styles = StyleSheet.create({});
export default App;
