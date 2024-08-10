import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { createGroupCall } from "../../Api/GroupsAPI/GroupsApi";
import { useEffect, useState } from "react";
import Colors from "../../Constants/Colors";


const CreateGroupView = () => {

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
        <SafeAreaView>
            <TextInput 
                value={form.title}
                placeholder="Title"
                onChangeText={(text) => handleChange("title", text)}
                autoCapitalize='none'
            />
            <TextInput 
                value={form.description}
                placeholder="Description"
                onChangeText={(text) => handleChange("description", text)}
                autoCapitalize='none'
            />

            <TouchableOpacity style={{backgroundColor: Colors.black}} onPress={() => setSubmitForm(true)}>
                <Text>Create</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    


})

export default CreateGroupView;