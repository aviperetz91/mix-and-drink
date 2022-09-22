import { StyleSheet, Platform, StatusBar } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageContainer: {        
        backgroundColor: 'black',
    },
    image: {
        width: "100%",
        height: 330,
    },
    backButton: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        position: 'absolute',
        left: 6,
        top: Platform.OS === 'android' ? StatusBar.currentHeight + 5 : 46,
    },
    homeButton: {
        position: 'absolute',
        right: 6,
        top: 25,
        padding: 15,
    },
    favoriteButton: {
        position: 'absolute',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        top: 290,
        right: 30,
        width: 45,
        height: 45,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    },
    info: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 3,
        color: 'black',
        fontWeight: 'bold',
        letterSpacing: 1
    },
    tabBarUnderline: {
        backgroundColor: 'black',
        height: 1
    },
    whiteBack: {
        backgroundColor: 'white',
    },
    textMuted: {
        color: '#a7a7a7'
    },
    marginTop: {
        marginTop: 10
    },
    activeTabText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16
    },
    detailsContainer: {
        padding: 20,
        paddingTop: 10
    },
    detailsContent: {
        fontSize: 16,
        lineHeight: 30
    },
    detailsTitle: {
        color: '#444',
    },
    ingredientImage: {
        width: 50,
        height: 50,
        marginRight: 7,
        alignItems: "center",
    },
    listItemImg: {
        fontSize: 16,
        alignSelf: 'center'
    },
    listItemTitle: {
        fontSize: 16,
    },
    addButton: {
        backgroundColor: Colors.success,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 68,
        width: 68,
        borderRadius: 50,
        position: 'absolute',
        zIndex: 100,
        top: '90%',
        right: 15
    },
    heartIcon: {
        fontSize: 26, 
        color: 'red'
    },
    arrowBackIcon: {
        fontSize: 29, 
        color: 'white'
    },
    homeIcon: {
        fontSize: 25, 
        color: 'white'
    },
    addIcon: {
        fontSize: 42, 
        color: 'white'
    },
    itemNote: {
        fontSize: 14,
        color: '#a7a7a7'
    },
})

export default styles;