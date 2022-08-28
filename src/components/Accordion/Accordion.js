import React, { useState } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Spinner } from 'native-base';
import { CheckBox, Icon } from 'react-native-elements';
import styles from './style';
import Colors from '../../constants/Colors';

const Accordion = props => {

    const { list, isMultiSelect, selected, checkedList, selectHandler } = props;
    const [isPressed, setIsPressed] = useState(false);

    const renderItem = (item) => {
        const checked = isMultiSelect ? checkedList.some(el => el === item) : item === selected;
        if (isMultiSelect) {
            return (
                <CheckBox
                    containerStyle={styles.checkboxContainer}
                    title={item}
                    checkedColor={'white'}
                    checked={checked}
                    onPress={() => selectHandler(item)}
                    textStyle={{...styles.checkboxText, color: checked ? 'white' : '#a7a7a7' }}
                />
            )
        } else {
            return (
                <CheckBox
                    containerStyle={styles.checkboxContainer}
                    title={item}
                    checkedColor={'white'}
                    checkedIcon={
                        <Icon
                          name="radio-button-checked"
                          type="material"
                          color="white"
                          size={25}
                          iconStyle={{ marginRight: 10 }}
                        />
                      }
                      uncheckedIcon={
                        <Icon
                          name="radio-button-unchecked"
                          type="material"
                          color="#a7a7a7"
                          size={25}
                          iconStyle={{ marginRight: 10 }}
                        />
                      }
                    checked={checked}
                    onPress={() => selectHandler(item)}
                    textStyle={{...styles.checkboxText, color: checked ? 'white' : '#a7a7a7' }}
                />
            )
        }
        
    }

    return (
        <View style={styles.accordion}>
            <TouchableWithoutFeedback onPress={() => setIsPressed(!isPressed)}>
                <View style={isPressed ? styles.accordionHeader : { ...styles.accordionHeader, borderBottomWidth: 3 }}>
                    <Text style={styles.accordionHeaderText}>
                        {props.title}
                    </Text>
                    <Icon type={'ionicon'} name={isPressed ? 'chevron-up' : 'chevron-down'} size={17} color={'white'} />
                </View>
            </TouchableWithoutFeedback>
            {isPressed ?
                <View style={styles.accordionBody}>
                    {list && list.length > 0 ?
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={list}
                            renderItem={({ item }) => renderItem(item)}
                        />
                        :
                        <Spinner color={Colors.dark} />
                    }
                </View>
                : null}
        </View>
    );
};

export default Accordion;