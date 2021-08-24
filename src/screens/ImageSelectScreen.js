import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  StatusBar,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import {Context as ImageContext} from '../context/ImageContext';

const ImageSelectScreen = ({navigation}) => {
  const {addImages} = useContext(ImageContext);

  const modifyImages = images => {
    let modifiedImages = [];
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let hours = new Date().getHours();
    let min = new Date().getMinutes();
    let sec = new Date().getSeconds();
    let currentDate =
      date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;
    for (let image of images) {
      modifiedImages.push({
        height: image.height,
        width: image.width,
        mime: image.mime,
        path: image.path,
        size: image.size,
        date: currentDate,
      });
    }

    return modifiedImages;
  };

  const BrowseFiles = async () => {
    try {
      const images = await ImagePicker.openPicker({
        multiple: true,
      });

      const modifiedImages = modifyImages(images);

      if (modifiedImages.length) {
        addImages(modifiedImages);

        navigation.navigate('ImageReduce');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#293B4F" barStyle="light-content" />
      <View style={styles.component}>
        <Image
          style={styles.image}
          source={require('../../assets/imageSelect.png')}
        />
        <TouchableOpacity style={styles.button} onPress={BrowseFiles}>
          <Text style={styles.text}>Choose Images</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  component: {
    width: Dimensions.get('window').width / 1.1,
    height: Dimensions.get('window').height / 1.4,
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#3483E2',
    borderStyle: 'dashed',
    borderRadius: 12,
    backgroundColor: 'rgba(52,131,226,0.2)',
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: Dimensions.get('window').width / 2.7,
    height: Dimensions.get('window').height / 13,
    backgroundColor: '#687DDB',
    elevation: 15,
    borderRadius: 8,
  },
  text: {
    textAlign: 'center',
    fontSize: 17,
    color: 'white',
  },
});

export default ImageSelectScreen;
