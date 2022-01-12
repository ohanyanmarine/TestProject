import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';

function Camera() {
  // ImagePicker.openCamera({
  //   width: 300,
  //   height: 400,
  //   //cropping: true,
  // }).then(image => {
  //   console.log('image ', image);
  //   var formdata = new FormData();
  //   formdata.append('file_url', {
  //     uri: image.path,
  //     type: 'image/jpeg',
  //     name: image.mime,
  //   });
  //
  //   var requestOptions = {
  //     method: 'POST',
  //     body: formdata,
  //     redirect: 'follow',
  //   };

  //   fetch('https://bc-api.annaniks.com/files/files-object/', requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log('result', result))
  //     .catch(error => console.log('error', error));
  // });

  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
  }).then(image => {
    console.log(image);
    var formdata = new FormData();
    formdata.append('file_url', {
      uri: image.path,
      type: 'image/jpeg',
      name: image.mime,
    });

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://bc-api.annaniks.com/files/files-object/', requestOptions)
      .then(response => response.text())
      .then(result => console.log('result', result))
      .catch(error => console.log('error', error));
  });

  let camera = useRef();
  let takePicture = async () => {
    if (camera) {
      const options = {quality: 0.5, base64: true};
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);

      var formdata = new FormData();
      formdata.append('file_url', {
        uri: data.uri,
        type: 'image/jpeg',
        name: 'image.jpeg',
      });

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch('https://bc-api.annaniks.com/files/files-object/', requestOptions)
        .then(response => response.text())
        .then(result => console.log('result', result))
        .catch(error => console.log('error', error));
    }
  };

  return (
    <View style={styles.container}>
      {/* <RNCamera
        style={{flex: 1, alignItems: 'center'}}
        ref={ref => {
          camera = ref;
        }}
      />
      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity onPress={takePicture} style={styles.capture}>
          <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
export default Camera;
