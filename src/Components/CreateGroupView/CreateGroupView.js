import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createGroupCall } from "../../Api/GroupsAPI/GroupsApi";
import { useEffect, useState } from "react";
import Colors from "../../Constants/Colors";


const CreateGroupView = ({callable}) => {

    const [form, setForm] = useState({title: "", description: ""});
    const [submitForm, setSubmitForm] = useState(false);

    const handleChange = (name, value) => {
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const createGroup = async () => {
        const result = await createGroupCall(form);

        if (result.ok) {
            //what do when group created
            // console.warn("test")
            callable(false)
        }
        setSubmitForm(false);
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
        <SafeAreaView style={styles.root}>
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        // height: "50%",
        padding: 10,
    },
    textContainer: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: Colors.lightBlueGray,

    },
    textInput: {
        // backgroundColor: Colors.lightBlueGray,
        textAlign: "center",
        // height: "10%",
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