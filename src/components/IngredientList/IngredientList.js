import React, { Fragment } from 'react';
import { FlatList } from 'react-native';
import IngredientElement from '../IngredientElement/IngredientElement';
import IngredientItem from '../IngredientItem/IngredientItem';


const IngredientList = props => {
    const { ingredientList, isPreviewMode, selectHandler, checkedIngredients, selectedCocktail } = props;
    const list = selectedCocktail ? selectedCocktail.ingredientList : ingredientList;
    const preview_ingredients_number = 4;
    
    if(selectedCocktail) {
        return (
            <Fragment>
                {list.map((ingredient, index) => {
                    return (
                        <IngredientItem 
                            key={index.toString()} 
                            ingredient={ingredient} 
                            index={index} 
                            selectedCocktail={selectedCocktail}
                        /> 
                    )})} 
            </Fragment>
        )
    }
    
    return ( 
        <FlatList
            contentContainerStyle={{ backgroundColor: 'white' }}
            keyExtractor={(item, index) => index.toString()}
            data={isPreviewMode ? list : list.sort()}
            numColumns={isPreviewMode ? preview_ingredients_number : null}
            renderItem={({ item, index }) => isPreviewMode ? 
                <IngredientElement ingredient={item} selectHandler={selectHandler} /> :  
                <IngredientItem 
                    ingredient={item} 
                    index={index}
                    selectHandler={selectHandler} 
                    checkedIngredients={checkedIngredients} 
                />
            }
        />
    )
}

export default IngredientList;