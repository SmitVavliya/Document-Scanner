import createDataContext from './createDataContext';
import _ from 'lodash';
import ImageManipulator from 'react-native-photo-manipulator';
import RNFS from 'react-native-fs';
import {ToastAndroid} from 'react-native';

const CameraReducer = (state, action) => {
  switch (action.type) {
    case 'add_image':
      return {...state, cameraImage: action.payload};
    default:
      return state;
  }
};

const addImage = dispatch => image => {
  dispatch({type: 'add_image', payload: image});
};

const reduceImage = dispatch => async (image, value) => {
  try {
    const path = await ImageManipulator.optimize(image.path, value);

    const array = path.split('/');
    const fileName = array[array.length - 1];

    try {
      await RNFS.mkdir(
        RNFS.ExternalStorageDirectoryPath + '/CamScanner-Pro-India/Documents',
      );
    } catch (err) {}

    const destinationPath =
      RNFS.ExternalStorageDirectoryPath +
      '/CamScanner-Pro-India/Documents/' +
      fileName;
    const sourcePath = RNFS.CachesDirectoryPath + '/' + fileName;

    try {
      await RNFS.moveFile(sourcePath, destinationPath);
    } catch (err) {}

    ToastAndroid.show(`Your images will be reduced.`, ToastAndroid.SHORT);
  } catch (err) {}
};

export const {Context, Provider} = createDataContext(
  CameraReducer,
  {addImage, reduceImage},
  {cameraImage: {}},
);
