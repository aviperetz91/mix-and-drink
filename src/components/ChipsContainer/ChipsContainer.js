import React, { Fragment } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { Chip } from 'react-native-paper';
import styles from './style';


const ChipsContainer = props => {
    const { checkedIngredients, removeFromCheckList, submitHandler, clearCheckList } = props;
    if (checkedIngredients.length > 0) {
        return (
            <Fragment>
                <View style={styles.chipsContainer}>
                    {checkedIngredients.map((ingredient, index) => (
                        <Chip 
                            key={index}
                            icon="close-circle"
                            onPress={() => removeFromCheckList(ingredient)}
                            mode={'outlined'}
                            textStyle={styles.chipText}
                            style={styles.chip}
                        >
                            {ingredient}
                        </Chip>
                    ))}
                </View>
                <View style={styles.buttonsRow}>
                    <Button
                        style={styles.button}
                        danger
                        small
                        textStyle={styles.buttonText}
                        onPress={clearCheckList}
                    >
                        <Text style={styles.buttonText}>
                            Clear
                        </Text>
                    </Button>
                    <Button
                        style={styles.button}
                        success
                        small
                        textStyle={styles.buttonText}
                        onPress={() => submitHandler(checkedIngredients)}
                    >
                        <Text style={styles.buttonText}>
                            Find
                        </Text>
                    </Button>
                </View>
            </Fragment>
        )
    } else {
        return null;
    }
}

export default ChipsContainer;