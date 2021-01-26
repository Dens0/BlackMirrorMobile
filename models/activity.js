import React, {PureComponent, useState} from 'react';
import {View, Image, FlatList, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import * as SecureStore from "expo-secure-store";

export default class Activity extends PureComponent {
    state = {
        mirrorData: [],
        loading: true
    }
    componentDidMount() {
            // const url = "https://pokeapi.co/api/v2/pokemon/"
            const url = "https://myblackmirror.pl/api/v1/features/tasks?api_token=test&fbclid=IwAR1-ym0wALyU3yiu2VsrJq4vtX70NqGq5cM6TCIZ3vUQ_C_Rc9b2C2_lkRM"
            // const url = "https://myblackmirror.pl/api/v1/features?api_token=test&fbclid=IwAR39_0YfG6rwM3nPVyVq0PmrIARnSY2U9C4wBpQ7ZH1Zhq6nAghpjOuhibI"
            let userData =  SecureStore.getItemAsync('userData').then(res => {
                return JSON.parse(res);
            });
            fetch(url, {
                    method: 'GET',
                    headers: new Headers({
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + userData.api_token
                    })
                }
            )
                .then(res => res.json())
                .then(res => {this.setState({mirrorData: res, loading: false})})
                .catch((error) => {console.log(error)});

        };

    // componentDidUpdate() {
        // try {
        //
        //
        //  const mirrorApi = await fetch('https://myblackmirror.pl/api/v1/features/tasks?api_token=test&fbclid=IwAR1-ym0wALyU3yiu2VsrJq4vtX70NqGq5cM6TCIZ3vUQ_C_Rc9b2C2_lkRM')
        //     // const mirrorApi = await fetch('https://pokeapi.co/api/v2/pokemon/')
        //     const mirror = await mirrorApi.json()
        //     this.setState({mirrorData: mirror.results, loading: false})
        //     console.log('1111111111111111111111111111111111111111111111')
        //     console.log(mirror)
        //     console.log('222222222222222222222222222222222')
        //
        // } catch (err) {
        //     console.log("Błąd pobierania", err)
        // }
        //

    // }


    renderItem(data) {
        return <TouchableOpacity style={{backgroundColor: 'transparent'}}>
            <View>
                <Text>{data[1].name}</Text>
            </View>
        </TouchableOpacity>
    }

    render() {
        const {mirrorData, loading} = this.state;
        if (mirrorData.length)
        {
            console.log(mirrorData, "sssssscsdvsdvavvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")

        }
        // const mirror = mirrorData.map(item=> (
        //     <Yolo/>
        // ))
        if (loading) {
        return (
            <View>
                <FlatList />

            </View>
        )

        } else {
            return <ActivityIndicator/>
        }
    }


}

