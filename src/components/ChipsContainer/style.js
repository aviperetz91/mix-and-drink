import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    chipsContainer: {
        padding: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    chip: {
        margin: 3,
        borderColor: '#888'
    },
    chipText: {
        color: Colors.dark
    },
    buttonsRow: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },  
    button: {
        borderRadius: 2
    },
    buttonText: {
        color: 'white'
    }
});

export default styles;
