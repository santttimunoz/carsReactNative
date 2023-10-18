import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from "./components/LogIn/LogIn.js"
import Cars from './components/Cars/Cars.js'
import Rents from './components/Rents/Rents.js';
import SignUp from './components/SignUp/SignUp.js';
import ListCars from './components/ListCars/ListCars.js';
import { AppProvider } from './components/appProvider/AppProvider.js';

export default function App() {

  const Stack = createNativeStackNavigator()
  const [users, setUsers] = useState([])
  const [rents, setRents] = useState([])
  const [cars, setCars] = useState([])

  return (   
    <AppProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='App'
      >
        <Stack.Screen name="LogIn" component={LogIn}
         options={{
          gestureEnabled: false, // Deshabilitar el deslizamiento horizontal en esta pantalla          
        }}/>          
        <Stack.Screen name="Cars" component={Cars}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="Rents" component={Rents}/>
        <Stack.Screen name="ListCars" component={ListCars}/>
      </Stack.Navigator>
    </NavigationContainer>
      </AppProvider>      
  );
}


