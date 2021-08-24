import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Dimensions, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Menu from '../components/Menu';
import CheckBox from '@react-native-community/checkbox';
import _ from 'lodash';

const RenderImage = ({
  item,
  viewFile,
  selectedFile,
  deselectFile,
  refRBSheet,
}) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);

  const imageName = image => {
    const array = image.split('/');
    return array[array.length - 1];
  };

  const imageSize = image => {
    const size = (image * 0.001).toFixed(2) + ' KB';
    return size;
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.outerContainer}>
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => viewFile(item)}>
            {item.name.split('.')[1] === 'pdf' ? (
              <Image
                source={{
                  uri: `file:///${item.imageUrl}`,
                }}
                style={styles.image}
              />
            ) : (
              <Image
                source={{
                  uri: `file:///${item.path}`,
                }}
                style={styles.image}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity
            onLongPress={() => {
              setShow(true);
              setSelected(false);
            }}
            onPress={() => {
              setShow(false);
              setSelected(false);
              deselectFile(item);
            }}>
            <View style={styles.innerContainer}>
              <Text numberOfLines={3} style={styles.text}>
                {imageName(item.path)}
              </Text>
            </View>
            <View style={styles.belowContainer}>
              <Text style={styles.itemSize}>{imageSize(item.size)}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.bottomContainer}>
            <Menu item={item} refRBSheet={refRBSheet} />
            {show ? (
              <CheckBox
                value={selected}
                onValueChange={value => {
                  setSelected(value);
                  if (value) {
                    selectedFile(item);
                  } else {
                    deselectFile(item);
                  }
                }}
              />
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  outerContainer: {
    height: Dimensions.get('window').height / 6,
    width: Dimensions.get('window').width / 1.03,
    borderColor: 'white',
    borderWidth: 2,
    elevation: 5,
    backgroundColor: 'white',
    shadowColor: '#1F54C3',
    shadowRadius: 10,
    shadowOpacity: 1,
    borderRadius: 4,
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  leftContainer: {
    justifyContent: 'center',
  },
  image: {
    height: Dimensions.get('window').height / 7,
    width: Dimensions.get('window').width / 3,
    borderColor: 'black',
    borderWidth: 0.1,
  },
  rightContainer: {
    width: Dimensions.get('window').width / 1.6,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  innerContainer: {
    justifyContent: 'flex-start',
  },
  belowContainer: {
    flexDirection: 'row',
  },
  bottomContainer: {
    justifyContent: 'space-around',
  },
  text: {
    height: Dimensions.get('window').height / 10,
    width: Dimensions.get('window').width / 1.95,
    textAlignVertical: 'center',
    marginLeft: 10,
    marginRight: 5,
  },
  itemSize: {
    marginHorizontal: 10,
    color: 'grey',
    fontSize: 12,
  },
});

export default RenderImage;
