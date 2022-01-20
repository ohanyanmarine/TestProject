import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Camera from './components/Camera';
import ContactsList from './components';

function App() {
  return (
    <View>
      {/* <Camera /> */}
      <ContactsList />
    </View>
  );
}

const styles = StyleSheet.create({});
export default App;
