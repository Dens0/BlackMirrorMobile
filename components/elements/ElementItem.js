import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';
// import SvgUri from 'react-native-svg-uri';

import { SvgCssUri } from 'react-native-svg';

import Colors from "../../constants/Colors";
import Card from '../UI/Card';

// https://myblackmirror.pl/api/v1/features/time?api_token=test
// https://myblackmirror.pl/api/v1/features?api_token=test
const ElementItem = props => {

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (

        <Card style={styles.element}>
            <View style={styles.touchable}>
                <TouchableCmp onPress={props.onSelect} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            {/*<Text>{props.image}</Text>*/}
                            {/*<Image style={styles.image} source={{uri: props.image}}/>*/}
                            {/*<SvgUri source={require(props.icon) }/>*/}
                            <SvgCssUri
                                width="60%"
                                height="60%"
                                uri={props.image}
                            />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                        </View>
                        <View style={styles.actions}>
                            {props.children}
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    element: {
        height: 300,
        margin: 20,
        marginHorizontal: 40,
        // backgroundColor:Colors.secondary
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: Colors.primary
    },
    imageContainer: {
        width: '100%',
        height: '50%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
        backgroundColor: Colors.tertiary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    // image: {
    //     width: '10%',
    //     height: '10%',
    //     resizeMode: 'contain',
    //     // color: 'white',
    //     // backgroundColor:Colors.primary
    // },
    details: {
    justifyContent:'center',
        alignItems: 'center',
        height: '22%',

        // padding: 10,
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Quicksand-bold',
        fontSize: 22,
        textTransform:'uppercase',
        marginVertical: 2,
        color: '#f5f5f5',
    },
    actions: {
        // flexDirection: 'row',
        // paddingTop: 16,
        alignItems: 'center',
        height: '28%',
        // paddingHorizontal: 20,
        backgroundColor: Colors.tertiary,
        color: '#f5f5f5',
        justifyContent: 'center',
        alignContent: 'center',

    },

});

export default ElementItem;
