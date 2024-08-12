import { useEffect, useState } from "react";
import CustomInput from "../CustomInput/CustomInput";
import { FlatList, View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Keyboard, SafeAreaView, TextInput } from "react-native";
import Colors from "../../Constants/Colors";
import { searchPeople, sendFriendRequest } from "../../Api/PeopleAPI/PeopleApi";
import LoadScreen from "../Loading/LoadScreen";

const SearchPeopleView = (props) => {


    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [foundPeople, setFoundPeople] = useState([]);

    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (val) => {
        setUsername(val);
        // console.log(val);
    }

    const submit = () => {
        Keyboard.dismiss()
        setFormSubmitted(true)
    }


    const handleFriendRequest = (person, index) => {
        sendFriendRequest(person.username)
        person.available = false;
        let newArr = [...foundPeople];
        newArr[index] = person;

        setFoundPeople(newArr);   
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
        <SafeAreaView style={styles.root}>
            <View style={styles.container}>
                <View style={styles.searchBarRoot}>
            
                    <TextInput 
                        value={username}
                        onChangeText={(text) => handleChange(text)}
                        placeholder={"Search Username"}
                        placeholderTextColor={Colors.black}
                        textAlign="center"
                        style={styles.searchField}
                        autoCapitalize='none'
                    />
                    
                    <TouchableOpacity text={"Search"} 
                        onPress={submit}
                        style={styles.searchButton}>
                        <Text>Search</Text>
                    </TouchableOpacity>
                    
                
                </View>

                <View style={{height:"100%"}}>
                    { 
                        loading ? <LoadScreen/> :
                            foundPeople.length == 0 ? 
                                <Text>NO DATA FOUND</Text>
                            :
                                <FlatList style={styles.foundPeopleContainer}
                                    data={foundPeople}
                                    renderItem={({item, index}) => (
                                        <View style={styles.items}> 
                                            <Text>{item.username}</Text>
                                            
                                            <View style={styles.buttonContainer}>
                                                <TouchableOpacity style={item.available ? styles.friendRequestButton : styles.inactiveButton}
                                                    onPress={() => handleFriendRequest(item, index)}
                                                    disabled={item.available ? false : true}
                                                />
                                            </View>
                                        </View>
                                    )}
                                    ItemSeparatorComponent={() => <View style={{borderWidth:1}}/>}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                />
                    }
                </View>
            </View>
        </SafeAreaView>
                    
    );
}


const styles = StyleSheet.create({
    root: {
        height: "100%",
        backgroundColor: Colors.blueGray,
    },
    container: {
        height: "100%",
        width: "100%",
        padding: 10
    },
    searchBarRoot: {
        height: "7%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    searchField: {
        width: "73%",
        height: "100%",
        marginLeft: "2%",
        backgroundColor: "white",

        borderColor: Colors.gray,
        borderWidth: 1,
        borderRadius: 50,

        justifyContent: "center",
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