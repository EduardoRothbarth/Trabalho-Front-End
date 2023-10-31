function salvar(){
    showLoading();
    localStorage.nome = document.getElementById("_nome").value;
    localStorage.cpf = document.getElementById("_cpf").value;
    localStorage.telefone = document.getElementById("_telefone").value;
    localStorage.cep = document.getElementById("_cep").value;
    localStorage.logradouro = document.getElementById("_logradouro").value;
    localStorage.numeracao = document.getElementById("_numeracao").value;
    localStorage.complemento = document.getElementById("_complemento").value;
    localStorage.bairro = document.getElementById("_bairro").value;
    localStorage.cidade = document.getElementById("_cidade").value;
    localStorage.estado = document.getElementById("_estado").value;
    hideLoading();
    alert('Dados salvos com sucesso');
    window.location.href = "/areaDoCliente.html";
}

function carregarInformacoes() {
    document.getElementById("_respostaNome").value = localStorage.nome
    document.getElementById("_respostacpf").value = localStorage.cpf
    document.getElementById("_respostaTelefone").value = localStorage.telefone
    document.getElementById("_respostaCep").value = localStorage.cep
    document.getElementById("_respostaLogradouro").value = localStorage.logradouro
    document.getElementById("_respotaNumeracao").value = localStorage.numeracao
    document.getElementById("_respostaComplemento").value = localStorage.complemento
    document.getElementById("_respostaBairro").value = localStorage.bairro
    document.getElementById("_respostaCidade").value = localStorage.cidade
    document.getElementById("_respostaEstado").value = localStorage.estado
}

