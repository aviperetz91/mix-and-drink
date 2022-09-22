import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Rating as RNERating } from 'react-native-elements';
import Colors from '../../constants/Colors';

const Rating = props => {

    const { rating, counter, large, hideCounter } = props;

    return (
        <View style={styles.ratingContainer}>
            <Text style={styles.ratingValue}>{`${rating ? rating.toFixed(1) : 0}  `}</Text>
            <RNERating
                readonly
                type="custom"                
                startingValue={rating ? rating : 0}
                showRating={false}
                imageSize={large ? 18 : 16}
            />
            {!hideCounter && <Text style={styles.ratingValue}>{counter ? `  (${counter})` : `  (0)`}</Text>}
        </View>

    );
}

const styles = StyleSheet.create({
    ratingContainer: {
        marginTop: 6,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    ratingValue: {
        fontSize: 13,
        fontWeight: 'bold',
        color: Colors.lightGrey
    }
})


export default Rating;