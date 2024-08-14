import { emailRegex, nonAlphaNumericRegex } from "../../src/Constants/Regex"

export function validateSignUp(form) {
    var errors = {};
    if (form.username.trim().length === 0) {
        errors["username"] = "Please enter a Username"
    } else if (nonAlphaNumericRegex.test(form.username)) {
        errors["username"] = "Username cannot have any special characters"
    }
    if (form.firstname.trim().length === 0) {
        errors["firstname"] = "Please enter a firstname"
    }
    if (form.email.trim().length === 0) {
        errors["email"] = "Please enter an email address"
    } else if (!emailRegex.test(form.email)) {
        errors["email"] = "Please enter a valid email";
    }
    if (form.password.trim().length === 0) {
        errors["password"] = "Please enter password"
    }
    return errors;
}

export function validateSignIn(form) {
    var errors = {}
    if (form.username.trim().length === 0) {
        errors["username"] = "Please enter a username"
    }

    if (form.password.trim().length === 0) {
        errors["password"] = "Please enter a password"
    }
    return errors;
}

export function validateSearchFriend(username) {
    var errors = {}

    if (username.trim().length === 0) {
        errors["username"] = "Must enter a username"
    } else if (nonAlphaNumericRegex.test(username)) {
        errors["username"] = "Username cannot have any special characters"
    }
    return errors;
}
