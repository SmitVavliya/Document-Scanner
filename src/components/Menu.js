import React, {useContext, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import {navigate} from '../navigationRef';
import {Context as ImageContext} from '../context/ImageContext';

const PopUpMenu = ({item, refRBSheet}) => {
  const {showInfo} = useContext(ImageContext);

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

  const share = async path => {
    try {
      const shareOptions = {url: 'file:///' + path};
      hideMenu();
      await Share.open(shareOptions);
    } catch (err) {
      console.log(err);
    }
  };

  const save = async image => {
    try {
      const array = image.path.split('/');
      const fileName = array[array.length - 1];

      const destinationPath =
        RNFS.ExternalStorageDirectoryPath + '/Pictures/' + fileName;
      const sourcePath =
        RNFS.ExternalStorageDirectoryPath +
        '/CamScanner-Pro-India/Documents/' +
        fileName;

      await RNFS.copyFile(sourcePath, destinationPath);
    } catch (err) {
      console.log(err);
    }
  };

  const Delete = async image => {
    try {
      await RNFS.unlink(image.path);
      await navigate('ImageSelect');
      await navigate('ImageList');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Menu
        ref={setMenuRef}
        button={
          <TouchableOpacity
            onPress={showMenu}
            style={{
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="ellipsis-v" size={20} color="black" />
          </TouchableOpacity>
        }>
        <MenuItem
          onPress={() => {
            share(item.path);
            hideMenu();
          }}>
          <View style={styles.menuItem}>
            <Icon name="share-alt" size={20} style={{width: 30}} />
            <Text style={styles.title}>Share</Text>
          </View>
        </MenuItem>
        <MenuItem
          onPress={() => {
            refRBSheet.current.open();
            showInfo(item);
            hideMenu();
          }}>
          <View style={styles.menuItem}>
            <Icon name="pen" size={20} style={{width: 30}} />
            <Text style={styles.title}>Rename</Text>
          </View>
        </MenuItem>
        <MenuItem
          onPress={() => {
            share(item.path);
            hideMenu();
          }}>
          <View style={styles.menuItem}>
            <Icon name="edit" size={20} style={{width: 30}} />
            <Text style={styles.title}>Edit With</Text>
          </View>
        </MenuItem>
        <MenuItem
          onPress={() => {
            save(item);
            hideMenu();
          }}>
          <View style={styles.menuItem}>
            <Icon name="save" size={20} style={{width: 30}} />
            <Text style={styles.title}>Save to Gallery</Text>
          </View>
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onPress={() => {
            Delete(item);
            hideMenu();
          }}>
          <View style={styles.menuItem}>
            <Icon name="trash" size={20} style={{width: 30}} />
            <Text style={styles.title}>Delete</Text>
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
