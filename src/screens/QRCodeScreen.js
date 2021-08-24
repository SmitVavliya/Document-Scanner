import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  StatusBar,
} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {QRscanner} from 'react-native-qr-scanner';

const QRCodeScreen = ({navigation}) => {
  const [flashMode, setFlashMode] = useState(false);
  const [zoom, setZoom] = useState(0.2);
  const [info, setInfo] = useState({});

  const gotoLink = () => {
    let originalurl;
    if (
      info.data.split('/')[0] === 'https:' ||
      info.data.split('/')[0] === 'http:'
    ) {
      originalurl = info.data;
    } else {
      originalurl = 'https://' + info.data;
    }

    setInfo({});
    return Linking.openURL(originalurl);
  };

  const bottomView = () => {
    return (
      <View style={{flex: 1, backgroundColor: '#0000004D'}}>
        <NavigationEvents
          onWillFocus={() => {
            setInfo({});
          }}
        />
        {info.data ? (
          <Text
            style={{
              color: 'orange',
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
            }}
            onPress={gotoLink}>
            {info.data}
          </Text>
        ) : null}
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          onPress={() => setFlashMode(!flashMode)}>
          <Text style={{color: '#fff'}}>
            Click me to turn on/off flashlight
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onRead = res => {
    setInfo(res);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#293B4F" barStyle="light-content" />
      <QRscanner
        onRead={onRead}
        renderBottomView={bottomView}
        flashMode={flashMode}
        zoom={zoom}
        finderY={50}
        isRepeatScan={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default QRCodeScreen;
