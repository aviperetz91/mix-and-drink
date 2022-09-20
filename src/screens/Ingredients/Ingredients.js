import React, { Fragment, useState } from 'react';
import { Provider, Dialog, Portal, Title, Button as Btn } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { API_URL } from '@env';
import axios from 'axios';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import SearchBar from '../../components/SearchBar/SearchBar';
import IngredientList from '../../components/IngredientList/IngredientList';
import Colors from '../../constants/Colors';
import ChipsContainer from '../../components/ChipsContainer/ChipsContainer';

const Ingredients = props => {

    const { navigation, isPreviewMode } = props;
    const { ingredientList, cocktails } = useSelector(state => state.cocktails);
    const [searchInput, setSearchInput] = useState('');
    const [showMaximumIngredientModal, setShowMaximumIngredientModal] = useState(false);
    const [checkedIngredients, setCheckedIngredients] = useState([]);
    const preview_ingredients_number = 4;
    const checked_ingredients_limit = 5;

    const setDataToRender = () => {
        let data;
        if (isPreviewMode) {
            data = ingredientList.slice(0, preview_ingredients_number);
        } else {
            data = ingredientList.filter(ingredient => {
                return ingredient.toLowerCase().includes(searchInput.toLowerCase()) && 
                cocktails.some(cocktail => cocktail.ingredientList.some(ingr => ingr === ingredient))
            })
        }
        return data;
    }

    const selectHandler = (item) => {
        if (isPreviewMode) {
            submitHandler([item]);
        } else {
            addToCheckList(item)
        }
    }

    const addToCheckList = (ingredient) => {
        const isFound = checkedIngredients.some(ingr => ingr === ingredient);
        let updated;
        if (!isFound) {
            updated = [...checkedIngredients, ingredient]
            if (updated.length <= checked_ingredients_limit) {
                setCheckedIngredients(updated);
            } else {
                openModal();
            }
        }
    }

    const removeFromCheckList = (ingredient) => {
        const isFound = checkedIngredients.some(ingr => ingr === ingredient);
        let updated;
        if (isFound) {
            updated = checkedIngredients.filter(ingr => ingr !== ingredient)
            setCheckedIngredients(updated);
        } 
    }

    const clearCheckList = () => {
        setCheckedIngredients([]);
    }

    const submitHandler = async (checkedIngredients) => {
        const transformedList = [];
        let ingredientCocktailsTemp = [];
        let ingredientCocktails = [];
        checkedIngredients.forEach(ingr => transformedList.push(ingr.replace(' ', '_')));  
        let ingredientCocktailsResponse = await axios.get(`${API_URL}/filter.php?i=${transformedList.join(",")}`);
        ingredientCocktailsResponse = ingredientCocktailsResponse.data.drinks;
        if (Array.isArray(ingredientCocktailsResponse) && ingredientCocktailsResponse.length > 0) {
            ingredientCocktailsTemp = ingredientCocktailsResponse
        }
        ingredientCocktailsTemp.forEach((cocktail, index) => {
            const fullDetailedCocktail = cocktails.find(c => c.idDrink === cocktail.idDrink);
            ingredientCocktails[index] = fullDetailedCocktail;
        })
        navigation.navigate("Cocktails", {
            title: checkedIngredients.length === 1 ? checkedIngredients[0] : 'Multi Ingredient',
            cocktails: ingredientCocktails
        })
    }

    const goBack = () => {
        setSearchInput('');
        setCheckedIngredients([]);
        navigation.goBack();
    }
    
    const openModal = () => {
        setShowMaximumIngredientModal(true)
    }

    const closeModal = () => {
        setShowMaximumIngredientModal(false);
    }

    if (!ingredientList) {
        return (
            <LoadingScreen />
        )
    } else {
        return (
            <Fragment>
                <Provider>
                    {!isPreviewMode &&
                        <SearchBar
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                            closeSearch={goBack}
                            placeholder="Search Ingredient..."
                        />
                    }
                    <ChipsContainer 
                        checkedIngredients={checkedIngredients} 
                        removeFromCheckList={removeFromCheckList}
                        submitHandler={submitHandler}
                        clearCheckList={clearCheckList}
                    />
                    <IngredientList 
                        ingredientList={setDataToRender()} 
                        isPreviewMode={isPreviewMode}
                        selectHandler={selectHandler}
                        checkedIngredients={checkedIngredients}
                    />
                    <Portal>
                        <Dialog visible={showMaximumIngredientModal} onDismiss={closeModal}>
                            <Dialog.Content>
                                <Title>{`You can select a maximum of ${checked_ingredients_limit} ingredients`}</Title>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Btn color={Colors.link} onPress={closeModal}>Got it</Btn>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </Provider>
            </Fragment>
        )
    }
}

export default Ingredients;