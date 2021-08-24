import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ImageSelectScreen from './src/screens/ImageSelectScreen';
import PdfSelectScreen from './src/screens/PdfSelectScreen';
import AccountScreen from './src/screens/AccountScreen';
import QRCodeScreen from './src/screens/QRCodeScreen';
import ImageReduceScreen from './src/screens/ImageReduceScreen';
import PdfGenerateScreen from './src/screens/PdfGenerateScreen';
import CameraImageReduceScreen from './src/screens/CameraImageReduceScreen';
import SplashScreen from './src/screens/SplashScreen';
import ImageListScreen from './src/screens/ImageListScreen';
import CameraScreen from './src/screens/CameraScreen';
import {Provider as ImageProvider} from './src/context/ImageContext';
import {Provider as CameraProvider} from './src/context/CameraContext';
import {Provider as PdfProvider} from './src/context/PdfContext';
import PopUpMenu from './src/components/PopUpMenu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {setNavigator} from './src/navigationRef';

const imageListFlow = createStackNavigator({
  ImageList: {
    screen: ImageListScreen,
    navigationOptions: {
      title: 'Documents',
      headerTintColor: 'white',
      headerRight: () => <PopUpMenu />,
      headerStyle: {
        backgroundColor: '#293B4F',
      },
    },
  },
  ImageSelect: {
    screen: ImageSelectScreen,
    navigationOptions: {
      title: 'Choose Images',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#293B4F',
      },
    },
  },
  PdfSelect: {
    screen: PdfSelectScreen,
    navigationOptions: {
      title: 'Choose Pages',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#293B4F',
      },
    },
  },
  ImageReduce: {
    screen: ImageReduceScreen,
    navigationOptions: {
      title: 'Reduce Images',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#293B4F',
      },
    },
  },
  PdfGenerate: {
    screen: PdfGenerateScreen,
    navigationOptions: {
      title: 'Generate PDF',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#293B4F',
      },
    },
  },
  CameraImageReduce: {
    screen: CameraImageReduceScreen,
    navigationOptions: {
      title: 'Reduce Camera Image',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#293B4F',
      },
    },
  },
});

const AccountStack = createStackNavigator({
  Account: {
    screen: AccountScreen,
    navigationOptions: {
      title: 'Help',
      headerTitleAlign: 'center',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#293B4F',
      },
    },
  },
});

imageListFlow.navigationOptions = {
  title: 'Documents',
  tabBarIcon: ({focused, tintColor}) => (
    <Icon name="th-list" size={20} color={tintColor} />
  ),
  tabBarOptions: {
    style: {
      backgroundColor: '#293B4F',
      height: 55,
      borderTopColor: 'transparent',
      borderTopWidth: 1,
      paddingRight: 5,
      paddingLeft: 5,
    },
    activeTintColor: '#0fc5a4',
    inactiveTintColor: 'white',
    labelStyle: {
      fontSize: 14,
    },
  },
};

const tabbarOptions = {
  style: {
    backgroundColor: '#293B4F',
    height: 55,
    borderTopColor: 'transparent',
    borderTopWidth: 1,
    paddingRight: 5,
    paddingLeft: 5,
  },
  activeTintColor: '#0fc5a4',
  inactiveTintColor: 'white',
  labelStyle: {
    fontSize: 14,
  },
};

const switchNavigator = createSwitchNavigator({
  splash: {
    screen: SplashScreen,
  },
  mainFlow: createBottomTabNavigator({
    imageListFlow,
    Camera: {
      screen: CameraScreen,
      navigationOptions: {
        title: 'Scanner',
        headerTitleAlign: 'center',
        tabBarIcon: ({focused, tintColor}) => (
          <Icon name="camera" size={20} color={tintColor} />
        ),
        tabBarOptions: tabbarOptions,
      },
    },
    QRCode: {
      screen: QRCodeScreen,
      navigationOptions: {
        title: 'QR Code',
        headerTitleAlign: 'center',
        tabBarIcon: ({focused, tintColor}) => (
          <Icon name="qrcode" size={20} color={tintColor} />
        ),
        tabBarOptions: tabbarOptions,
      },
    },
    Account: {
      screen: AccountStack,
      navigationOptions: {
        title: 'Help',
        tabBarIcon: ({focused, tintColor}) => (
          <Icon name="question" size={20} color={tintColor} />
        ),
        tabBarOptions: tabbarOptions,
      },
    },
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <CameraProvider>
      <PdfProvider>
        <ImageProvider>
          <App
            ref={navigator => {
              setNavigator(navigator);
            }}
          />
        </ImageProvider>
      </PdfProvider>
    </CameraProvider>
  );
};
