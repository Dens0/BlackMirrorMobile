import {AsyncStorage} from 'react-native';
import * as SecureStore from "expo-secure-store";

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';


let timer;

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        // dispatch(setLogoutTimer(expiryTime));
        dispatch({type: AUTHENTICATE, userId: userId, token: token});
    };
};

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAj1bu92L5LH_8me0scHM_odddc9M9AFmM',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        // console.log(response)
        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Coś poszło nie tak !';
            if (errorId === 'EMAIL_EXISTS') {
                message = 'Ten email już istnieje!';
            }
            throw new Error(message);
        }

        const resData = await response.json();
        dispatch(
            authenticate(
                resData.localId,
                resData.idToken,
                parseInt(resData.expiresIn) * 1000
            )
        );

        const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
        );
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://myblackmirror.pl/api/v1/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        if (!response.ok) {
            const errorResData = await response.json();
            throw new Error(errorResData.message);
        }

        const resData = await response.json();
        // console.log(resData)
        dispatch(
            authenticate(
                resData.data.id,
                resData.data.api_token,
                3600000
            )
        );
        const expirationDate = new Date(
            new Date().getTime() + 3600000
        );
        await SecureStore.setItemAsync(
            'userData',
            JSON.stringify(resData.data)
        );
        // console.log(resData.data.api_token)
        saveDataToStorage(resData.data.api_token, resData.data.id, expirationDate);
    };
};

export const logout = () => {
    clearLogoutTimer();
    SecureStore.deleteItemAsync('userData');
    return {type: LOGOUT};
};

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate.toISOString()
        })
    );
};
