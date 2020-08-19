import React, { useState, useEffect, AuthContext } from 'react';
import { Text, View, TouchableHighlight,Button, Alert, AsyncStorage, ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import * as Facebook from 'expo-facebook';
import { TouchableOpacity } from 'react-native-gesture-handler';
function HomeScreen({navigation}) {
  async function logIn() {
    try {
      await Facebook.initializeAsync('384648608904978');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Đăng nhập thành công!', `Hi ${(await response.json()).name}!`);
        navigation.navigate('Main');
        await AsyncStorage.setItem('@token', token);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
      }}>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 300,
        }}
      />
      <TouchableHighlight onPress={logIn}>
      <LinearGradient
        // Button Linear Gradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
        <Text
          style={{
            backgroundColor: 'transparent',
            fontSize: 15,
            color: '#fff',
          }}>
          Đăng Nhập Facebook
        </Text>
      </LinearGradient>
      </TouchableHighlight>
    </View>
  );
}

function SettingsScreen({navigation}) {
  async function logOut (){
    try {
      const value = await AsyncStorage.getItem('@token');
      if (value !== null) {
        // We have data!!
        await AsyncStorage.removeItem('@token');
        const thu = await AsyncStorage.getItem('@token');
        console.log('Đăng xuất thành công');
      }
      else{
        console.log('Tài khoản đã đăng xuất')
      }
    } catch (error) {
      // Error retrieving data
      Alert('lỗi');
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
      }}>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 300,
        }}
      />
      <TouchableHighlight onPress={logOut}>
      <LinearGradient
        // Button Linear Gradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
        <Text
          style={{
            backgroundColor: 'transparent',
            fontSize: 15,
            color: '#fff',
          }}>
          Đăng Xuất Facebook
        </Text>
      </LinearGradient>
      </TouchableHighlight>
    </View>
  );
}
function MainScreen({navigation}) {
  return(
  <View style={{flex: 1, justifyContent:"center", alignItems: "center"}}>
      <Text>Bạn Đã đăng nhập thành công</Text>  
  </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Main" component={MainScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// function HomeScreen({navigation}) {
//     async function logIn() {
//       try {
//         await Facebook.initializeAsync('384648608904978');
//         const {
//           type,
//           token,
//           expires,
//           permissions,
//           declinedPermissions,
//         } = await Facebook.logInWithReadPermissionsAsync({
//           permissions: ['public_profile'],
//         });
//         if (type === 'success') {
//           // Get the user's name using Facebook's Graph API
//           const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
//           Alert.alert('Đăng nhập thành công!', `Hi ${(await response.json()).name}!`);
//           navigation.navigate('Main');
//           await AsyncStorage.setItem('@token', token);
//           await AsyncStorage.setItem('@status', "đăng nhập");
//         } else {
//           // type === 'cancel'
//         }
//       } catch ({ message }) {
//         alert(`Facebook Login Error: ${message}`);
//       }
//     }
//     return (
//       <View
//         style={{
//           flex: 1,
//           alignItems: 'center',
//           justifyContent: 'center',
//           backgroundColor: 'orange',
//         }}>
//         <LinearGradient
//           // Background Linear Gradient
//           colors={['rgba(0,0,0,0.8)', 'transparent']}
//           style={{
//             position: 'absolute',
//             left: 0,
//             right: 0,
//             top: 0,
//             height: 300,
//           }}
//         />
//         <TouchableHighlight onPress={logIn}>
//         <LinearGradient
//           // Button Linear Gradient
//           colors={['#4c669f', '#3b5998', '#192f6a']}
//           style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
//           <Text
//             style={{
//               backgroundColor: 'transparent',
//               fontSize: 15,
//               color: '#fff',
//             }}>
//             Đăng Nhập Facebook
//           </Text>
//         </LinearGradient>
//         </TouchableHighlight>
//       </View>
//     );
//   }

//   function MainScreen({navigation}) {
//   return(
//   <View style={{flex: 1, justifyContent:"center", alignItems: "center"}}>
//       <Text>Bạn Đã đăng nhập thành công</Text>  
//   </View>
//   );
// }

// export default function App({ navigation }) {
//   const [state, dispatch] = React.useReducer(
//     (prevState, action) => {
//       switch (action.type) {
//         case 'RESTORE_TOKEN':
//           return {
//             ...prevState,
//             userToken: action.token,
//             isLoading: false,
//           };
//         case 'SIGN_IN':
//           return {
//             ...prevState,
//             isSignout: false,
//             userToken: action.token,
//           };
//         case 'SIGN_OUT':
//           return {
//             ...prevState,
//             isSignout: true,
//             userToken: null,
//           };
//       }
//     },
//     {
//       isLoading: true,
//       isSignout: false,
//       userToken: null,
//     }
//   );

//   React.useEffect(() => {
//     // Fetch the token from storage then navigate to our appropriate place
//     const bootstrapAsync = async () => {
//       let userToken;

//       try {
//         userToken = await AsyncStorage.getItem('userToken');
//       } catch (e) {
//         // Restoring token failed
//       }

//       // After restoring token, we may need to validate it in production apps

//       // This will switch to the App screen or Auth screen and this loading
//       // screen will be unmounted and thrown away.
//       dispatch({ type: 'RESTORE_TOKEN', token: userToken });
//     };

//     bootstrapAsync();
//   }, []);

//   const authContext = React.useMemo(
//     () => ({
//       signIn: async data => {
//         // In a production app, we need to send some data (usually username, password) to server and get a token
//         // We will also need to handle errors if sign in failed
//         // After getting token, we need to persist the token using `AsyncStorage`
//         // In the example, we'll use a dummy token

//         dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
//       },
//       signOut: () => dispatch({ type: 'SIGN_OUT' }),
//       signUp: async data => {
//         // In a production app, we need to send user data to server and get a token
//         // We will also need to handle errors if sign up failed
//         // After getting token, we need to persist the token using `AsyncStorage`
//         // In the example, we'll use a dummy token

//         dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
//       },
//     }),
//     []
//   );

//   return (
//     <AuthContext.Provider value={authContext}>
//       <Stack.Navigator>
//         {state.userToken == null ? (
//           <Stack.Screen name="SignIn" component={HomeScreen} />
//         ) : (
//           <Stack.Screen name="Home" component={MainScreen} />
//         )}
//       </Stack.Navigator>
//     </AuthContext.Provider>
//   );
// }