import Element from '../models/element';

// https://imgur.com/033cdUt ZTM
// https://imgur.com/se4xKMB
// https://imgur.com/wkuuZPa
// https://imgur.com/kzMYmxn
// https://imgur.com/02bH6VA
// https://imgur.com/2ff6NqD
// https://imgur.com/uAEYQtQ
// https://imgur.com/3misBjA
// https://imgur.com/rb2Ii85

const ELEMENTS = [
    new Element(
        'p1',
        'u1',
        'CZAS',
        'https://i.imgur.com/033cdUt.png',
        'TimeScreen',

    ),
    new Element(
        'p2',
        'u1',
        'POGODA',
        'https://i.imgur.com/rb2Ii85.png',
        'WeatherScreen',
    ),
    new Element(
        'p3',
        'u1',
        'WIADOMOŚCI',
        'https://i.imgur.com/kzMYmxn.png',
        'NewsScreen',
    ),
    new Element(
        'p4',
        'u1',
        'LISTA ZADAN',
        'https://i.imgur.com/se4xKMB.png',
        "TaskScreen",
    ),
    new Element(
        'p5',
        'u1',
        'KALENDARZ',
        'https://i.imgur.com/2ff6NqD.png',
        'CalendarScreen',
    ),
    new Element(
        'p6',
        'u1',
        'JAKOŚC POWIETRZA',
        'https://i.imgur.com/uAEYQtQ.png',
        "AirScreen",
    ),
    new Element(
        'p7',
        'u1',
        'STATYSTYKI COVID',
        'https://i.imgur.com/02bH6VA.png',
        "CovidScreen",
    ),
    // new Elem(
    //     'p8',
    //     'u1',
    //     'STATYSTYKI COVID',
    //     'https://i.imgur.com/3misBjA.png',
    //     "Ustawienia pogody",
    // )
];



export default ELEMENTS;
