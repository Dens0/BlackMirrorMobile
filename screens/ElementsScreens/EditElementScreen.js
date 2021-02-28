import React, {useEffect, useCallback, useReducer, useState} from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    Switch, Picker,Alert
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as elementsActions from '../../store/actions/elements';
import ElementItem from "../../BlackMirror_Mobile/components/elements/ElementItem";
import Colors from "../../constants/Colors";
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as elementAction from '../../store/actions/element';
import {HeaderButtons} from "react-navigation-header-buttons";
import HeaderButton from "../../BlackMirror_Mobile/components/UI/HeaderButton";

const EditElementScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const elementId = props.navigation.getParam('elementId');
    const handleSubmit = props.navigation.getParam('submit');

    const editedElement = useSelector(state =>
        state.elements.availableElements.find(prod => prod.id === elementId)
    );
    let configs
    configs = useSelector(state => state.elementConfig.availableConfig);
    // ZMIANY W ZALEŻNOŚCI OD KOLEJNYCH INPUTÓW KTÓRE BYĘDZIEMY WYSYŁAĆ NA SERWER
    const [active, setActive] = useState(editedElement ? editedElement.active : !editedElement.active)
    const [slug, setSlug] = useState(editedElement ? editedElement.slug : '')
    const [icon, setIcon] = useState(editedElement ? editedElement.icon : '')

    const [timeZone, setTimeZone] = useState(configs ? configs : '')
    const [selectedFormat, setSelectedFormat] = useState(configs ? configs : '')


    if (configs) {
        console.log("-----------------------------------------")
        console.log(configs)
        console.log("-----------------------------------------")
    }

    const dispatch = useDispatch();
    const dispa = useDispatch();
    useEffect(() => {
        const loadConfigs = async () => {
            setIsLoading(true);
            await dispa(elementAction.fetchElement(slug))
            setIsLoading(false);
        }
        loadConfigs();
    }, [dispa])
    const changeActiveHandler = useCallback(() => {
        Alert.alert(
            "",
            "Chcesz zapisać ustawienia ?",
            [
                {
                    text: "ANULUJ",
                    style: "cancel"
                },
                { text: "ZAPISZ", onPress: () =>  dispatch(elementsActions.updateElement(elementId, active, slug))}
            ],
            { cancelable: false }
        );
    }, [dispatch, elementId, active, slug])
    useEffect(() => {
        props.navigation.setParams({'submit': changeActiveHandler});
    }, [changeActiveHandler]);
    return (
        <ScrollView style={styles.editBackground}>
            <ElementItem
                title={editedElement.name}
                image={icon}
            >
                <View style={styles.switchContainer}>
                    {/*<Text style={{*/}
                    {/*    color: 'white',*/}
                    {/*    fontSize: 25,*/}
                    {/*    fontFamily: 'Quicksand-medium'*/}
                    {/*}}>{active ? 'Wyłącz' : 'Włącz '} </Text>*/}
                    <Switch
                        trackColor={{true: Colors.primary}}
                        style={styles.switch}
                        thumbColor={Colors.light}
                        value={active}
                        onValueChange={setActive}
                    />
                </View>


            </ElementItem>
            <View style={styles.saveContainer}>

            <Icon.Button size={30} style={styles.iconButton} backgroundColor={Colors.primary} name="save" onPress={handleSubmit} solid>
                ZAPISZ KONFIGURACJE
            </Icon.Button>
            </View>
            <View style={styles.form}>

                {configs  ? (
                    <View>
                        {configs.data.config_data.time_formats ? (
                            <Picker style={{width: "100%"}} itemStyle={{color: "white"}} selectedValue={selectedFormat}
                                    onValueChange={(itemValue, itemIndex) => setSelectedFormat(itemValue)}>
                                {}
                                {/*<Picker.Item label={configs.data.config_data.time_formats["HH:mm"]} value={"HH:mm"}/>*/}
                                {/*<Picker.Item label={configs.data.config_data.time_formats["hh:mm A"]} value={"hh:mm A"}/>*/}
                            </Picker>) : <></>}
                    </View>) : <></>
                }

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

                {slug === 'news' ?
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
    // const handleSubmit = () => {
    //     navData.navigation.getParam('submit')
    //     // Alert.alert(
    //     //     'Alert Title',
    //     //     'My Alert Msg',
    //     //     [
    //     //         {
    //     //             text: "Anuluj",
    //     //             onPress: () => console.log("Cancel Pressed"),
    //     //             style: "cancel"
    //     //         },
    //     //         {
    //     //             text: "Zatwierdź", onPress: () =>   navData.navigation.getParam('submit')
    //     //         }
    //     //     ],
    //     //     {cancelable: false}
    //     // )
    //
    //
    // }
    // const handleSubmit = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('elementName'),
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            {/*<Item*/}
            {/*    title="Zapisz"*/}
            {/*    // iconName={*/}
            {/*    //     Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'*/}
            {/*    // }*/}
            {/*    onPress={handleSubmit}*/}
            {/*/>*/}
        </HeaderButtons>

    };
};
const styles = StyleSheet.create({
    form: {
        // margin: 20
    },
    buttonContainer: {
        textAlign: 'center',
        // width: 110,
    },
    iconButton: {
        backgroundColor: Colors.primary,
        width: '100%',
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
        marginTop: 30,
        marginBottom: 10,

    },
    saveContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    element: {
        // height: '90%',
        backgroundColor: 'orange',
    },
    editBackground:
        {
            backgroundColor: Colors.tertiary,
        },
    switch: {
        // marginLeft: 20,
        transform: [{scaleX: 1.3}, {scaleY: 1.3}],
    },
    actions: {
        alignItems: 'center',
        height: '28%',
        color: '#f5f5f5',
        justifyContent: 'center',
        alignContent: 'center',

    },

});

export default EditElementScreen;
