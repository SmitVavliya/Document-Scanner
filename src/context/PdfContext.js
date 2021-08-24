import createDataContext from './createDataContext';
import _ from 'lodash';
import RNFS from 'react-native-fs';
import PDFLib, {PDFDocument, PDFPage} from 'react-native-pdf-lib';
import {getImageDimensions} from '../functions/imageDimensions';
import {navigate} from '../navigationRef';
import {ToastAndroid} from 'react-native';

const PdfGenerate = (state, action) => {
  switch (action.type) {
    case 'add_images':
      return {...state, images: action.payload};
    case 'pdf_list':
      return {...state, PdfsList: action.payload};
    case 'pdf_image':
      return {...state, PdfImages: action.payload};
    default:
      return state;
  }
};

const addImages = dispatch => images => {
  dispatch({type: 'add_images', payload: images});
};

const generatePdf = dispatch => async images => {
  try {
    const path = images[0].path
      .split('/')
      .slice(3)
      .join('/');

    const Images = await _.map(images, image => {
      if (image.mime === 'image/jpeg') {
        return {
          mime: 'image/jpg',
          height: image.height,
          width: image.width,
          path: image.path,
          size: image.size,
        };
      }
      return image;
    });

    const {height, width, x, y} = getImageDimensions(
      Images[0].height,
      Images[0].width,
    );

    const page = PDFPage.create()
      .setMediaBox(250, 350)
      .drawImage(path, Images[0].mime.split('/')[1], {
        x: x,
        y: y,
        width: width,
        height: height,
      });

    const docsDir = await PDFLib.getDocumentsDirectory();
    const pdfPath = `${docsDir}/sample.pdf`;

    let newImages = [];
    for (let i = 1; i < Images.length; i++) {
      newImages.push(Images[i]);
    }

    try {
      await _.each(newImages, async image => {
        try {
          const res = await PDFDocument.create(pdfPath)
            .addPages(page)
            .write();

          const {height, width, x, y} = getImageDimensions(
            image.height,
            image.width,
          );

          const path = image.path
            .split('/')
            .slice(3)
            .join('/');

          let type = image.mime.split('/')[1];
          const newPage = PDFPage.create()
            .setMediaBox(250, 350)
            .drawImage(path, type, {
              x: x,
              y: y,
              width: width,
              height: height,
            });

          await PDFDocument.modify(res)
            .addPage(newPage)
            .write();
        } catch (err) {}
      });

      const name = `${Math.floor(Math.random() * 100000000)}.pdf`;

      try {
        await RNFS.mkdir(
          RNFS.ExternalStorageDirectoryPath + '/CamScanner-Pro-India/Pdfs',
        );
      } catch (err) {}

      const destinationPath =
        RNFS.ExternalStorageDirectoryPath +
        '/CamScanner-Pro-India/Pdfs/' +
        name;
      const sourcePath = `/data/user/0/com.image_reducer/files/sample.pdf`;

      try {
        await RNFS.moveFile(sourcePath, destinationPath);
      } catch (err) {}
    } catch (err) {
      console.log(err);
    }

    ToastAndroid.show(`Your Pdf will be generated.`, ToastAndroid.SHORT);
  } catch (err) {
    console.log(err);
  }
};

const pdfList = dispatch => async () => {
  try {
    const res = await RNFS.readDir(
      RNFS.ExternalStorageDirectoryPath + '/CamScanner-Pro-India/Documents/',
    );

    dispatch({type: 'pdf_list', payload: res});
  } catch (err) {}
};

const imageForPdf = dispatch => async () => {
  try {
    const res = await RNFS.readDir(RNFS.ExternalDirectoryPath + '/images/');

    dispatch({type: 'pdf_image', payload: res});
  } catch (err) {}
};

const deleteItems = dispatch => async () => {
  try {
    const res = await RNFS.readDir(
      RNFS.ExternalStorageDirectoryPath + '/CamScanner-Pro-India/Documents/',
    );
    if (res) {
      for (let image of res) {
        await RNFS.unlink(image.path);
      }
    }

    await navigate('ImageSelect');
    await navigate('ImageList');
  } catch (err) {
    console.log(err);
  }
};

export const {Context, Provider} = createDataContext(
  PdfGenerate,
  {addImages, generatePdf, pdfList, imageForPdf, deleteItems},
  {images: [], PdfsList: [], PdfImages: []},
);
