function onChangeEmail(){
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";

    toggleRegisterButtonDisable ();
}

function onChangePassword() {
    const password = form.password().value;

    form.passwordMinLenghtError().style.display = password.length >= 6 ? "none" : "block";

    validatePasswordsMatch();

    toggleRegisterButtonDisable ()
}

function onChangeConfirmPassword(){
    validatePasswordsMatch();

    toggleRegisterButtonDisable ();
}

function register(){
    showLoading();

    const email = form.email().value;
    const password = form.password().value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() =>{
        hideLoading();
        window.location.href = "/dadosDoCliente.html";
    }). catch (error => {
        hideLoading();
        alert(getErrorMessage(error));
    })
}

function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") {
        return "E-mail já cadastrado";
    }
    return error.message;
}

function validatePasswordsMatch(){
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDosentMatchError().style.display = 
       password == confirmPassword ? "none" : "block";
}

function toggleRegisterButtonDisable (){
    form.registerButton().disabled = !isFormValid();
}

function isFormValid(){
    const email = form.email().value;
    if (!email || !validateEmail(email)){
        return false;
    }

    const password = form.password(). value;
    if (!password || password.length < 6){
        return false;
    }

    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword){
        return false;
    }

    return true;
}

const form = {
    email: () => document.getElementById('email'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),

    password: () => document.getElementById('password'),
    passwordMinLenghtError: () => document.getElementById('password-min-length-error'),

    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDosentMatchError: () => document.getElementById('password-dosent-match-error'),

    registerButton: () => document.getElementById('register-button'),
}