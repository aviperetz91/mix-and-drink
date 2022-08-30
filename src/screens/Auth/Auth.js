import React, { useState } from 'react';
import { View, ImageBackground, Platform, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Text, Input, Item, Icon, Spinner } from 'native-base';
import Header from '../../components/Header/Header';
import styles from './style';
import Colors from '../../constants/Colors';
import { signup, login, setAuthError } from '../../store/actions/UserActions';
import backImg from '../../assets/images/back.jpeg'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Auth = props => {

    const dispatch = useDispatch();
    const error = useSelector(state => state.user.authError)

    const [mode, setMode] = useState('login');
    const [isLoading, setIsLoading] = useState(false);
    const [info, setInfo] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    const changeTextHandler = (key, value) => {
        setInfo({
            ...info,
            [key]: value
        });
        dispatch(setAuthError(null));
    }

    const authHandler = async () => {
        dispatch(setAuthError(null));
        if (info.email === '' || info.password === '') {
            dispatch(setAuthError('Please enter the missing fields'))
        } else {
            setIsLoading(true);
            if (mode === 'signup') {
                await dispatch(signup(info.fullName, info.email, info.password))
            } else if (mode === 'login') {
                await dispatch(login(info.email, info.password))
            }
            setIsLoading(false)
        }
    }

    const changeMode = (mode) => {
        dispatch(setAuthError(null));
        setMode(mode)
    }

    return (
        <Container>
            <ImageBackground source={backImg} style={styles.backImg} blurRadius={Platform.OS === 'android' ? 6 : 16}>
                <View style={styles.imageInnerContent}>
                    <KeyboardAwareScrollView extraHeight={300} enableOnAndroid={true}>
                        <Header
                            headerBackground={'transparent'}
                            statusBarColor={'transparent'}
                            iosBarStyle={'light-content'}
                        />
                        <View style={styles.container}>
                            <View style={styles.colCenter}>
                                <Icon type="FontAwesome5" name="glass-martini-alt" style={styles.mainIcon} />
                                <Text style={styles.title}>Mix & Drink</Text>
                                <Text style={styles.subTitle}>Login or Create Your New Account</Text>
                            </View>
                            <View style={styles.m_y}>
                                {mode === 'signup' ?
                                    <Item style={styles.input} regular rounded >
                                        <Icon active name='person-outline' style={styles.textboxIcon} />
                                        <Input
                                            style={styles.inputText}
                                            value={info.fullName}
                                            placeholder="Full Name"
                                            placeholderTextColor={Colors.lightGrey}
                                            onChangeText={(input) => changeTextHandler('fullName', input)}
                                        />
                                    </Item>
                                    : null}
                                <Item style={styles.input} regular rounded>
                                    <Icon active name='mail-outline' style={styles.textboxIcon} />
                                    <Input
                                        style={styles.inputText}
                                        value={info.email}
                                        keyboardType="email-address"
                                        placeholder="Email Address"
                                        placeholderTextColor={Colors.lightGrey}
                                        onChangeText={(input) => changeTextHandler('email', input)}
                                    />
                                </Item>
                                <Item style={styles.input} regular rounded>
                                    <Icon active name='lock-closed-outline' style={styles.textboxIcon} />
                                    <Input
                                        style={styles.inputText}
                                        value={info.password}
                                        keyboardType="default"
                                        secureTextEntry
                                        placeholder="Password"
                                        placeholderTextColor={Colors.lightGrey}
                                        onChangeText={(input) => changeTextHandler('password', input)}
                                    />
                                </Item>
                            {mode === 'signup' && 
                                <Text style={styles.helperSmallText}>
                                    By Clicking "Sign Up" I agree that I have read and accepted the 
                                    <Text 
                                        style={styles.link}
                                        onPress={() => Linking.openURL('https://mixanddrink-user-agreement.herokuapp.com/')}
                                    > User Agreement</Text> & 
                                    <Text 
                                        style={styles.link}
                                        onPress={() => Linking.openURL('https://www.freeprivacypolicy.com/live/05699fea-b27e-4e4a-b9ab-2ce6e7fe239c')}
                                    > Privacy Policy</Text>.
                                </Text>
                            }
                            </View>
                            <View>
                                <Button
                                    style={styles.button}
                                    light
                                    block
                                    onPress={authHandler}
                                >
                                    <Text style={styles.buttonText}>
                                        {mode === 'login' ? 'Login' : 'Sign Up'}
                                    </Text>
                                </Button>
                                {mode === 'login' &&
                                    <Text style={styles.helperText}>Don't have an account?
                                    <Text onPress={() => changeMode('signup')} style={styles.modeText}>  Sign Up</Text>
                                    </Text>
                                }
                                {mode === 'signup' &&
                                    <Text style={styles.helperText}>Already have an account?
                                    <Text onPress={() => changeMode('login')} style={styles.modeText}>  Login</Text>
                                    </Text>}
                            </View>

                            {isLoading && <Spinner color={Colors.light} style={{ marginTop: 28 }} />}
                            {error &&
                                <View style={styles.alertContainer}>
                                    <Text style={styles.alertText}>{error.toString()}</Text>
                                </View>
                            }
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </ImageBackground>
        </Container>
    );
}

export default Auth;