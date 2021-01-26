import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import Colors from "../constants/Colors";
import DiaryItem from "../components/elements/DiaryItem"
import BannerAdd from "../components/Adds/BannerAdd";

const DiaryScreen = props => {
    return (
        <>
            <BannerAdd/>

            <View style={styles.screen}>
            <Text style={styles.diaryTitle}>DZIENNIK ZMIAN</Text>

            <DiaryItem/>
        </View>
            </>
    );
};

DiaryScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Dziennik zmian',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),

    };
};
const styles = StyleSheet.create({
    diaryTitle:{
      marginBottom:20,
        fontSize:25,
        color:Colors.primary
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.secondary,

    }
});

export default DiaryScreen;
