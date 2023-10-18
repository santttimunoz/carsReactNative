import { Text, TextInput, Button } from "react-native-paper"
import { useState } from "react";
import { View } from "react-native";
import { styles } from "../../assets/styles/styles";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../appProvider/AppProvider";
import { Ventana } from "../Ventana/Ventana";
import ListCars from "../ListCars/ListCars";

export  default function Cars(){ 
    
    const [plateNumber, setPlateNumber] = useState('')
    const [brand, setBrand] = useState('')
    const [state, setState] = useState('')
    const {cars, setCars} = useAppContext()
    const {users, setUsers} = useAppContext()
    const[modalVisible, setModalVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigation = useNavigation()

    const closeModal = ()=>{
        setModalVisible(false)
    }    

    for(let obj of users){
        var user = obj.username
    }

    function guardar(){
        const car = {
            plateNumber: plateNumber,
            brand: brand,
            state: state
        }
        let carExist = cars.some(carExist => carExist.plateNumber === car.plateNumber)
        if(plateNumber == "" || brand == ""){
            setErrorMessage("llenar los campos")
            setModalVisible(true)
        }else if(carExist){
            setErrorMessage("vehiculo existente")
            setModalVisible(true)
        }else{
            setErrorMessage("vehiculo guardado")
            setModalVisible(true)
            setCars([...cars, car])
            setPlateNumber('')
            setBrand('')
            setState('')
        }
    }
    

    return(        
        <View style={styles.container}>
            <Text>Hola <Text style={{fontWeight:"bold", fontSize:20}}>{user}</Text>, bienvenido al Registro de vehiculos</Text>            
            <View style={{ padding:50 }}>
            <TextInput
                 autoFocus
                 label="plateNumber"
                 left={<TextInput.Icon icon="account" />}
                 onChangeText={(plateNumber) => setPlateNumber(plateNumber)}
                 value={plateNumber}
                 />
                <TextInput
                style={{marginTop:10}}
                 autoFocus
                 label="brand"
                 left={<TextInput.Icon icon="account" />}
                 onChangeText={(brand) => setBrand(brand)}
                 value={brand}/>
                 <TextInput
                  style={{ marginTop: 10 }}
                 autoFocus
                 label="state"
                 left={<TextInput.Icon icon="lock" />}
                 onChangeText={(state) => setState(state)}
                 value={state}/>                  
                 <Button
                    style={{ marginTop: 20, backgroundColor: 'blue' }}                   
                    labelStyle={{color:'white'}}
                    //mode="outlined"
                    onPress={()=>guardar()}
                >
                    ingresar
                </Button> 
                {modalVisible && <Ventana modalVisible={modalVisible} closeModal={closeModal} message={errorMessage}/>}
                <Text style={{ marginTop: 10}}>Quieres rentar un vehiculo?{' '}
                <Text style={{color:'blue', fontWeight:"bold"}} onPress={()=> navigation.navigate('Rents')}>
                     Ir a Rentas
                    </Text>
                    </Text>   
                <ListCars/>
            </View>
        </View>
    )    
}