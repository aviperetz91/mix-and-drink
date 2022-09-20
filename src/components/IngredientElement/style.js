import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    ingredientContainer: {
        marginBottom: 12,
        marginHorizontal: 2,
        paddingTop: 8,
        paddingBottom: 8
    },
    ingredientThumbnail: {
        width: 90,
        height: 90,
    },
    ingredientText: {
        marginTop: 8,
        textAlign: 'center',
        fontSize: 14,
        color: Colors.dark,
        fontWeight: 'bold',
    },
})

export default styles;