import React from 'react';
import {View, StyleSheet, Text, Dimensions, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';

const RenderImage = ({item, progress, show}) => {
  const imageName = image => {
    const array = image.split('/');
    return array[array.length - 1];
  };

  console.log(item);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.outerContainer}>
        <View style={styles.leftContainer}>
          <TouchableOpacity>
            <Image
              source={{
                uri: item.path,
              }}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.text}>{imageName(item.path)}</Text>
          </View>
          <View style={{marginLeft: 10}}>
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
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  outerContainer: {
    height: Dimensions.get('window').height / 6,
    width: Dimensions.get('window').width - 20,
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
  },
  text: {
    height: Dimensions.get('window').height / 10,
    width: Dimensions.get('window').width / 1.8,
    textAlignVertical: 'center',
    marginLeft: 10,
  },
  image: {
    height: Dimensions.get('window').height / 7,
    width: Dimensions.get('window').width / 3,
    borderRadius: 4,
  },
});

export default RenderImage;
