import React ,{ useState, useEffect, useReducer, useCallback } from 'react';
import {
    createStackNavigator,
    createDrawerNavigator,
    createAppContainer,
    createSwitchNavigator, DrawerItems,
} from 'react-navigation';
import {Platform, StyleSheet} from 'react-native';
import {Ionicons, AntDesign, FontAwesome} from '@expo/vector-icons';
import ElementsOverviewScreen from '../screens/ElementsOverviewScreen';
import AccountScreen from "../screens/AccountScreen";
import {
    View,
    Button,
    SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import AddScreen from '../screens/AddScreen'
import InformationScreen from '../screens/InformationsScreen'
import InstructionsScreen from '../screens/InstructionsScreen'
import DiaryScreen from '../screens/DiaryScreen'
import ContactScreen from '../screens/ContactScreen'
import AuthScreen from "../screens/AuthScreen";
import * as authActions from '../store/actions/auth'
import LogoutButton from "../components/UI/LogoutButton";
import Colors from '../constants/Colors';

const defaultNavOptions = {
    drawerLabel: 'Elementy',
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.secondary : ''
    },
    headerTitleStyle: {
        fontFamily: 'Quicksand-medium'
    },
    headerBackTitleStyle: {
        fontFamily: 'Quicksand'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

// ELEMENTY
const ElementsNavigator = createStackNavigator(
  {
      ElementsOverView: ElementsOverviewScreen,
  },
  {
      navigationOptions: {
          drawerLabel: 'Elementy',
          drawerIcon: drawerConfig => (
            <FontAwesome
              name={Platform.OS === 'android' ? 'dashboard' : 'dashboard'}
              size={23}
              color={drawerConfig.tintColor}
            />
          )
      },
      defaultNavigationOptions: defaultNavOptions
  }
);

//KONTA ZEWNETRZNE
const AccountNavigator = createStackNavigator(
  {
      Account: AccountScreen,
      // EditProduct: EditElementScreen
  },
  {
      navigationOptions: {
          drawerLabel: 'Konta Zewnętrzne',
          drawerIcon: drawerConfig => (
            <FontAwesome
              name={Platform.OS === 'android' ? 'user-circle-o' : 'user-circle-o'}
              size={23}
              color={drawerConfig.tintColor}
            />
          )
      },
      defaultNavigationOptions: defaultNavOptions
  }
);

//REKLAMY
const TestNavigator = createStackNavigator(
  {
      Test:AddScreen
  },
  {
      navigationOptions: {
          drawerLabel: 'Reklama',
          drawerIcon: drawerConfig => (
            <FontAwesome
              name={Platform.OS === 'android' ? 'newspaper-o' : 'newspaper-o'}
              size={23}
              color={drawerConfig.tintColor}
            />
          )
      },
      defaultNavigationOptions: defaultNavOptions
  }
);

//INSTRUKCJA
const InstructionNavigator = createStackNavigator(
  {
      Instruction: InstructionsScreen
  },
  {
      navigationOptions: {
          drawerLabel:'Instrukcje',
          drawerIcon: drawerConfig => (
            <FontAwesome
              name={Platform.OS === 'android' ? 'book' : 'book'}
              size={23}
              color={drawerConfig.tintColor}
            />
          )
      },
      defaultNavigationOptions: defaultNavOptions
  }
);

//INFRORMACJE
const InfoNavigator = createStackNavigator(
  {
      Information: InformationScreen
  },
  {
      navigationOptions: {
          drawerLabel: 'Informacje',
          drawerIcon: drawerConfig => (
            <FontAwesome
              name={Platform.OS === 'android' ? 'info-circle' : 'info-circle'}
              size={23}
              color={drawerConfig.tintColor}
            />
          )
      },
      defaultNavigationOptions: defaultNavOptions
  }
);

//Dziennik zmian
const DairyNavigator = createStackNavigator(
  {
      Dairy: DiaryScreen
  },
  {
      navigationOptions: {
          drawerLabel: 'Dziennik zmian',
          drawerIcon: drawerConfig => (
            <FontAwesome
              name={Platform.OS === 'android' ? 'tasks' : 'tasks'}
              size={23}
              color={drawerConfig.tintColor}
            />
          )
      },
      defaultNavigationOptions: defaultNavOptions
  }
);

//Kontakt
const ContactNavigator = createStackNavigator(
  {
      Contact: ContactScreen
  },
  {
      navigationOptions: {
          drawerLabel: 'Kontakt',
          drawerIcon: drawerConfig => (
            <FontAwesome
              name={Platform.OS === 'android' ? 'envelope-o' : 'envelope-o'}
              size={23}
              color={drawerConfig.tintColor}
            />
          )
      },
      defaultNavigationOptions: defaultNavOptions
  }
);

//GLOWNA NAWIGACJA
const MirrorNavigator = createDrawerNavigator(
  {
      Products: ElementsNavigator,
      Account: AccountNavigator,
      Instruction: InstructionNavigator,
      Informations: InfoNavigator,
      Diary: DairyNavigator,
      Contact: ContactNavigator,
      TestScreen: TestNavigator,
  },
  {
      // drawerPosition: "right",
      // backBehavior: "order",
      overlayColor: Colors.secondary,
      lazy: false,
      drawerType:"front" ,
      drawerBackgroundColor: Colors.tertiary,
      contentOptions: {
          activeTintColor: Colors.light,
          activeBackgroundColor: Colors.primary,
          inactiveTintColor: Colors.light,
          labelStyle: {fontFamily: 'Quicksand',}
      },
      contentComponent: props => {
          const dispatch = useDispatch();
          return (
            <View style={{ flex: 1, paddingTop: 20,     justifyContent:'space-between' }}>
                <SafeAreaView  style={{   flex:1,  justifyContent:'space-between'}} forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItems style={{ flex:1,    justifyContent:'space-between',}}{...props} />
                    <LogoutButton
                      title="Wyloguj"
                      color={'white'}
                      onPress={() => {
                          console.log("działa")
                          dispatch(authActions.logout());
                          props.navigation.navigate('Auth');
                      }}
                    >Wyloguj</LogoutButton>
                </SafeAreaView>
            </View>
          );
      }
  }
);

const AuthNavigator = createStackNavigator(
  {Auth: AuthScreen},
  {
      defaultNavigationOptions: defaultNavOptions
  });

const MainNavigator = createSwitchNavigator({
    Auth:AuthNavigator,
    Mirror:MirrorNavigator,
});

export default createAppContainer(MainNavigator);