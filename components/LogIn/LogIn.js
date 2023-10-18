import { useState } from "react";
import { View, Text, useAnimatedValue } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { styles } from "../../assets/styles/styles";
import { SignUp } from '../SignUp/SignUp.js'
import { Ventana } from "../Ventana/Ventana";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../appProvider/AppProvider";

export default function LogIn(){

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const {users, setUsers} = useAppContext()
    const[modalVisible, setModalVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showPass, setShowPass] = useState(false)
    const navigation = useNavigation() 

    const closeModal = () =>{
        setModalVisible(false)
    }

    function ingresar(){    
       

        const user = users.find(ingreso => ingreso.username === userName)
        const pass = users.find(ingreso => ingreso.password === password)
            if(userName == "" || password == ""){
               setErrorMessage("llenar campos")
                setModalVisible(true) 
            }else if(user && pass){
                navigation.navigate('Cars')
                setUserName('')
                setPassword('')
            }else if(user && !pass){
                setErrorMessage("contraseña incorrecta")
                setModalVisible(true)
            }else if(!user){
                setErrorMessage("usuario no existe")
                setModalVisible(true)
            }
       
}
    return(
        <View style={styles.container}>
            <Text>Hola bienvenido al Inicio de Sesion</Text>
            <View style={{ padding:50 }}>
                <TextInput
                 autoFocus
                 label="userName"
                 left={<TextInput.Icon icon="account" />}
                 onChangeText={(userName) => setUserName(userName)}
                 value={userName}/>
                 <TextInput
                  style={{ marginTop: 10 }}
                 autoFocus
                 label="Password"
                 left={<TextInput.Icon icon="lock" />}
                 onChangeText={(password) => setPassword(password)}
                 secureTextEntry={!showPass}
                 value={password}
                 right={<TextInput.Icon icon={showPass ? "eye" : "eye-off"} onPress={()=>setShowPass(!showPass)} />}/> 
                 <Button
                    style={{ marginTop: 20, backgroundColor: 'blue' }}                   
                    labelStyle={{color:'white'}}
                    //mode="outlined"
                    onPress={()=>ingresar()}
                >
                    ingresar
                </Button> 
                <Text style={{ marginTop: 10}}>No tienes una cuenta?{' '}
                <Text style={{color:'blue', fontWeight:"bold"}} onPress={()=> navigation.navigate('SignUp')}>
                    Registrate
                    </Text>
                    </Text> 
                    {modalVisible && <Ventana modalVisible={modalVisible} closeModal={closeModal} message={errorMessage}/>}           
            </View>
        </View>
    )
}