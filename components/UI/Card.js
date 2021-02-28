import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    // shadowColor: 'black',
    shadowOpacity: 0,
    shadowOffset: { width: 0, height:0 },
    shadowRadius: 0,
    elevation: 0,
  }
});

export default Card;
