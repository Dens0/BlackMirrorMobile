import Element from "../../models/element";
import * as SecureStore from "expo-secure-store";
import {AsyncStorage} from "react-native";
export const SET_ELEMENTS = 'SET_ELEMENTS';
export const UPDATE_ELEMENTS = 'EDIT_ELEMENTS';

export const fetchElements = () => {
    return async dispatch => {
        let userData = await AsyncStorage.getItem('userData');
        const userToken = JSON.parse(userData)
        // console.log(userData.data, "Obiekt Usera ")
        const response = await fetch(
            "https://myblackmirror.pl/api/v1/features",
            {
                headers: new Headers({
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + userToken.token
                })
            }
        ).catch(res=>console.log(res));
        const resData = await response.json()
        const loadedElements = []
        for (const key in resData.data) {
            loadedElements.push(new Element(
                resData.data[key].config.active.toString(),
                resData.data[key].base_config,
                resData.data[key].config,
                resData.data[key].icon,
                resData.data[key].id.toString(),
                resData.data[key].name,
                resData.data[key].ordering,
                resData.data[key].slug,

            ))
        }
        dispatch({type: SET_ELEMENTS, elements: loadedElements})
    }
}

export const updateElement = (id, active, slug, selectedFormat) => {
    if (active ===true)
    {
      active = 1;
    }else
    {
      active = 0;
    }
    return async dispatch => {
        let userData = await AsyncStorage.getItem('userData');
        const userToken = JSON.parse(userData)
        await fetch(
            `https://myblackmirror.pl/api/v1/features/setActive/${slug}/${active}?api_token=test&fbclid=IwAR1-ym0wALyU3yiu2VsrJq4vtX70NqGq5cM6TCIZ3vUQ_C_Rc9b2C2_lkRM`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + userToken.token
                },
            }
        );
        if (active ===1)
        {
            active = true;
        }else
        {
            active = false;
        }
        // dispatch({
        //     type: UPDATE_ELEMENTS,
        //     pid: id,
        //     elementData: {
        //         active:active.toString()
        //     }
        // });


    }
};


