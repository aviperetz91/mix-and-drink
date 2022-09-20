import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Thumbnail } from 'native-base';
import { IMAGES_URL } from '@env';
import styles from './style';


const IngredientElement = props => {
    const {ingredient, selectHandler} = props
    const str = ingredient.replace('-', ' ').split(' ');
    const firstWord = str[0];
    const secondWord = str[1];
    const thirdWord = str[2];
        return (
            <TouchableOpacity 
                style={styles.ingredientContainer} 
                onPress={() => selectHandler(ingredient)}>
                <Thumbnail
                    style={styles.ingredientThumbnail}
                    source={{ uri: `${IMAGES_URL}/ingredients/${ingredient}.png` }}
                    />
                <Text style={styles.ingredientText}>{firstWord}</Text>
                {secondWord && <Text style={styles.ingredientText}>{secondWord}</Text>}
                {thirdWord && <Text style={styles.ingredientText}>{thirdWord}</Text>}
            </TouchableOpacity>
    )
}

export default IngredientElement