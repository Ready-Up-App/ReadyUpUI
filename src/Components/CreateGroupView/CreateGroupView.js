import { Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createGroupCall } from "../../Api/GroupsAPI/GroupsApi";
import { useEffect, useState } from "react";
import Colors from "../../Constants/Colors";
import LoadScreen from "../Loading/LoadScreen";


const CreateGroupView = ({navigation, setInGroup}) => {

    const [form, setForm] = useState({title: "", description: ""});
    const [submitForm, setSubmitForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (name, value) => {
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const createGroup = async () => {
        setIsLoading(true);
        const result = await createGroupCall(form);
        setSubmitForm(false);
        setIsLoading(false);
        if (result.ok) {
            setInGroup(true);
        }
    }

    useEffect(() => {
        let isCancelled = false;

        if (submitForm) {
            createGroup();
        }

        return () => {
            isCancelled = true;
        }
    },[submitForm])

    return (
        <SafeAreaView style={styles.root} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled={false}>
            <View style={styles.container}>

                {isLoading && <LoadScreen/>}
                <View style={styles.textContainer}>
                    <TextInput 
                        value={form.title}
                        placeholder="Title"
                        onChangeText={(text) => handleChange("title", text)}
                        autoCapitalize='none'
                        style={styles.textInput}
                    />
                    <TextInput 
                        value={form.description}
                        placeholder="Description"
                        onChangeText={(text) => handleChange("description", text)}
                        autoCapitalize='none'
                        style={styles.textInput}
                    />
                    
                </View>

                <TouchableOpacity style={styles.createButton} onPress={() => setSubmitForm(true)}>
                    <Text>Create</Text>
                </TouchableOpacity>
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
        margin: 13
    },
    textContainer: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: Colors.lightBlueGray,
    },
    textInput: {
        textAlign: "center",
        paddingVertical: 10,
        borderBottomColor: Colors.black,
        borderBottomWidth: 0.75
    },
    createButton: {
        alignItems: "center",
        backgroundColor: Colors.black,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        paddingVertical: 10
    }


})

export default CreateGroupView;