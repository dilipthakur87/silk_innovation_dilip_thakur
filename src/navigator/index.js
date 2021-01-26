import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../containers/Dashboard'
import AuthNavigator from './AuthNavigator'

const Stack = createStackNavigator()

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Auth"
                component={AuthNavigator}
                options={{ headerShown: false}}
            />
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    title: 'Dashboard', //Set Header Title
                    headerStyle: {
                      backgroundColor: '#307ecc', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                      fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    )
}

export default StackNavigator