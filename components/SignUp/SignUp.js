import { useState } from "react"
import { Text, TextInput, Button } from "react-native-paper"
import { styles } from "../../assets/styles/styles"
import { useNavigation } from "@react-navigation/native"
import { View } from "react-native"
import { useAppContext } from "../appProvider/AppProvider"
import { Ventana } from "../Ventana/Ventana"

export default function SignUp(){
    
    const [userName, setUserName] = useState('')
    const [name, setName] = useState('')
    const [password, setPasword] = useState('')    
    const[modalVisible, setModalVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const {users, setUsers} = useAppContext()    

    const navigation = useNavigation()

    const closeModal = ()=>{
        setModalVisible(false)
    }        

            function guardar() {
                
                const letrasNumeros = /^[a-zA-Z0-9]+$/
                const letrasEspacios = /^[a-zA-Z\s]+$/

                if (userName === '' || name === '' || password === '') {
                    setErrorMessage('Llenar todos los campos')
                    setModalVisible(true)
                  } else if (!letrasNumeros.test(userName)) {
                    setErrorMessage('Nombre de usuario debe contener solo letras y numeros');
                    setModalVisible(true)
                  } else if(!letrasEspacios.test(name)){
                    setErrorMessage('El nombre solo debe tener letras y espacios');
                    setModalVisible(true)
                  }else if (!letrasNumeros.test(password)) {
                    setErrorMessage('Contraseña debe contener solo letras y números');
                    setModalVisible(true)
                  } else {
                    // Crear un nuevo usuario
                    const user = {
                      username: userName,
                      name: name,
                      password: password,
                    };              
                    // Comprobar si el usuario ya existe en la lista
                    const userExists = users.some((existingUser) => existingUser.username === user.username);              
                    if (userExists) {
                      setErrorMessage('Usuario existente');
                      setModalVisible(true);
                    } else {
                      // Agregar el nuevo usuario solo si no existe
                      setErrorMessage('Usuario guardado');
                      setModalVisible(true);
                      setUsers([...users, user]);
                      setName('')
                      setUserName('')
                      setPasword('')
                      console.log(users);
                    }
                  }
                               
              }

    return(        
        <View style={styles.container}>
            <Text>Hola bienvenido al Registro</Text>
            <View style={{ padding:50 }}>
            <TextInput
                 autoFocus
                 label="name"
                 left={<TextInput.Icon icon="account" />}
                 onChangeText={(name) => setName(name)}
                 value={name}/>
                <TextInput
                style={{marginTop:10}}
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
                 onChangeText={(password) => setPasword(password)}
                 value={password}/> 
                 <Button
                    style={{ marginTop: 20, backgroundColor: 'blue' }}                   
                    labelStyle={{color:'white'}}
                    mode="outlined"
                    onPress={()=>guardar()}
                >
                   Registrar
                </Button> 
                <Text style={{ marginTop: 10}}>Ya tienes una cuenta?{' '}
                <Text style={{color:'blue', fontWeight:"bold"}}  onPress={()=> navigation.navigate('LogIn')}>
                     Inicia Sesion
                    </Text>
                    </Text> 
                    {modalVisible && <Ventana modalVisible={modalVisible} closeModal={closeModal} message={errorMessage}/>}
                    
            </View>
        </View>
    )
}