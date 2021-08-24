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
import {Context as PdfContext} from '../context/PdfContext';
import _ from 'lodash';

const PdfSelectScreen = ({navigation}) => {
  const {addImages} = useContext(PdfContext);

  const BrowsePdfs = async () => {
    try {
      const images = await ImagePicker.openPicker({
        multiple: true,
      });

      if (images.length) {
        addImages(images);

        navigation.navigate('PdfGenerate');
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
        <TouchableOpacity style={styles.button} onPress={BrowsePdfs}>
          <Text style={styles.text}>Choose Pages</Text>
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

export default PdfSelectScreen;
