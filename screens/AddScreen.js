import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import Colors from "../constants/Colors";
import RewardAdd from "../components/Adds/RewardAdd";

const AddScreen = props => {
    return (
        <View style={styles.screen}>
            <RewardAdd/>
        </View>
    );
};

AddScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Reklama',
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
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.secondary,
        padding:2,
    }
});

export default AddScreen;
