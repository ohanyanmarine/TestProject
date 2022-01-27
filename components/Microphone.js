import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MicStream from 'react-native-microphone-stream';

/**
 * Navigational function for choosing the channel and searching for new channels
 */
export default function ActionBar() {
  const [auto, setAuto] = useState(false);
  const [recording, setRecording] = useState(false);
  const listener = MicStream.addListener((data) => console.log('data', data)); 

  MicStream.init({
    bufferSize: 4096,
    sampleRate: 44100,
    bitsPerChannel: 16,
    channelsPerFrame: 1,
  });

  function toggleRecord() {
    if (recording) {
      console.log('starting mic');
      MicStream.start();
    } else {
      console.log('stopping mic');
      MicStream.stop();
    }
  }

  useEffect(() => {
    return () => listener.remove();
  }, []);

  useEffect(() => {
    toggleRecord();
  }, [recording]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {
        setAuto(!auto);
        console.log('recordong', recording)
        console.log('auto', auto);
        }}>
        <Text style={styles.autoFadeButton}>Auto.</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.microphoneButtonBroadcasting}
        onPress={() => setRecording(!recording)}
      >
        <Icon
          name="microphone-outline"
          size={40}
          color={recording ? '#B52C55' : 'grey'}
        />
        <Text style={styles.autoFadeButton}>rec</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon
          style={[{ transform: [{ scaleX: 2 }, { scaleY: 0.8 }] }]}
          name="chevron-down"
          size={40}
          color="white"
        />
        <Text style={styles.autoFadeButton}>chevron-down</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      //flex: 0.1,
     // height: 5,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 4,
      paddingHorizontal: 16,
      backgroundColor: 'black',
      paddingHorizontal: 32,
    },
    autoFadeButton: {
      color: 'white',
      textAlignVertical: 'center',
      alignSelf: 'center',
    },
    microphoneButton: {
      flexDirection: 'row',
      color: '#B52C55',
    },
  });
  