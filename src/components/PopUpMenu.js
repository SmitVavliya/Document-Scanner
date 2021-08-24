import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/Ionicons';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {navigate} from '../navigationRef';
import {Context as CameraContext} from '../context/CameraContext';
import ImagePicker from 'react-native-image-crop-picker';
import {Context as ImageContext} from '../context/ImageContext';
import {Context as PdfContext} from '../context/PdfContext';

const PopUpMenu = () => {
  const {addImage} = useContext(CameraContext);
  const {fetchFile} = useContext(ImageContext);
  const {deleteItems} = useContext(PdfContext);

  const openImages = async () => {
    try {
      const image = await ImagePicker.openCamera({
        cropping: true,
      });

      if (image) {
        addImage(image);

        navigate('CameraImageReduce');
      }
    } catch (err) {}
  };

  let _menu = null;

  const setMenuRef = ref => {
    _menu = ref;
  };

  const hideMenu = () => {
    _menu.hide();
  };

  const showMenu = () => {
    _menu.show();
  };

  return (
    <View>
      <Menu
        ref={setMenuRef}
        button={
          <TouchableOpacity onPress={showMenu}>
            <Icon
              name="ellipsis-v"
              size={20}
              color="white"
              style={{marginRight: 20}}
            />
          </TouchableOpacity>
        }>
        <MenuItem
          onPress={() => {
            navigate('ImageSelect');
            hideMenu();
          }}>
          <View style={styles.menuItem}>
            <Icon name="image" size={25} style={{width: 30}} />
            <Text style={styles.title}>Image Reducing</Text>
          </View>
        </MenuItem>
        <MenuItem
          onPress={() => {
            navigate('PdfSelect');
            hideMenu();
          }}>
          <View style={styles.menuItem}>
            <Icon name="file-pdf" size={25} style={{width: 30}} />
            <Text style={styles.title}>Pdf Generator</Text>
          </View>
        </MenuItem>
        <MenuItem
          onPress={() => {
            openImages();
            hideMenu();
          }}>
          <View style={styles.menuItem}>
            <Icon name="camera" size={25} style={{width: 30}} />
            <Text style={styles.title}>Camera</Text>
          </View>
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onPress={() => {
            fetchFile();
            hideMenu();
          }}>
          <View style={styles.menuItem}>
            <Icon name="trash-alt" size={25} style={{width: 30}} />
            <Text style={styles.title}>Delete Selected</Text>
          </View>
        </MenuItem>
        <MenuItem
          onPress={() => {
            deleteItems();
            hideMenu();
          }}>
          <View style={styles.menuItem}>
            <MaterialIcon name="trash-outline" size={25} style={{width: 30}} />
            <Text style={styles.title}>Delete All</Text>
          </View>
        </MenuItem>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    marginVertical: 2,
    width: 150,
    marginHorizontal: 30,
  },
});

export default PopUpMenu;
