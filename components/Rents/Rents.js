import { useState } from "react";
import { View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { styles } from "../../assets/styles/styles";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../appProvider/AppProvider";
import { Ventana } from "../Ventana/Ventana";

export default function Rents(){

    const [rentNumber, setRentNumber] = useState('')
    const [userName, setUserName] = useState('')
    const [plateNumber, setPlateNumber] = useState('')
    const [rentDate, setRentDate] = useState('')    
    const {users, setUser} = useAppContext() 
    const {cars, setCars} = useAppContext()
    const {rents, setRents} = useAppContext()    
    const [errorMessage, setErrorMessage] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation() 

    const closeModal = () => {
        setModalVisible(false);
      }

    function guardar(){
        const rent = {
            rentNumber: rentNumber,
            userName: userName,
            plateNumber: plateNumber,
            rentDate: rentDate
        }
        let rentExist = rents.some(rentExist => rentExist.rentNumber === rent.rentNumber)
        let carExist = cars.some(carExist => carExist.plateNumber === rent.plateNumber)              
        const userExists = users.some(existingUser => existingUser.username === rent.userName);

        if(plateNumber == "" || userName == "" || rentNumber == "" || rentDate == ""){
            setErrorMessage("llenar los campos")
            setModalVisible(true)
        }else if(rentExist && carExist){
            setErrorMessage("renta existente")
            setModalVisible(true)
        }else if(!userExists){
            setErrorMessage("usuario no existe")
            setModalVisible(true)
        }else if(!carExist){
            setErrorMessage("vehiculo no existe")
            setModalVisible(true)
        }else if(!rentExist && carExist && userExists){                               
            setErrorMessage("renta guardada")
            setModalVisible(true)                                             
            setRents([...rents, rent])
            console.log(rents)            
            setRentNumber('')
            setUserName('')
            setPlateNumber('')
            setRentDate('')                                      
        }
    }


    
    return(
        <View style={styles.container}>
            <Text>Hola bienvenido a la Renta de vehiculos</Text>
            <View style={{ padding:50 }}>
            <TextInput
                 autoFocus
                 label="RentNumber"
                 left={<TextInput.Icon icon="account" />}
                 onChangeText={(rentNumber) => setRentNumber(rentNumber)}
                 value={rentNumber}/>
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
                 label="PlateNumber"
                 left={<TextInput.Icon icon="lock" />}
                 onChangeText={(plateNumber) => setPlateNumber(plateNumber)}
                 value={plateNumber}/> 
                 <TextInput
                  style={{ marginTop: 10 }}
                 autoFocus
                 label="rentDate"
                 left={<TextInput.Icon icon="lock" />}
                 onChangeText={(rentDate) => setRentDate(rentDate)}
                 value={rentDate}/>
                 <Button
                    style={{ marginTop: 20, backgroundColor: 'blue' }}                   
                    labelStyle={{color:'white'}}
                    //mode="outlined"
                    onPress={()=> guardar()}
                >
                    Resgistrar
                </Button> 
                {modalVisible && (
          <Ventana
            modalVisible={modalVisible}
            closeModal={closeModal}
            message={errorMessage}
          />
        )}
                <Text style={{ marginTop: 10}}>Quieres ver los vehiculos?{' '}
                <Text style={{color:'blue', fontWeight:"bold"}} onPress={()=> navigation.navigate('Cars')}>
                     Ir a los vehiculos
                    </Text>
                    </Text>            
            </View>
        </View>
    )
}