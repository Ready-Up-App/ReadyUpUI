import { useEffect, useState } from "react";
import CustomInput from "../CustomInput/CustomInput";
import { View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Keyboard } from "react-native";
import CustomButton from "../CustomButton/CustomButton";
import { FlatList } from "react-native-gesture-handler";
import Colors from "../../Constants/Colors";
import { searchPeople, sendFriendRequest } from "../../Api/PeopleAPI/PeopleApi";
import LoadScreen from "../Loading/LoadScreen";

const SearchPeopleView = (props) => {


    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [foundPeople, setFoundPeople] = useState([]);

    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (name, val) => {
        setUsername(val);
    }

    const submit = () => {
        Keyboard.dismiss()
        setFormSubmitted(true)
    }


    const handleFriendRequest = (item, person) => {
        sendFriendRequest(person.username)
    }

    useEffect(() => {
        let isCancelled = false;
        if (formSubmitted) {
            setLoading(true);
            searchPeople(username)
            .then((result) => {

                if(result == null) {
                    return [];
                }
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
                
                <TouchableOpacity text={"Search"} 
                    onPress={submit}
                    style={styles.searchButton}>
                    <Text>Search</Text>
                </TouchableOpacity>
                
            
            </View>

            { 
                loading ? <LoadScreen/> :
                    foundPeople.length == 0 ? 
                        <Text>NO DATA FOUND</Text>
                    :
                        <FlatList style={styles.foundPeopleContainer}
                            data={foundPeople}
                            renderItem={({item}) => (
                                <View style={styles.items}> 
                                    <Text>{item.username}</Text>
                                    
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity style={item.available ? styles.friendRequestButton : styles.inactiveButton}
                                            onPress={(self) => handleFriendRequest(self,item)}
                                            disabled={item.available ? false : true}
                                        />
                                    </View>
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
        height: "5%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        
    },
    searchField: {
        width: "73%",
        height: "100%",
        marginLeft: "2%",
    },
    searchButton: {
        width: "21%",
        height: "100%",
        marginLeft: "2%",
        backgroundColor: Colors.lightBlueGray,
        alignItems: "center",
        justifyContent: "center",
    },
    foundPeopleContainer: {
        height: "50%",
        margin: 10,
    },
    items: {
        flexDirection: "row",
        alignItems: "center",

    },
    friendRequestButton : {
        backgroundColor: Colors.blue,
        width: 25,
        padding: 15,
        marginVertical: 25,
        alignItems: "center",
        
    },
    inactiveButton: {
        backgroundColor: Colors.gray,
        width: 25,
        padding: 15,
        marginVertical: 25,
        alignItems: "center",
        opacity: 0.5,
        activeOpacity: 0.5,
    },
    buttonContainer: {
        flex: 1,
        alignItems: "flex-end",
    }
})

export default SearchPeopleView;