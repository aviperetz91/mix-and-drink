import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    chipsContainer: {
        backgroundColor: 'black',
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
        backgroundColor: 'black',
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
        textTransform: 'uppercase',
        color: 'white'
    }
});

export default styles;
