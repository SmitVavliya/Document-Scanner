import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {Context as CameraContext} from '../context/CameraContext';
import RNPickerSelect from 'react-native-picker-select';
import * as Progress from 'react-native-progress';

const {width, height} = Dimensions.get('window');

const CameraImageReduceScreen = ({navigation}) => {
  const [value, setValue] = useState(10);
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  const {
    state: {cameraImage},
    reduceImage,
  } = useContext(CameraContext);

  const imageName = image => {
    const array = image.split('/');
    return array[array.length - 1];
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#293B4F" barStyle="light-content" />
      <ImageBackground
        source={require('../../assets/imageSelect.png')}
        style={{width: '100%', height: '100%'}}>
        <View style={styles.bottomBox}>
          <RNPickerSelect
            onValueChange={value => setValue(value)}
            items={[
              {label: 'Reduce the size of the image 20 (%)', value: 40},
              {label: 'Reduce the size of the image 40 (%)', value: 30},
              {label: 'Reduce the size of the image 60 (%)', value: 20},
              {label: 'Reduce the size of the image 80 (%)', value: 10},
              {label: 'Reduce the size of the image 100 (%)', value: 5},
            ]}
            placeholder={{label: 'Reduce (%)', value: null}}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              reduceImage(cameraImage, value);
              setShow(true);
              setInterval(() => {
                setProgress(progress + 25);
              }, 5);
            }}>
            <Text style={styles.buttonText}>Reduce Image</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.outerContainer}>
            <View style={styles.leftContainer}>
              <TouchableOpacity>
                <Image
                  source={{
                    uri: cameraImage.path,
                  }}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.rightContainer}>
              <View style={styles.innerContainer}>
                <Text style={styles.text}>{imageName(cameraImage.path)}</Text>
              </View>
              <View style={styles.progressBar}>
                {show === true ? (
                  <Progress.Bar
                    progress={progress}
                    width={Dimensions.get('window').width / 1.9}
                    unfilledColor="#F2F6FF"
                    animationType="timing"
                  />
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBox: {
    height: Dimensions.get('window').height / 13,
    width: width - 20,
    elevation: 5,
    backgroundColor: 'white',
    shadowColor: '#1F54C3',
    shadowRadius: 10,
    shadowOpacity: 1,
    borderRadius: 4,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: Dimensions.get('window').width / 2.7,
    height: Dimensions.get('window').height / 13,
    backgroundColor: '#3DB24B',
    elevation: 5,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlignVertical: 'center',
    fontSize: 17,
    color: 'white',
  },
  mainContainer: {
    flex: 1,
  },
  outerContainer: {
    height: Dimensions.get('window').height / 6,
    width: width - 20,
    borderColor: 'white',
    borderWidth: 2,
    elevation: 5,
    backgroundColor: 'white',
    shadowColor: '#1F54C3',
    shadowRadius: 10,
    shadowOpacity: 1,
    borderRadius: 4,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  leftContainer: {
    justifyContent: 'center',
  },
  rightContainer: {
    width: Dimensions.get('window').width / 1.6,
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  text: {
    height: Dimensions.get('window').height / 10,
    width: Dimensions.get('window').width / 1.8,
    textAlignVertical: 'center',
  },
  image: {
    height: Dimensions.get('window').height / 7,
    width: Dimensions.get('window').width / 3,
    borderRadius: 4,
  },
  progressBar: {
    marginHorizontal: 10,
  },
});

export default CameraImageReduceScreen;
