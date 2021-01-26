import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import * as SecureStore from "expo-secure-store";
import Colors from "../../constants/Colors";

const DiaryItem = props => {
    const [commits, setCommits] = useState();
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    const fetchData = async () => {
        let userData = await SecureStore.getItemAsync('userData').then(res => {
            return JSON.parse(res);
        });

        fetch('https://myblackmirror.pl/api/v1/data/changelog', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userData.api_token
            })
        }).then(res => {
            return res.json();
        }).then(data => {
            setCommits(data.data);
        });
    };

    fetchData();

    return (
        <ScrollView>
            <View style={styles.touchable}>
                {commits ? (
                    <>
                        {commits.map((item) => (
                            <>
                                <TouchableCmp onPress={props.onSelect}>
                                    <Text style={styles.commits}>{item.author} - {item.message}</Text>
                                </TouchableCmp>
                            </>
                        ))}
                    </>
                ) : <ActivityIndicator size="large" color="white"/>
                }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    commits: {
        color: Colors.light,
        lineHeight: 20,
        margin: 10,
    },
    element: {
        height: 200,
        margin: 20,
        marginHorizontal: 40,
        // backgroundColor:Colors.secondary
    },
    touchable: {
        padding: 20,
        borderRadius: 10,
        width: '90%',
        // overflow: 'hidden',
        backgroundColor: Colors.primary
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
        backgroundColor: Colors.tertiary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '50%',
        height: '50%',
        resizeMode: 'contain',
        // backgroundColor:Colors.primary

    },
    details: {
        alignItems: 'center',
        height: '17%',
        // padding: 10,

    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',

        fontFamily: 'Quicksand-bold',
        fontSize: 18,
        marginVertical: 2,
        color: '#f5f5f5',
    },
    actions: {
        // flexDirection: 'row',
        // paddingTop: 16,
        alignItems: 'center',
        height: '23%',
        // paddingHorizontal: 20,
        backgroundColor: Colors.tertiary,
        color: '#f5f5f5',
        justifyContent: 'center',

        alignContent: 'center',
    }
});

export default DiaryItem;
