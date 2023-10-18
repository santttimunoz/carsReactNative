import { View, Text, FlatList } from "react-native";
import { useAppContext } from "../appProvider/AppProvider";

const ListCars = () => {    
    const {cars, setCars} = useAppContext()

    const renderItem = ({ item }) => (
      <View style={{borderRadius:25, backgroundColor:"rgba(0, 0, 0, 0.2)", padding:10, marginTop:10}}>
        <Text style={{fontSize:20, fontWeight:"bold", marginTop:10, textAlign:"center"}}>Lista de vehiculos</Text>
        <Text style={{marginTop:10}}>PlateNumber: {item.plateNumber}</Text>
        <Text>Brand: {item.brand}</Text>
        <Text>state: {item.state}</Text>
        <Text>_____________</Text>
      </View>
    );

  if(cars == ""){
    return(
    <View style={{borderRadius:25, backgroundColor:"rgba(0, 0, 0, 0.2)", padding:10, marginTop:10}}>
        <Text style={{fontSize:20, fontWeight:"bold", marginTop:10, textAlign:"center"}}>Aun no hay vehiculos</Text>
      </View>)
  }else{
    return (
      <FlatList
        data={cars}
        keyExtractor={(item) => item.plateNumber.toString()} // Debes proporcionar una función para extraer una clave única
        renderItem={renderItem}
      />
    );
  }
    
  };
  
  export default ListCars;
