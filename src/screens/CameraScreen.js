import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import RNFS from 'react-native-fs';
import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Share from 'react-native-share';
import ImagePicker from 'react-native-image-crop-picker';
import RNGeniusScan from '@thegrizzlylabs/react-native-genius-scan';
import {navigate} from '../navigationRef';
RNGeniusScan.setLicenceKey(
  '533c500657560901045d035439525a0e4a0a5f0553536e4b07524105524a6f015407545b0a060e0057',
);

const CameraScreen = () => {
  const onlyFileName = url => {
    const array = url.split('/');
    const lastElement = array[array.length - 1];
    return lastElement.split('.')[0];
  };

  const fileNameWithExtension = url => {
    const array = url.split('/');
    return array[array.length - 1];
  };

  const scanning = async () => {
    try {
      const configuration = {
        source: 'camera',
        defaultFlashMode: 'on',
      };

      const result = await RNGeniusScan.scanWithConfiguration(configuration);
      console.log(result);

      const pdfFileName = onlyFileName(result.pdfUrl);
      const image = fileNameWithExtension(result.scans[0].enhancedUrl);

      await RNFS.mkdir(RNFS.ExternalDirectoryPath + '/images/');
      const destPath =
        RNFS.ExternalDirectoryPath + '/images/' + pdfFileName + '.jpg';
      const srcPath = RNFS.ExternalDirectoryPath + '/' + image;

      await RNFS.moveFile(srcPath, destPath);

      await RNFS.mkdir(
        RNFS.ExternalStorageDirectoryPath + '/CamScanner-Pro-India/Documents/',
      );

      const array = result.pdfUrl.split('/');
      const fileName = array[array.length - 1];

      const destinationPath =
        RNFS.ExternalStorageDirectoryPath +
        '/CamScanner-Pro-India/Documents/' +
        fileName;
      const sourcePath = RNFS.ExternalDirectoryPath + '/' + fileName;

      await RNFS.moveFile(sourcePath, destinationPath);

      const shareOptions = {url: 'file:///' + destinationPath};
      await Share.open(shareOptions);
    } catch (err) {
      console.log(err);
    }
  };

  const importing = async () => {
    try {
      const Images = await ImagePicker.openPicker({
        multiple: true,
      });

      for (let item of Images) {
        const configuration = {
          source: 'image',
          multiPage: true,
          sourceImageUrl: item.path,
          pdfPageSize: 'a4',
        };

        const result = await RNGeniusScan.scanWithConfiguration(configuration);
        console.log(result);

        const pdfFileName = onlyFileName(result.pdfUrl);
        const image = fileNameWithExtension(result.scans[0].enhancedUrl);

        await RNFS.mkdir(RNFS.ExternalDirectoryPath + '/images/');
        const destPath =
          RNFS.ExternalDirectoryPath + '/images/' + pdfFileName + '.jpg';
        const srcPath = RNFS.ExternalDirectoryPath + '/' + image;

        await RNFS.moveFile(srcPath, destPath);

        await RNFS.mkdir(
          RNFS.ExternalStorageDirectoryPath +
            '/CamScanner-Pro-India/Documents/',
        );

        const array = result.pdfUrl.split('/');
        const fileName = array[array.length - 1];

        const destinationPath =
          RNFS.ExternalStorageDirectoryPath +
          '/CamScanner-Pro-India/Documents/' +
          fileName;
        const sourcePath = RNFS.ExternalDirectoryPath + '/' + fileName;

        await RNFS.moveFile(sourcePath, destinationPath);
      }

      navigate('ImageList');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <StatusBar backgroundColor="#293B4F" barStyle="light-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <View>
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.firstContainer}
                onPress={scanning}>
                <Icon name="camera" size={30} />
                <Text style={styles.buttonText}>Start Scanning</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondContainer}
                onPress={importing}>
                <Icon name="file-image" size={30} />
                <Text style={styles.buttonText}>Import Files</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  controls: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  firstContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlignVertical: 'center',
    fontSize: 14,
    color: 'black',
    marginTop: 5,
  },
});

export default CameraScreen;

// const res = await RNPdfToImage.convert(
//   'file:////storage/emulated/0/CamScanner-Pro-India/Documents/1571043876303_DE_CONTINUOUS ASSESSMENT CARD_FORMAT_1.pdf',
// );
// console.log(res);
// console.log(RNFS.CachesDirectoryPath);
// await RNFS.mkdir(RNFS.ExternalDirectoryPath + '/Pdf-to-Image/');

// for (let file of res.outputFiles) {
//   const destpath =
//     RNFS.ExternalDirectoryPath +
//     '/Pdf-to-Image/' +
//     fileNameWithExtension(file);
//   const srcpath =
//     RNFS.CachesDirectoryPath + '/' + fileNameWithExtension(file);

//   await RNFS.moveFile(srcpath, destpath);
// }
