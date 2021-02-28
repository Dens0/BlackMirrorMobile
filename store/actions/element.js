export const SET_ELEMENT_CONFIG = 'SET_ELEMENT_CONFIG';

import {AsyncStorage} from "react-native";

export const fetchElement = (slug) =>
{
    return async dispatch => {
        let userData = await AsyncStorage.getItem('userData');
        const userToken = JSON.parse(userData)
        const response = await fetch(
            `https://myblackmirror.pl/api/v1/features/${slug}`,

            {
                headers: new Headers({
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + userToken.token
                })
            }
        ).catch(res=>console.log(res));
        const resData = await response.json()

        dispatch({type: SET_ELEMENT_CONFIG, elementConfig: resData})
    }
}