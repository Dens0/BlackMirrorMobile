import Element from "../../models/element";
import * as SecureStore from "expo-secure-store";

export const SET_ELEMENTS = 'SET_ELEMENTS';
export const UPDATE_ELEMENTS = 'EDIT_ELEMENTS';

export const fetchElements = () => {
    return async dispatch => {
        let userData = SecureStore.getItemAsync('userData').then(res => {
            return JSON.parse(res);
        });
        const response = await fetch(
            "https://myblackmirror.pl/api/v1/features?api_token=test&fbclid=IwAR39_0YfG6rwM3nPVyVq0PmrIARnSY2U9C4wBpQ7ZH1Zhq6nAghpjOuhibI",
            {
                headers: new Headers({
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + userData.api_token
                })
            }
        );
        const resData = await response.json()
        // console.log(resData)
        const loadedElements = []
        for (const key in resData.data) {
            loadedElements.push(new Element(
                resData.data[key].active,
                resData.data[key].base_config,
                resData.data[key].config,
                resData.data[key].icon,
                resData.data[key].id,
                resData.data[key].name,
                resData.data[key].ordering,
                resData.data[key].slug,
                // console.log(resData.data[key].config.active,)
                // console.log(resData.data[key].icon)
                // console.log(resData.data[key].base_config,)
            ))
        }
        dispatch({type: SET_ELEMENTS, elements: loadedElements})

    }
}

export const updateElement = (id , active , slug ) => {

    console.log('ala ma kotaaaaaaaaaaaaa')
    if (active)
    {
        active = 0;
    }else
    {
        active =1;
    }

    console.log(active)
    const response = fetch(
        `https://myblackmirror.pl/api/v1/features/setActive/${slug}/${active}?api_token=test&fbclid=IwAR1-ym0wALyU3yiu2VsrJq4vtX70NqGq5cM6TCIZ3vUQ_C_Rc9b2C2_lkRM`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
            })
        }
    );

    // console.log(response)
    // if (!response.ok) {
    //     throw new Error('Something went wrong!');
    // }
    // const resData = response.json();
    // console.log(resData)
    // dispatch({
    //     type: UPDATE_ELEMENTS,
    //     pid: id,
    //     productData: {
    //         active,
    //         slug,
    //
    //     }
    // });


};


