import { emailRegex } from "../../src/Constants/Regex"

export function validateSignUp(form) {
    var errors = {};
    if (form.username.trim().length === 0) {
        errors["username"] = "Please enter a Username."
    }
    if (form.email.trim().length === 0) {
        errors["email"] = "Please enter an email address."
    } else if (!emailRegex.test(form.email)) {
        errors["email"] = "Please enter a valid email";
    }
    if (form.password.trim().length === 0) {
        errors["password"] = "Please enter password."
    }
    return errors;
}

export function validateSignIn(form) {
    var errors = {}
    if (form.username.trim().length === 0) {
        errors["username"] = "Please enter a username."
    }

    if (form.password.trim().length === 0) {
        errors["password"] = "Please enter an email address."
    }
    
    return errors;
}

export function validateSearchFriend(form) {
    var errors = {}

    if (form.trim().length === 0) {
        errors["username"] = "Must enter a username."
    }
    return errors;
}
