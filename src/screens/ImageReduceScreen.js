import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import {Context as ImageContext} from '../context/ImageContext';
import RenderImages from '../components/RenderImages';
import RNPickerSelect from 'react-native-picker-select';

const ImageReduceScreen = ({navigation}) => {
  const [value, setValue] = useState(10);
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  const {
    state: {images},
    reduceImages,
  } = useContext(ImageContext);

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#293B4F" />
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
            reduceImages(images, value);
            setShow(true);
            setInterval(() => {
              setProgress(progress + 25);
            }, 5);
          }}>
          <Text style={styles.buttonText}>Reduce Images</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <RenderImages item={item} progress={progress} show={show} />
        )}
        keyExtractor={image => image.path}
      />
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
    width: Dimensions.get('window').width - 20,
    elevation: 5,
    backgroundColor: 'white',
    shadowColor: '#1F54C3',
    shadowRadius: 10,
    shadowOpacity: 1,
    borderRadius: 4,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: Dimensions.get('window').width / 2.7,
    height: Dimensions.get('window').height / 13,
    backgroundColor: '#3DB24B',
    elevation: 5,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
  },
  buttonText: {
    textAlignVertical: 'center',
    fontSize: 17,
    color: 'white',
  },
});

export default ImageReduceScreen;
