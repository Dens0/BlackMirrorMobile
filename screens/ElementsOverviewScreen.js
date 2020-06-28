import React from 'react';
import {View, FlatList, Button, Platform, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../components/UI/HeaderButton';
import ElementItem from '../components/elements/ElementItem';
import Colors from '../constants/Colors';
import BannerAdd from "../components/Adds/BannerAdd";

//AD
//ca-app-pub-8731014179800764~6037445767 indentyfikator aplikacji
//ca-app-pub-8731014179800764/4768542227 identyfikator jednoski reklamowej
//IOS
//ca-app-pub-8731014179800764~9231419466 - indentyfikator aplikacji
//ca-app-pub-8731014179800764/7814681429 - identyfikator jednoski reklamowej

const ElementsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);


    return (
        <View style={styles.screen}>
            <BannerAdd/>
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                renderItem={itemData => (
                    <ElementItem
                        title={itemData.item.title}
                        image={itemData.item.imageUrl}
                    >
                        <Button
                            color={Colors.secondary}
                            title="KONFIGURACJA"
                        />
                    </ElementItem>
                )}
            />
        </View>
    );
};

ElementsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Elementy na lustrze',
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
        backgroundColor: Colors.secondary,
        paddingBottom: 40
    }
});

export default ElementsOverviewScreen;
