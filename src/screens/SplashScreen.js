import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const IntervalId = setTimeout(() => {
      navigation.navigate('mainFlow');
    }, 3000);

    return () => clearTimeout(IntervalId);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#293B4F" />
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/camscanner-logo-1.png')}
          style={{width: 80, height: 80}}
        />
        <Text style={styles.text}>CamScanner Pro</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#293B4F',
    justifyContent: 'center',
  },
  logoContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
  },
});

export default SplashScreen;
