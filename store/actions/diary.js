export const SET_DIARY = 'SET_DIARY';
import {AsyncStorage} from 'react-native';


export const fetchDiary = () => {
    return async dispatch => {
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
        let loadedDiaries = []
        loadedDiaries = resData
        dispatch({type: SET_DIARY, diaries: loadedDiaries})
    }


};


