import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Icon, Header } from 'native-base';
import CocktailItem from '../../components/CocktailItem/CocktailItem';
import { SearchBar } from 'react-native-elements';
import { getCocktailByName, clearData } from '../../store/actions/CocktailsActions';
import styles from './style';
import Colors from '../../constants/Colors'

const Search = props => {

    const navigation = props.navigation;
    const [searchInput, setSearchInput] = useState('');
    const searchResults = useSelector(state => state.cocktails.searchResults)
    const searchBarRef = React.createRef();

    const dispatch = useDispatch();

    const searchHandler = input => {
        if (input === '') {
            dispatch(clearData('searchResults'))
        } else {
            dispatch(getCocktailByName(input))
        }
    }

    const goBack = () => {
        setSearchInput('');
        dispatch(clearData('searchResults'));
        navigation.goBack();
    }

    const navigate = (item) => {
        navigation.navigate('CocktailDetails', {
            id: item.idDrink,
            name: item.strDrink
        })
    }

    const changeTextHandler = (input) => {
        setSearchInput(input);
        searchHandler(input);
    }

    return (
        <View style={styles.screen}>
            <Header 
                style={styles.header} 
                androidStatusBarColor={"white"} 
                iosBarStyle={"dark-content"}
            />
            <SearchBar
                ref={searchBarRef}
                placeholder="Search..."
                onChangeText={(input) => changeTextHandler(input)}
                value={searchInput}
                searchIcon={
                    <TouchableOpacity onPress={goBack}>
                        <Icon name='arrow-back' style={styles.arrowBack} />
                    </TouchableOpacity>
                }
                lightTheme
                containerStyle={styles.searchBar}
                inputContainerStyle={styles.input}
            />
            <FlatList
                keyExtractor={(item) => item.idDrink}
                data={searchResults}
                renderItem={({ item }) => (
                    <CocktailItem
                        title={item.strDrink}
                        image={item.strDrinkThumb}
                        tags={item.strTags}
                        onSelect={() => navigate(item)}
                    />
                )}
            />
        </View >
    );
}

export default Search;