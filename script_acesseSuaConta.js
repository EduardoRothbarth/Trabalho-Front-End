function onChangeEmail() {
    toggleButtonsDisable();
    toggleEmailErrors();
}

function login() {
    showLoading(); /*Usuário clicou no botão entrar, surgi o loading*/
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
        ).then(response => {
            hideLoading(); /*Carrega a função hide loading para a tentativa de login */
            window.location.href = "/areaDoCliente.html";
    }).catch(error => {
        hideLoading(); /*Carrega a função hide loading para o erro na tentativa de login */
        alert(getErrorMessage(error));
    });
    
}

function getErrorMessage(error) {
    if (error.code == "auth/user-not-found" || "auth/invalid-login-credentials") {
        return "Usuário ou senha invalidos";
    }
    if (error.code =="auth/wrong-password"){
        return "Senha inválida";
    }
    return error.message;
}

function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    form.recoverPasswordButton().disabled = !emailValid;
}

function register() {
    window.location.href = "/areaCliente.html";
}

function recoverPassword() {
    showLoading(); /*Usuário clicou no botão recuperar senha, surgi o loading*/
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => { 
        hideLoading();
        alert('Email enviado com sucesso');
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    }) /*firebase possui um serviçao de autenticação, que envia um e-mail para usuário trocar
    a senha, como parametro recebe o e-mail digitado no formulario, then significa uma promessa
    de que algo ocorrerá... iremos esconder o loading.. e apresentar uma mensagem de sucesso
    agora temos que tratar erros (CATCH), vamos esconder o loading e apresentar mensagem erro
    que já foi criada anteriormente*/
}

function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    return form.password().value ? true : false;
}





const form = {
    email: () => document.getElementById("email"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    loginButton: () => document.getElementById("login-button"),
    password: () => document.getElementById("password"),
    recoverPasswordButton: () => document.getElementById("recover-password-button"),
} 