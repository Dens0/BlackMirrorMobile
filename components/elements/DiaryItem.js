import React, {useState, useEffect} from 'react';
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
import {FontAwesome} from "@expo/vector-icons";

const DiaryItem = props => {
    const [commitsMobile, setCommitsMobile] = useState();
    const [commitsPanel, setCommitsPanel] = useState();
    const [commitsClient, setCommitsClient] = useState();
    const [author, setauthor] = useState('');
    const [diary, setDiary] = useState('');
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    const fetchData = async () => {
        let userData = await SecureStore.getItemAsync('userData').then(res => {
            return JSON.parse(res);
        });

        const apiCall = await fetch('https://myblackmirror.pl/api/v1/data/changelog', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userData.api_token
            })

        })
        const diaryData = await apiCall.json()
        setDiary(diaryData.data)
    };
    useEffect(() => {
        fetchData();
    })


    return (
        <ScrollView key={props.key}>
            <View>
                <View>
                    {commitsMobile ? (
                        <>
                            <Text style={styles.diaryTitle}>Aplikacja mobilna</Text>
                            {commitsMobile.map((item) => (
                                <>
                                    <Text style={styles.date}>
                                        <FontAwesome style={{margin: 10}} name="history"
                                                                           size={16}
                                                                           color="white"/><Text
                                        style={styles.date}> dd{item.date}dd</Text></Text>
                                    <Text style={styles.commits}> {item.author} - {item.message}</Text>

                                </>
                            ))}
                        </>
                    ) : <ActivityIndicator size="large" color="white"/>
                    }
                </View>
                <View>
                    {commitsPanel ? (
                        <>
                            <Text>Panel Aministracyjny </Text>
                            {commitsPanel.map((item) => (
                                <>
                                    <Text style={styles.date}><FontAwesome style={styles.icon} name="history" size={16}
                                                                           color="white"/><Text
                                        style={styles.date}>{item.date}</Text></Text>
                                    <Text style={styles.commits}> {item.author} - {item.message}</Text>

                                </>
                            ))}
                        </>
                    ) : <ActivityIndicator size="large" color="white"/>
                    }
                </View>
                <View>
                    {commitsClient ? (
                        <>
                            <Text style={styles.diaryTitle}>Aplikacja kliencka</Text>
                            {commitsClient.map((item) => (
                                <>
                                    <Text style={styles.date}><FontAwesome style={styles.icon} name="history" size={16}
                                                                           color="white"/><Text>{item.date}</Text></Text>
                                    <Text style={styles.commits}> {item.author} - {item.message}</Text>
                                </>
                            ))}
                        </>
                    ) : <ActivityIndicator size="large" color="white"/>
                    }
                </View>
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
    },
    touchable: {
        padding: 20,

        width: '90%',
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

    },
    details: {
        alignItems: 'center',
        height: '17%',

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
        alignItems: 'center',
        height: '23%',
        backgroundColor: Colors.tertiary,
        color: '#f5f5f5',
        justifyContent: 'center',

        alignContent: 'center',
    },
    icon: {
        marginRight: 10,
    },
    date: {
        margin: 10,
        paddingLeft: 10,
        color: Colors.light,
        backgroundColor: Colors.primary,
        padding: 10

    },
    diaryTitle: {
        marginBottom: 30,
        backgroundColor: Colors.primary,
        color: Colors.light,
        fontFamily: 'Quicksand-bold',
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
});

export default DiaryItem;
