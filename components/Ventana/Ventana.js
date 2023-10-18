import { View, Button, Modal, Text } from "react-native-web";
import { window } from "../../assets/styles/styles";

const Ventana = (props) => {    
    return (
        <Modal 
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
        >
            <View style = {window.container}>
                <View style={{ backgroundColor: 'white', width: 200, padding: 20, borderRadius: 10 , alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight:"bold", fontSize:16}}>{props.message}</Text>
                    <Button style={{padding:100}}color="blue" title="Cerrar" onPress={props.closeModal}/>
                </View>
            </View>
        </Modal>
    );
}
export { Ventana }