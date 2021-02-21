import React, {useEffect, useCallback, useState} from 'react';

import {View, Text, StyleSheet, Platform, ActivityIndicator, FlatList, Button} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import Colors from "../constants/Colors";
import DiaryItem from "../components/elements/DiaryItem"
import BannerAdd from "../components/Adds/BannerAdd";
import {useDispatch, useSelector} from "react-redux";
import * as diaryActions from "../store/actions/diary";

// const DiaryScreen = props => {
//
//
//
//     return (
//         <>
//             <BannerAdd/>
//
//             <View style={styles.screen}>
//
//
//             <DiaryItem/>
//         </View>
//             </>
//     );
// };
const DiaryScreen = props => {
    const [isLoaded, setIsLoaded] = useState(false)
    const diaries = useSelector(state => state.diaries.availableDairy);

    const dispach = useDispatch();
    useEffect(() => {
        const loadDiaries = async () => {
            setIsLoaded(true);
            await dispach(diaryActions.fetchDiary())
            setIsLoaded(false);
        }
        loadDiaries();
    }, [dispach])

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
        <View>
{/*            <FlatList*/}
{/*                style={styles.list}*/}
{/*                data={diaries}*/}
{/*                keyExtractor={item => item.id}*/}
{/*                renderItem={itemData => (*/}
{/*                )*/}


{/*}*/}
{/*            />*/}
            <Text>sad</Text>
        </View>
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
    diaryTitle:{
      marginBottom:20,
        fontSize:25,
        color:Colors.primary
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.secondary,

    }
});

export default DiaryScreen;
