import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';
import { SvgCssUri } from 'react-native-svg';
import Colors from "../../constants/Colors";
import Card from '../UI/Card';

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
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <SvgCssUri
                                width="60%"
                                height="60%"
                                uri={props.image}
                            />
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
        height: 250,
        margin: 20,
        marginHorizontal: 40,
        // backgroundColor:Colors.secondary
    },
    touchable: {
        overflow: 'hidden',
        backgroundColor: Colors.primary
    },
    imageContainer: {
        width: '100%',
        height: '54%',
        overflow: 'hidden',
        backgroundColor: Colors.tertiary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    details: {
    justifyContent:'center',
        alignItems: 'center',
        height: '18%',
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
        alignItems: 'center',
        height: '28%',
        backgroundColor: Colors.tertiary,
        color: '#f5f5f5',
        justifyContent: 'center',
        alignContent: 'center',
    },

});

export default ElementItem;
