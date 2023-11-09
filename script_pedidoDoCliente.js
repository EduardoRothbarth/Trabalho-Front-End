//GET COMPRADOR (LOGIN) Através dela, inserimos o id do usuario e a senha, para que pegue GET o id dele, e possamos visualizar as compras no pedidoDoCliente
var compradorAcesso;
function acessarConta(){
    event.preventDefault();
    var idComprador = document.getElementById("id").value

    fetch(`http://localhost:3000/Comprador/${idComprador}`)
    .then(response => 
        response.json()
    ).then(comprador => {
        if(comprador.nome == undefined){
            Swal.fire("comprador não encontrador")
            return;
        }else{
            if(comprador.senha == document.getElementById("senha").value){

                sessionStorage.setItem('chave', comprador.id );
                window.location='/pedidoDoCliente.html';
                //window.location='/telaPedidoCompra.html';
            }else{
                Swal.fire("senha incorreta")
            }
        }
    })
}

//GET DADOS COMPRADOR (PERFIL) Nesta função esta o segredo de preencher a tabela com historico dos pedidos
//GET PEDIDOS DO COMPRADOR (TABELA DO PERFIL)
//GET PRODUTO DO PEDIDO (TABELA PERFIL)
function perfilComprador(){
    var idArquivado = sessionStorage.getItem('chave');
    fetch(`http://localhost:3000/Comprador/${idArquivado}`)
    .then(response => 
        response.json()
    ).then(comprador => {
        document.getElementById("idComprador").value = comprador.id
        document.getElementById("nomeComprador").value = comprador.nome
        document.getElementById("senhaComprador").value = comprador.senha
        document.getElementById("cpfComprador").value = comprador.cpf
        document.getElementById("emailComprador").value = comprador.email 
        document.getElementById("telefoneComprador").value = comprador.telefone       
    })

    fetch(`http://localhost:3000/pedidos/`)
    .then(response => 
        response.json()
    ).then(pedidos => {

        var idProdPedido = [];
        var id_Pedido = [];
        var quantidade = [];
        var valorUnit = [];
        var valorTot = [];
        var dataEnt = [];
        var status = [];

        var prodNome = [];
        var prodDescricao = [];

        for(x=0; x<pedidos.length; x++){
            if(pedidos[x].idComprador == idArquivado){
                idProdPedido.push(pedidos[x].idProduto);
                id_Pedido.push(pedidos[x].idPedido);
                quantidade.push(pedidos[x].quantidade);
                valorTot.push(pedidos[x].valorTotal);
                dataEnt.push(pedidos[x].dataEntrega);
                status.push(pedidos[x].status);

                fetch(`https://raw.githubusercontent.com/EduardoRothbarth/Formulario-JSON/main/produtos.json`)
                .then(response => 
                    response.json()
                ).then(produtos => {
                    marcas = [produtos.Lampada, produtos.Chuveiro, produtos.CaboFlexivel]

                    document.getElementById("corpoTab").innerHTML ="";
                    for(b=0; b<id_Pedido.length; b++){

                        for(y=0; y<marcas.length; y++){
                            for(a=0; a<marcas[y].length; a++){
                                if(marcas[y][a].id == idProdPedido[b]){
    
                                    prodNome.push(marcas[y][a].nome);
                                    prodDescricao.push(marcas[y][a].descricao)
                                    valorUnit.push(marcas[y][a].preco);
                                }
                            }
                        }

                        var linha = `<tr>
                        <td>${id_Pedido[b]}</td>
                        <td>${idProdPedido[b]}</td>
                        <td>${prodNome[b]}</td>
                        <td>${prodDescricao[b]}</td>
                        <td>${quantidade[b]}</td>
                        <td>${valorUnit[b]}</td>
                        <td>${valorTot[b]}</td>
                        <td>${dataEnt[b]}</td>
                        <td>${status[b]}</td>
                        </tr>`;
                    
                        document.getElementById("corpoTab").innerHTML += linha
                    }
                })
            }
        }
    })
}

//Função dentro da página pedidoDoCliente, que permite ao usuário atualizar seus dados
function atualizarComprador(){
    event.preventDefault();
    sessionStorage.setItem('mensagem', true);
    
    fetch(`http://localhost:3000/Comprador/${document.getElementById("idComprador").value}`,{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: document.getElementById("nomeComprador").value,
            telefone: document.getElementById("telefoneComprador").value,
            email: document.getElementById("emailComprador").value,
            senha: document.getElementById("senhaComprador").value,
            cpf: document.getElementById("cpfComprador").value,
        })
    }) 
    .then(response => response.json())
    location.reload()
}

//Função que cria um modal no central da tela, confirmando atualização dos dados
function swalDadosAtualizados(){
    if(sessionStorage.getItem('mensagem') == "true"){
        Swal.fire({
            icon: 'success',
            title: 'Dados atualizados com sucesso',
            showConfirmButton: false,
            timer: 1500
        })
        sessionStorage.setItem('mensagem', false)
    }
}





