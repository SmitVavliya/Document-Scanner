import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Text,
  Modal,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import {Context as PdfContext} from '../context/PdfContext';
import RenderImages from '../components/RenderImages';

const PdfGenerateScreen = ({navigation}) => {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    state: {images},
    generatePdf,
  } = useContext(PdfContext);

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#293B4F" barStyle="light-content" />
      <View style={styles.bottomBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await setModalVisible(!modalVisible);
            await generatePdf(images);
            await setShow(true);
            await setInterval(() => {
              setProgress(progress + 25);
            }, 10);
          }}>
          <Text style={styles.buttonText}>Generate Pdf</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{fontWeight: 'bold', fontSize: 18, margin: 10}}>
              Remember
            </Text>
            <Text style={styles.modalText}>
              Please wait some time while Progress is not completing.
              {'\n'}
              Your Pdf is not shown on your screen.
              {'\n'}
              Your generated pdf is saved in CamScanner-Pro-India folder in your
              internal memory.
            </Text>
            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>OK</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    width: Dimensions.get('window').width / 2.7,
    height: Dimensions.get('window').height / 13,
    backgroundColor: '#3DB24B',
    elevation: 5,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlignVertical: 'center',
    fontSize: 17,
    color: 'white',
  },
  modalView: {
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
    lineHeight: 20,
  },
});

export default PdfGenerateScreen;
