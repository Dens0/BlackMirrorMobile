import React, { Component } from 'react';
import { Text ,View, StyleSheet , Button,Platform } from 'react-native';
import Constants from 'expo-constants';
import MainButton from "../UI/MainButton";
// AdMob
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded
} from 'expo-ads-admob';
import Colors from "../../constants/Colors";
import Adds from "../../constants/Adds";
export default class RewardAdd extends Component {

    // bannerError = () => {
    //     console.log('banner ad not loading')
    // }
    //
    // bannerAdReceived = () => {
    //     console.log('banner ad received')
    // }

    showInterstitial = async () => {
        AdMobInterstitial.setAdUnitID(Adds.fullAddId); // Test ID, Replace with your-admob-unit-id

        try{
            await AdMobInterstitial.requestAdAsync();
            await AdMobInterstitial.showAdAsync();
        }
        catch(e){
            console.log(e);
        }


    }

    showRewarded = async () => {
        AdMobRewarded.setAdUnitID(Adds.videoAddId); // Test ID, Replace with your-admob-unit-id

        try{
            await AdMobRewarded.requestAdAsync();
            await AdMobRewarded.showAdAsync();
        }
        catch(e){
            console.log(e);
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.info}>KLIKNIJ PRZYCISK BY OTWORZYC REKLAMĘ</Text>
<MainButton
    style={styles.interstitialBanner}
    onPress={this.showInterstitial} >Reklama pełnoekranowa
</MainButton>
<MainButton
    style={styles.interstitialBanner}
    onPress={this.showRewarded} >Reklama video
</MainButton>

                <AdMobBanner style={styles.bannerAd}
                             bannerSize="fullBanner"
                             adUnitID={Adds.fullAddId} // Test ID, Replace with your-admob-unit-id
                             onDidFailToReceiveAdWithError={this.bannerError}
                             onAdViewDidReceiveAd = {this.bannerAdReceived} />

                <PublisherBanner
                    bannerSize="mediumRectangle"
                    adUnitID={"ca-app-pub-8731014179800764/4768542227"} // Test ID, Replace with your-admob-unit-id
                    onDidFailToReceiveAdWithError={this.bannerError}
                    onAdViewDidReceiveAd = {this.bannerAdReceived} />
                {/*//ca-app-pub-8731014179800764/4768542227 identyfikator jednoski rreklamowej*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: Colors.secondary,
        width:'100%'
    },
    bannerAd: {
        position: "absolute",
    },
    interstitialBanner: {
        width: "100%",
        marginLeft: 0,
        padding:30,


    },
    rewardedBanner: {
        width: "100%",
        marginLeft: 0,
        color: '#00FFFF'
    },
    info:{
        marginBottom: 60,
        fontSize: 16,
        textAlign:'center',
        color: Colors.light
    }
});
