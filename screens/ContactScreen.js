import React from 'react';
import {View, Text, Button, StyleSheet, Platform} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import Colors from "../constants/Colors";
import BannerAdd from "../components/Adds/BannerAdd";
import email from 'react-native-email'
import ElementItem from "../components/elements/ElementItem";

const ContactScreen = props => {
    const handleEmail = () => {
        const to = ['kontakt@myblackmirror.pl'] // string or array of email addresses
        email(to, {
            // Optional additional arguments

            subject: 'Wiadomość z aplikacji myBlackMirror',
            // body: 'Some body right here'
        }).catch(console.error)
    }
    return (
        <>
            <BannerAdd/>
            <View style={styles.container}>
                <Text style={styles.info}>
                    Nieprzerwanie pracujemy nad rozwojem projektu, więc jeżeli znalazłeś jakiś błąd lub po prostu chcesz
                    o coś zapytać to skontaktuj się z nami za pomocą przycisku "NAPISZ DO NAS".
                </Text>

                <Text style={styles.info}>
                    Postaramy się odpowiedzieć na Twoje zgłoszenie tak szybko jak będzie to możliwe.
                </Text>
                <View style={styles.vievButton}>
                    <Button
                        color={Platform.OS === 'android' ? Colors.secondary : 'white'}
                        title="NAPISZ DO NAS"
                        onPress={handleEmail}
                    />
                </View>
                <Text style={styles.info}>Wysyłając e-mail wyrażasz zgodę na przetwarzanie danych osobowych przez Ameby
                    DEV Group.
                    Przyjmuję równocześnie do wiadomości, że dane będą przetwarzane w celu obsługi zgłoszenia.
                    Osoba, której dane dotyczą, ma prawo dostępu do treści swoich danych oraz prawo ich poprawiania
                    oraz wniesienia sprzeciwu w przypadku przetwarzania danych w innych celach. Podanie danych jest
                    dobrowolne, lecz niezbędne do wysłania zgłoszenia.</Text>
            </View>
        </>
    );
};

ContactScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Kontakt',
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
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.secondary,

    }, container: {
        flex: 1,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',

    }, writeTo: {
        fontFamily: 'Quicksand',
        color: Colors.primary,
        backgroundColor: 'black',
        borderBottomColor: 'white'
    }, info: {
        color: Colors.light,
        fontFamily: 'Quicksand',
        padding: 15,

    }, vievButton: {
        backgroundColor: Colors.tertiary2,
        borderRadius: 5,
    }
});

export default ContactScreen;
