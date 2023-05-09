import root from "../urls";

export const getGroupsCall = async (props) => {

    try {
        const result = await fetch("http://universities.hipolabs.com/search?country=United+States",
            {
                method: "GET",
            }
        )
        return result.json();
    } catch (error) {
        return error.response.data   
    }
}