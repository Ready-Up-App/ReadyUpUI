import { useEffect, useState } from "react";
import { FlatList, View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Keyboard, TextInput, Platform } from "react-native";
import Colors from "../../Constants/Colors";
import { searchPeople, sendFriendRequest } from "../../Api/PeopleAPI/PeopleApi";
import LoadScreen from "../Loading/LoadScreen";
import { validateSearchFriend } from "../../../Utility/FormValidator/FormValidator";

const SearchPeopleView = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [foundPeople, setFoundPeople] = useState([]);
    const [errors, setErrors] = useState({});

    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (val) => {
        setUsername(val);
    }

    const submit = () => {
        Keyboard.dismiss()
        setFormSubmitted(true)
    }

    const validate = () => {
        let errorList = validateSearchFriend(username);
        if (Object.keys(errorList).length > 0) {
            setErrors(errorList);
            setFoundPeople([])
            return false;
        }
        setErrors({});
        return true;
    }

    const searchPersonCall = async () => {
        setIsLoading(true);
        await searchPeople(username)
        .then((result) => {
            if(result == null) {
                return [];
            }
            if(!result.ok) {
                throw new Error("Unknown error occured");
            }
            return result.json();
        }).then((result) => {
            setFoundPeople(result);
        }).catch((error) => {
            setErrors(prev => ({
                ...prev,
                network: error.message,
            }));
        });
        setIsLoading(false);
    }

    const handleFriendRequest = (person, index) => {
        sendFriendRequest(person.username)
        person.available = false;
        let newArr = [...foundPeople];
        newArr[index] = person;

        setFoundPeople(newArr);   
    }

    useEffect(() => {
        if (formSubmitted && validate()) {
            searchPersonCall();
        } 
        setFormSubmitted(false);
    },[formSubmitted])

    return (
        <KeyboardAvoidingView style={styles.root} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.container}>
                <View style={styles.searchBarRoot}>

                    <TextInput 
                        value={username}
                        onChangeText={(text) => handleChange(text)}
                        placeholder={"Search Username"}
                        placeholderTextColor={Colors.black}
                        textAlign="center"
                        style={styles.searchField}
                        autoCapitalize='none'/>
                    
                    <TouchableOpacity text={"Search"} 
                        onPress={submit}
                        style={styles.searchButton}>
                        <Text>Search</Text>
                    </TouchableOpacity>
                    
                </View>
                {errors["username"] && <Text style={styles.errorText}>{errors["username"]}</Text>}

                <View >
                    {isLoading && <LoadScreen/> }
                    <FlatList style={styles.foundPeopleContainer}
                        data={foundPeople}
                        renderItem={({item, index}) => (
                            <View style={styles.items}> 
                                <Text style={styles.foundPersonText}>{item.username}</Text>
                                
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
                        showsVerticalScrollIndicator={false}/>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    root: {
        height: "100%",
        backgroundColor: Colors.blueGray,
    },
    container: {
        padding: 10
    },
    searchBarRoot: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    searchField: {
        width: "80%",
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: "white",

        borderColor: Colors.gray,
        borderWidth: 1,
        borderRadius: 50,

        justifyContent: "center",
    },
    searchButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
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
        alignItems: "flex-end",
    },
    errorText: {
        paddingTop: 10,
        textAlign: "center",
        color: Colors.red
    },
    foundPersonText: {
        width: "80%"
    }
})

export default SearchPeopleView;