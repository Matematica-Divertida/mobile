import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import auth from '@react-native-firebase/auth';

import LoginView from './screens/Login';
import HomeView from './screens/Home';

enableScreens();

const ROOT = {
	OUTSIDE: 'OUTSIDE',
	INSIDE: 'INSIDE'
}

// LoginStack
const Login = createStackNavigator();
const LoginStack = () => (
	<Login.Navigator>
		<Login.Screen
			name='LoginView'
			component={LoginView}
		/>
	</Login.Navigator>
);

// HomeStack
const Home = createNativeStackNavigator();
const HomeStack = () => (
	<Home.Navigator screenOptions={{ headerLargeTitle: true }}>
		<Home.Screen
			name='HomeView'
			component={HomeView}
		/>
	</Home.Navigator>
);

// InsideTab
const Inside = createBottomTabNavigator();
const InsideTab = () => (
	<Inside.Navigator>
		<Inside.Screen
			name='Home'
			component={HomeStack}
		/>
		<Inside.Screen
			name='Settings'
			component={HomeStack}
		/>
	</Inside.Navigator>
);

const Root = ({ root, login, logout }) => {

	React.useEffect(() => {
		auth().onAuthStateChanged((user) => {
			if (user) {
				login();
			} else {
				logout();
			}
		});
	}, []);

	return (
		<NavigationContainer>
			{
				root === ROOT.OUTSIDE
					? <LoginStack />
					: <InsideTab />
			}
		</NavigationContainer>
	);
};
Root.propTypes = {
  root: PropTypes.string
};

const mapStateToProps = (state) => ({
	root: state.app.root
});
const mapDispatchToProps = (dispatch) => ({
	login: () => dispatch({ type: 'LOGIN' }),
	logout: () => dispatch({ type: 'LOGOUT' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);