import React, {useEffect} from 'react';
const {NavigationContainer} = require('@react-navigation/native');
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  SplashScreen,
  WelcomeScreen,
  SigninScreen,
  SignupScreen,
  ForgotPasswordScreen,
  RegisterPhoneScreen,
  VerificationScreen,
  HomeScreen,
  DashBoardScreen,
  AddedRestaurantsScreen,
  RestaurantAddScreen,
  RestaurantEditScreen,
  RestaurantScreen,
} from '../screens';
import {useSelector, useDispatch} from 'react-redux';
import {GeneralAction} from '../actions';
const Stack = createNativeStackNavigator();

const Navigators = () => {
  const {isAppLoading, token, isFirstTimeUse} = useSelector(
    state => state.generalState,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GeneralAction.appStart());
  }, []);
  // console.log("Token", token)
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAppLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : !token || token === null || token === '' ? (
          <>
            {isFirstTimeUse && (
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
            )}
            <Stack.Screen name="SignIn" component={SigninScreen} />
            <Stack.Screen name="SignUp" component={SignupScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name="RegisterPhone"
              component={RegisterPhoneScreen}
            />
            <Stack.Screen name="Verification" component={VerificationScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={DashBoardScreen} />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} />
            <Stack.Screen
              name="RestaurantAdd"
              component={RestaurantAddScreen}
            />
            <Stack.Screen
              name="AddedRestaurantsList"
              component={AddedRestaurantsScreen}
            />
            <Stack.Screen name="SignUp" component={SignupScreen} />
            <Stack.Screen
              name="ResaurantEdit"
              component={RestaurantEditScreen}
            />

            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigators;
