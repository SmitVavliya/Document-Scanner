import createDataContext from './createDataContext';
import _ from 'lodash';
import ImageManipulator from 'react-native-photo-manipulator';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import {navigate} from '../navigationRef';
import {ToastAndroid} from 'react-native';

const ImageReducer = (state, action) => {
  switch (action.type) {
    case 'add_images':
      return {...state, images: action.payload};
    case 'show_info':
      return {...state, item: action.payload};
    default:
      return state;
  }
};

const addImages = dispatch => images => {
  dispatch({type: 'add_images', payload: images});
};

const reduceImages = dispatch => (images, value) => {
  _.each(images, async image => {
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
  });
};

const viewFile = dispatch => async file => {
  try {
    await FileViewer.open(file.path);
  } catch (err) {}
};

const selectedFile = dispatch => async item => {
  const array = item.path.split('/');
  const fileName = array[array.length - 1];

  try {
    await RNFS.mkdir(RNFS.ExternalStorageDirectoryPath + '/images/');

    const destinationPath =
      RNFS.ExternalStorageDirectoryPath + '/images/' + fileName;
    const sourcePath =
      RNFS.ExternalStorageDirectoryPath +
      '/CamScanner-Pro-India/Documents/' +
      fileName;

    await RNFS.copyFile(sourcePath, destinationPath);
  } catch (err) {
    console.log(err);
  }
};

const deselectFile = dispatch => async item => {
  try {
    const images = await RNFS.readDir(
      RNFS.ExternalStorageDirectoryPath + '/images/',
    );

    for (let image of images) {
      if (image.name.split('.')[0] === item.name.split('.')[0]) {
        RNFS.unlink(image.path);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const fetchFile = dispatch => async item => {
  try {
    const images = await RNFS.readDir(
      RNFS.ExternalStorageDirectoryPath + '/images/',
    );
    const files = await RNFS.readDir(
      RNFS.ExternalStorageDirectoryPath + '/CamScanner-Pro-India/Documents/',
    );

    let res = [];
    for (let image of images) {
      for (let file of files) {
        if (image.name.split('.')[0] === file.name.split('.')[0]) {
          res.push(file);
        }
      }
    }

    console.log(res);

    for (let file of res) {
      try {
        await RNFS.unlink(file.path);
      } catch (err) {
        console.log(err);
      }
    }

    await navigate('ImageSelect');
    await navigate('ImageList');
  } catch (err) {
    console.log(err);
  }
};

const deleteItems = dispatch => async () => {
  try {
    const res = await RNFS.readDir(
      RNFS.ExternalStorageDirectoryPath + '/images/',
    );

    const unUsedImages = await RNFS.readDir(RNFS.ExternalDirectoryPath);
    if (unUsedImages) {
      for (let image of unUsedImages) {
        if (!image.isDirectory()) {
          await RNFS.unlink(image.path);
        }
      }
    }

    if (res) {
      for (let image of res) {
        await RNFS.unlink(image.path);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const showInfo = dispatch => async item => {
  dispatch({type: 'show_info', payload: item});
};

const rename = dispatch => async (item, value) => {
  if (item.name.split('.')[1] !== 'pdf') {
    let fileName = value + '.' + item.name.split('.')[1];
    const destinationPath =
      RNFS.ExternalStorageDirectoryPath +
      '/CamScanner-Pro-India/Documents/' +
      fileName;
    const sourcePath = item.path;
    await RNFS.moveFile(sourcePath, destinationPath);
    await navigate('ImageSelect');
    await navigate('ImageList');
  } else {
    let imageName = value + '.jpg';
    let fileName = value + '.' + item.name.split('.')[1];
    const destinationImagePath =
      RNFS.ExternalDirectoryPath + '/images/' + imageName;
    const sourceImagePath = item.imageUrl;
    const destinationFilePath =
      RNFS.ExternalStorageDirectoryPath +
      '/CamScanner-Pro-India/Documents/' +
      fileName;
    const sourceFilePath = item.path;
    await RNFS.moveFile(sourceImagePath, destinationImagePath);
    await navigate('ImageSelect');
    await navigate('ImageList');
    await RNFS.moveFile(sourceFilePath, destinationFilePath);
    await navigate('ImageSelect');
    await navigate('ImageList');
  }
};

export const {Context, Provider} = createDataContext(
  ImageReducer,
  {
    addImages,
    reduceImages,
    viewFile,
    selectedFile,
    fetchFile,
    deselectFile,
    deleteItems,
    showInfo,
    rename,
  },
  {images: [], item: {}},
);
