import React from 'react';
import { Thumbnail, Text, Icon, ListItem, Left, Body, Right } from 'native-base';
import { IMAGES_URL } from '@env';
import styles from './style';


const IngredientItem = props => {
    const {ingredient, index, selectHandler, checkedIngredients, selectedCocktail} = props;
    const isChecked = checkedIngredients && checkedIngredients.some(ingr => ingr === ingredient);

    const getRightElement = () => {
        let rightElement;
        if (selectedCocktail) {
            rightElement = <Text note>{selectedCocktail.measureList[index]}</Text>;
        } else if (isChecked) {
            rightElement = (
                <Icon 
                    type="MaterialCommunityIcons" 
                    name="check-circle" 
                    style={styles.checkedIcon} 
                />
            )
        } else {
            rightElement = null;
        }
        return rightElement;
    }

    return (
        <ListItem thumbnail key={index} onPress={() => selectHandler ? selectHandler(ingredient): {}}>
            <Left>
                <Thumbnail source={{ uri: `${IMAGES_URL}/ingredients/${ingredient}.png` }} />
            </Left>
            <Body>
                <Text style={styles.bodyText}>{ingredient}</Text>
            </Body>
            <Right>
                <Text note>{getRightElement()}</Text>
            </Right>
        </ListItem>
    )
}

export default IngredientItem