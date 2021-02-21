import * as SecureStore from "expo-secure-store";
import Diary from "../../models/diaryItem";
export const SET_DIARY = 'SET_DIARY';
import {AsyncStorage} from 'react-native';


export const fetchDiary = () => {
    return async dispatch => {
        // let userData = SecureStore.getItemAsync('userData')
        //     .then(res => {
        //     return JSON.parse(res);
        // });
        let userData = await AsyncStorage.getItem('userData');
        const userToken = JSON.parse(userData)
        const response = await fetch(
            "https://myblackmirror.pl/api/v1/data/changelog",
            {
                headers: new Headers({
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + userToken.token
                })
            }
        );
        const resData = await response.json()
        // console.log(resData)
        const loadedDiaries = []
        for (const key in resData.data) {
            loadedDiaries.push(new Diary(
                resData.data[key].aplikacjalMobilna,
                resData.data[key].aplikacjalKliencka,
                resData.data[key].panelAministracyjny,

            ))

        }
        // console.log(loadedDiaries)
        dispatch({type: SET_DIARY, diaries: loadedDiaries})
    }



};


