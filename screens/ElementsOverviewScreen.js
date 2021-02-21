import React, {useEffect, useCallback, useState} from 'react';
import {View, Text, FlatList, Button,Platform, StyleSheet, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import ElementItem from '../components/elements/ElementItem';
import Colors from '../constants/Colors';
import * as elementActions from '../store/actions/elements'
// import {colors} from "react-native-svg/lib/typescript/lib/extract/extractColor";

//AD
//ca-app-pub-8731014179800764~6037445767 indentyfikator aplikacji
//ca-app-pub-8731014179800764/4768542227 identyfikator jednoski reklamowej
//IOS
//ca-app-pub-8731014179800764~9231419466 - indentyfikator aplikacji
//ca-app-pub-8731014179800764/7814681429 - identyfikator jednostki reklamowej

const ElementsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const elements = useSelector(state => state.elements.availableElements);

    const dispach = useDispatch();
    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            await dispach(elementActions.fetchElements())
            setIsLoading(false);
        }
        loadProducts();
    }, [dispach])

    if (isLoading) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={Colors.primary}/>
        </View>
    }

    if (isLoading) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Brak elementów do wyświetlenia</Text>
        </View>
    }
       return (
        <View style={styles.screen}>
            {/*<BannerAdd/>*/}

            <FlatList
                style={styles.list}
                data={elements}
                keyExtractor={item => item.id}
                renderItem={itemData => (
                    <ElementItem
                        title={itemData.item.name}
                        image={itemData.item.icon}
                        onPress={ () => {
                            itemData.navigation.navigate("EditElementScreen", {
                                    elementName: itemData.item.name,
                                    elementSlug: itemData.item.slug,
                                    elementImg: itemData.item.img,
                                    elementId: itemData.item.id,
                                    elementConf: itemData.item.config.data.timezone,
                                    elementActive: itemData.item.active,
                                    elementIcon:itemData.item.icon,
                                },
                                    console.log('navigate'))
                        }}
                    >
                        <Button
                            color={Platform.OS === 'android' ? Colors.secondary : 'white'}
                            title="KONFIGURACJA"
                            onPress={() => {
                                props.navigation.navigate("EditElementScreen", {
                                    elementName: itemData.item.name,
                                    elementSlug: itemData.item.slug,
                                    elementImg: itemData.item.img,
                                    elementId: itemData.item.id,
                                    elementConf: itemData.item.config.data.timezone,
                                    elementActive: itemData.item.active,
                                    elementIcon:itemData.item.icon
                                })
                            }}
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
    screen:
        {
            backgroundColor: Colors.secondary,
            paddingBottom: 30
        },
    list:
        {
            height: '100%'
        },
    switchContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 25,
        backgroundColor: Colors.tretiary,
    },
});

export default ElementsOverviewScreen;
