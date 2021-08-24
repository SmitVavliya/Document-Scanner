import React, {useContext, useRef, useState, useEffect} from 'react';
import {NavigationEvents} from 'react-navigation';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
  PermissionsAndroid,
  Image,
  LogBox,
} from 'react-native';
import {Context as ImageContext} from '../context/ImageContext';
import {Context as PdfContext} from '../context/PdfContext';
import List from '../components/List';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const ImageListScreen = ({navigation}) => {
  const {
    state: {item},
    viewFile,
    selectedFile,
    deselectFile,
    deleteItems,
    rename,
  } = useContext(ImageContext);

  const [value, setValue] = useState('');
  const [granted, setGranted] = useState(false);
  const [denied, setDenied] = useState(false);

  const {
    state: {PdfsList, PdfImages},
    pdfList,
    imageForPdf,
  } = useContext(PdfContext);

  const refRBSheet = useRef();

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setGranted(true);
      }

      if (granted === PermissionsAndroid.RESULTS.DENIED) {
        setDenied(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    requestStoragePermission();
  }, []);

  let pdfs = [];
  for (let pdf of PdfsList) {
    if (pdf.name.split('.')[1] === 'pdf') {
      for (let image of PdfImages) {
        if (pdf.name.split('.')[0] === image.name.split('.')[0]) {
          pdfs.push({
            imageUrl: image.path,
            size: pdf.size,
            name: pdf.name,
            path: pdf.path,
          });
        }
      }
    } else {
      pdfs.push(pdf);
    }
  }

  const renderContent = () => {
    return (
      <View>
        <Text style={styles.renameText}>Document Name</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon name="document-outline" size={30} />
          <Text style={{marginHorizontal: 10}}>{item.name}</Text>
        </View>
        <Text style={styles.renameText}>Rename</Text>
        <TextInput
          value={value}
          autoFocus
          onChangeText={value => setValue(value)}
          style={styles.renameInput}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              refRBSheet.current.close();
              if (value !== '') {
                rename(item, value);
              }
              setValue('');
            }}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#293B4F" />
      <NavigationEvents
        onWillFocus={() => {
          pdfList();
          imageForPdf();
          deleteItems();
        }}
      />
      {granted ? (
        <View>
          {pdfs.length ? (
            <View>
              <FlatList
                data={pdfs}
                renderItem={({item}) => (
                  <List
                    item={item}
                    viewFile={viewFile}
                    selectedFile={selectedFile}
                    deselectFile={deselectFile}
                    refRBSheet={refRBSheet}
                  />
                )}
                keyExtractor={image => image.path}
              />
              <RBSheet
                ref={refRBSheet}
                height={230}
                openDuration={50}
                customStyles={{
                  container: {
                    paddingHorizontal: 20,
                  },
                }}
                animationType="slide">
                {renderContent()}
              </RBSheet>
            </View>
          ) : (
            <View>
              <Image
                source={require('../../assets/bg_main_empty_doc.png')}
                style={{width: 210, height: 270}}
              />
            </View>
          )}
        </View>
      ) : null}
      {denied ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: Dimensions.get('window').height / 1.2,
            marginHorizontal: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              fontSize: 16,
              color: 'grey',
            }}>
            You need to give permission to access your internal storage to parse
            how many media files are in your storage.
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  renameText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#0fc5a4',
    marginVertical: 10,
  },
  renameInput: {
    fontSize: 16,
    borderBottomColor: 'green',
    borderBottomWidth: 2,
  },
  buttonContainer: {
    height: 60,
    width: width - 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  button: {
    height: 40,
    width: 80,
    backgroundColor: 'green',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ImageListScreen;
