import React, {useEffect, useCallback, useReducer, useState} from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    Platform,
    TextInput,
    Switch
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as elementsActions from '../../store/actions/elements';
import ElementItem from "../../BlackMirror_Mobile/components/elements/ElementItem";
import Colors from "../../constants/Colors";


const EditElementScreen = props => {

    const elementId = props.navigation.getParam('elementId');
    const editedElement = useSelector(state =>
        // state.elements.availableProducts.find(prod => prod.id === prodId)
        state.elements.availableElements.find(prod => prod.id === elementId)
    );

    // ZMIANY W ZALEŻNOŚCI OD KOLEJNYCH INPUTÓW KTÓRE BYĘDZIEMY WYSYŁAĆ NA SERWER
    const [title, setTitle] = useState(editedElement ? editedElement.title : '')
    const [active, setActive] = useState(editedElement ? editedElement.active : !editedElement.active)
    const [slug, setSlug] = useState(editedElement ? editedElement.slug : '')
    const [timeZone, setTimeZone] = useState(editedElement ? editedElement.config.data.timezone : '')
    const [icon, setIcon] = useState(editedElement ? editedElement.icon : '')

    // console.log(typeof (editedElement.active))
    // console.log(editedElement.icon)
    const dispatch = useDispatch();


    const changeActiveHandler = useCallback(() => {
        if (editedElement) {
            dispatch(elementsActions.updateElement(elementId, active, slug))
        }
    }, [dispatch, elementId, active, slug])


    useEffect(() => {
        props.navigation.setParams({'submit': changeActiveHandler});
    }, [changeActiveHandler]);
    return (
        <ScrollView style={styles.editBackground}>
            <ElementItem
                style={styles.element}
                title={editedElement.name}
                image={icon}
            >
                <View style={styles.switchContainer}>
                    <Text style={{color: 'white',fontSize: 20, fontFamily: 'Quicksand-medium'}}>{active? 'Włącz' : 'Wyłącz '} </Text>
                    <Switch
                        trackColor={{true: Colors.primary}}
                        style={styles.switch}
                        thumbColor={Colors.light}
                        value={active}
                        onValueChange={setActive}
                    />
                </View>
            </ElementItem>


            <View style={styles.form}>

                <View style={styles.formControl}>
                    <Text style={styles.label}>
                        {editedElement.name}
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={slug}
                        onChange={setSlug}
                    />
                </View>

                { timeZone ?
                <View style={styles.formControl}>
                    <Text style={styles.label}>
                        Time Zone
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={timeZone}
                        onChange={setTimeZone}
                    />
                </View>
                    :
                    <View style={styles.formControl}>
                    </View>
                }
            </View>
        </ScrollView>
    )


};
EditElementScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('elementName'),
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Zapisz"
                iconName={
                    Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
                }
                onPress={submitFn}
            />
        </HeaderButtons>

    };
};
const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    fromControl: {
        width: '100%'
    }, label: {
        fontFamily: 'Quicksand',
        marginVertical: 8,
    }, input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
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
    element: {
        height: '90%',
        backgroundColor: 'orange',
    },
    editBackground:
        {
            backgroundColor: Colors.secondary,
        },
    switch:{
        marginLeft: 20,
        height:30,
        width: 50,
        transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
    },

});

export default EditElementScreen;
