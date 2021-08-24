import React from 'react';
import {StyleSheet, View, Text, StatusBar, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const AccountScreen = () => {
  return (
    <ScrollView>
      <View styles={styles.container}>
        <StatusBar backgroundColor="#293B4F" barStyle="light-content" />
        <View style={{margin: 20}}>
          <Text style={{fontSize: 16, marginBottom: 5}}>
            Your all documents which are created with
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                marginBottom: 5,
                color: '#0fc5a4',
                fontWeight: 'bold',
              }}>
              CamScanner Pro
            </Text>
            <Text style={{fontSize: 16, marginBottom: 5, marginLeft: 5}}>
              will save in
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                marginBottom: 5,
                color: '#0fc5a4',
                fontWeight: 'bold',
              }}>
              CamScanner-Pro-India
            </Text>
            <Text style={{fontSize: 16, marginBottom: 5, marginLeft: 5}}>
              folder in your
            </Text>
          </View>
          <Text style={{fontSize: 16, marginBottom: 5}}>Internal Storage.</Text>
        </View>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 5,
            marginLeft: 20,
            color: '#0fc5a4',
            fontWeight: 'bold',
          }}>
          Additional Information of App
        </Text>
        <View style={{margin: 20}}>
          <Text style={{fontSize: 16, marginBottom: 5}}>
            In the Documents Screen, When You press,
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={styles.iconContainer}>
              <Icon name="ellipsis-v" size={15} color="white" />
            </View>
            <Text style={{fontSize: 16, marginBottom: 5, marginLeft: 15}}>
              then Popup menu is opened.
            </Text>
          </View>
          <Text style={{fontSize: 16, marginTop: 10}}>
            Popup menu has five options :
          </Text>
          <View style={{marginLeft: 20}}>
            <Text style={styles.headingStyle}>1) Image Reducing</Text>
            <Text style={styles.Text}>
              When you press Image Reducing option, then you will be able to
              reducing single or multiple images with percentages.
            </Text>
            <Text style={styles.headingStyle}>2) Pdf Generator</Text>
            <Text style={styles.Text}>
              When you press Pdf Generator option, then you will be able to
              generate pdf from images, photos, pages or Documents.
            </Text>
            <Text style={styles.headingStyle}>3) Camera</Text>
            <Text style={styles.Text}>
              When you press Camera option, then you will be able to reducing
              Camera images with percentages.
            </Text>
            <Text style={styles.headingStyle}>4) Delete Selected</Text>
            <Text style={styles.Text}>
              When you press Delete Selected option, then you will be able to
              delete all selected Documents with checkbox.
            </Text>
            <Text style={styles.headingStyle}>5) Delete All</Text>
            <Text style={styles.Text}>
              When you press Delete All option, then you will be able to delete
              all the documents which you have created with camScanner Pro.
            </Text>
          </View>
        </View>
        <View style={{margin: 20}}>
          <Text style={{fontSize: 16, marginBottom: 5}}>
            In the Scanner Screen, When You press,
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={styles.iconContainer}>
              <Icon name="camera" size={15} color="white" />
            </View>
            <Text style={{fontSize: 16, marginBottom: 5, marginLeft: 15}}>
              then Scanner screen will opened.
            </Text>
          </View>
          <Text style={{fontSize: 16, marginTop: 10}}>
            Scanner screen has two options :
          </Text>
          <View style={{marginLeft: 20}}>
            <Text style={styles.headingStyle}>1) Start Scanning</Text>
            <Text style={styles.Text}>
              When you press Start Scanning option, then you will be able to
              scan single or multiple images with cameras and use many features
              related to scanning.
            </Text>
            <Text style={styles.headingStyle}>2) Import Files</Text>
            <Text style={styles.Text}>
              When you press Import Files option, then you will be able to scan
              files which has already into your internal memory.
            </Text>
          </View>
        </View>
        <View style={{margin: 20}}>
          <Text style={{fontSize: 16, marginBottom: 5}}>
            In the QR Code Screen, When You press,
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={styles.iconContainer}>
              <Icon name="qrcode" size={15} color="white" />
            </View>
            <Text style={{fontSize: 16, marginBottom: 5, marginLeft: 15}}>
              then QR Code screen will opened.
            </Text>
          </View>
          <View style={{marginLeft: 20}}>
            <Text style={styles.headingStyle}>1) QR Code Scanning</Text>
            <Text style={styles.Text}>
              In this screen, you will be able to scan any type of QR code which
              you want and get link of QR Code.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  iconContainer: {
    backgroundColor: '#0fc5a4',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  headingStyle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#0fc5a4',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  Text: {
    color: 'grey',
    lineHeight: 20,
  },
});

export default AccountScreen;
