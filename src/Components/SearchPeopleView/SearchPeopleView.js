import { useEffect, useState } from "react";
import CustomInput from "../CustomInput/CustomInput";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import CustomButton from "../CustomButton/CustomButton";
import { FlatList } from "react-native-gesture-handler";
import Colors from "../../Constants/Colors";
import { searchPeople } from "../../Api/PeopleAPI/PeopleApi";
import LoadScreen from "../Loading/LoadScreen";



const SearchPeopleView = (props) => {


    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [foundPeople, setFoundPeople] = useState({});

    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (name, val) => {
        setUsername(val);
    }

    const submit = () => {
        setFormSubmitted(true)
    }

    useEffect(() => {
        let isCancelled = false;
        if (formSubmitted) {
            setLoading(true)
            searchPeople(username)
            .then((result) => {
                if(!isCancelled && result.ok) {

                    return result.json();
                }
            }).then((result) => {
                setFoundPeople(result);
                setFormSubmitted(false);
                setLoading(false);
            }).catch((error) => {
                // console.error(error.message)
            });
        } 
        
        return () => {
            isCancelled = true;
        }
    },[formSubmitted])

    return (

        <View style={styles.root}>
            <View style={styles.searchBarRoot}>
        
                <CustomInput 
                    value={username}
                    setValue={handleChange}
                    placeholder={"Search Username"}
                    style={styles.searchField}
                />
                
                <CustomButton text={"Search"} 
                    onPress={submit}
                    style={styles.button}/>
                
            
            </View>

            {loading ? <LoadScreen/> : 
            
                <FlatList style={styles.foundPeopleContainer}
                    data={foundPeople}
                    renderItem={({item}) => (
                        <View style={{flex: 1}}> 
                            <TouchableOpacity style={styles.items}
                            // onPress={() => select(item.name)}
                            >
                                <Text>{item.username}</Text>
                            </TouchableOpacity>
                        </View>
                    )}/>
            
            }
            
            
        </View>
                    
    );
}


const styles = StyleSheet.create({
    root: {
        paddingTop: 10,
    },
    searchBarRoot: {
        flex: 0.1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        
    },
    foundPeopleContainer: {
        flex: 0.9
    },
    searchField: {
        width: "73%",
        height: "100%",
        marginLeft: "2%",
    },

    button: {
        width: "21%",
        height: "100%",
        marginLeft: "2%",
        backgroundColor: Colors.lightBlueGray
    }
})

export default SearchPeopleView;