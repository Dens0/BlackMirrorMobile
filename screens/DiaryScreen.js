import React, {useEffect, useCallback, useState} from 'react';
import {View, Text, StyleSheet, Platform, ActivityIndicator, FlatList, Button, ScrollView} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import Colors from "../constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import * as diaryActions from "../store/actions/diary";
import {FontAwesome} from "@expo/vector-icons";


const DiaryScreen = props => {
    const [isLoaded, setIsLoaded] = useState(false)
    let diaries = {}
    diaries = useSelector(state => state.diaries.availableDairy);

// console.log(diaries)
    const dispatch = useDispatch();
    useEffect(() => {
        const loadDiaries = async () => {
            setIsLoaded(true);
            await dispatch(diaryActions.fetchDiary())
            setIsLoaded(false);
        }
        loadDiaries();
    }, [dispatch])

    if (isLoaded) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={Colors.primary}/>
        </View>;
    }
    if (isLoaded) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Dzienników </Text>
        </View>
    }

    return (
        <>
            <ScrollView style={styles.scrollView}>
                {diaries ? (
                    <>
                        <View>
                            {
                                diaries.data["Aplikacja Mobilna"] ? (
                                    <View>
                                        <Text style={styles.diaryTitle}>Aplikacja mobilna</Text>

                                        {diaries.data["Aplikacja Mobilna"].map(item => (      <View key={item.date}>
                                            <Text style={styles.date} key={item.date}>
                                                <FontAwesome style={{marginRight: 10}} name="history"
                                                             size={16}
                                                             color="white"/><Text
                                                style={styles.date}>  {item.date}</Text></Text>
                                            <Text style={styles.commits}> {item.author} - {item.message}</Text>

                                        </View>))}


                                    </View>) : <Text style={styles.diaryTitle}>Brak zdarzeń Aplikacja </Text>
                            }


                        </View>
                        <View>
                            {
                                diaries.data["Aplikacja Kliencka"] ? (

                                    <View>
                                        <Text style={styles.diaryTitle}>Aplikacja Kliencka</Text>

                                        {diaries.data["Aplikacja Kliencka"].map(item => (  <View key={item.date}>
                                            <Text style={styles.date} >
                                                <FontAwesome style={{marginRight: 10}} name="history"
                                                             size={16}
                                                             color="white"/><Text
                                                style={styles.date}>  {item.date}</Text></Text>
                                            <Text style={styles.commits}> {item.author} - {item.message}</Text>

                                            </View>))}
                                    </View>) : <Text style={styles.diaryTitle}>Brak zdarzeń Aplikacja </Text>
                            }
                        </View>
                        <View>
                            {
                                diaries.data["Panel Administracyjny"] ? (

                                    <View>
                                        <Text style={styles.diaryTitle}>Panel Administracyjny</Text>

                                        {diaries.data["Panel Administracyjny"].map(item => (  <View key={item.date}>
                                            <Text style={styles.date}>
                                                <FontAwesome style={{marginRight: 10}} name="history"
                                                             size={16}
                                                             color="white"/><Text
                                                style={styles.date}>  {item.date}</Text></Text>
                                            <Text style={styles.commits}> {item.author} - {item.message}</Text>

                                        </View>))}
                                    </View>) : <Text style={styles.diaryTitle}>Brak zdarzeń Aplikacja </Text>
                            }
                        </View>
                    </>) : <Text>Brak elementów</Text>}
            </ScrollView>
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
    scrollView: {
        backgroundColor: Colors.secondary,
    },
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

export default DiaryScreen;
