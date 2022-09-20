import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import { Text, ListItem, Left, Body, Thumbnail, Icon } from 'native-base';
import database from '@react-native-firebase/database';
import Rating from '../Rating/Rating';
import moment from 'moment';
import avatar from '../../assets/images/avatar.jpg';
import styles from './style';
import Colors from '../../constants/Colors';

const ReviewItem = props => {
    const { 
        navigation, 
        review, 
        profileFlag, 
        index, 
        setEditMode, 
        setEditReviewIndex, 
        setDeleteMode, 
        setDeletedReviewIndex,
    } = props;
    const { userId } = useSelector(state => state.user);
    const [autorName, setAutorName] = useState();
    const [autorPhoto, setAutorPhoto] = useState();

    useEffect(() => {
        getAutorDetails()
    }, [review])

    const getAutorDetails = async () => {
        if (!profileFlag) {
            const snapshot = await database().ref(`/users/${review.userId}`).once('value')
            const autor = snapshot.val();
            setAutorName(autor.userName)
            setAutorPhoto(autor.userPhoto);
        }
    }

    const navigateToCocktail = () => {
        navigation.navigate('CocktailDetails', {
            id: review.idDrink,
            name: review.strDrink
        })
    }

    const navigateToProfile = () => {
        if (!profileFlag) {
            navigation.navigate('Profile', { userId: review.userId })
        }
    }

    const selectItem = () => {
        if (profileFlag) {
            navigateToCocktail()
        } 
    }

    const handleEdit = () => {
        setEditMode(true)
        setEditReviewIndex(index)
    }

    const handleDelete = () => {
        setDeleteMode(true)
        setDeletedReviewIndex(index)
    }

    const thumbnailStyles = {
        marginLeft: profileFlag ? 0 : 8,
        width: profileFlag ? 70 : 60,
        height: profileFlag ? 70 : 60,
        borderRadius: profileFlag ? 10 : 30,
    }

    return (
        <ListItem onPress={selectItem} style={styles.listItem} thumbnail>
            <Left style={styles.avatarContainer}>
                <TouchableOpacity onPress={navigateToProfile}>
                    <Thumbnail
                        style={thumbnailStyles}
                        source={profileFlag ? { uri: review.strDrinkThumb } :autorPhoto ? { uri: autorPhoto } : avatar}
                    />
                </TouchableOpacity>
            </Left>
            <Body style={styles.reviewBody}>
                <Text onPress={navigateToProfile} style={styles.reviewAutor}>{profileFlag ? review.strDrink : autorName}</Text>
                <Text style={styles.reviewContent}>{review.content}</Text>
                <View style={styles.bottomLine}>
                    {userId === review.userId && !profileFlag ?
                        <View style={styles.actionsContainer}>
                            <TouchableOpacity style={{...styles.action, backgroundColor: Colors.warning }} onPress={handleEdit}>
                                <Icon type="MaterialCommunityIcons" name={'pencil'} style={styles.actionIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{...styles.action, backgroundColor: Colors.danger }} onPress={handleDelete}>
                                <Icon type="MaterialCommunityIcons" name={'trash-can'} style={styles.actionIcon} />
                            </TouchableOpacity>
                        </View>
                        :
                        <View></View>
                    }
                    <View></View>
                    <Text note style={styles.reviewTimeText}>{moment(review.date).fromNow()}</Text>
                </View>
            </Body>
            <View>
                <View style={styles.reviewRatingContainer}>
                    <Rating rating={review.rating} hideCounter />
                </View>
            </View>
        </ListItem>
    )
}

export default ReviewItem;