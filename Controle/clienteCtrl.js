import Cliente from "../Modelo/cliente.js";

export default class ClienteCtrl
{
    gravar(requisicao, resposta) 
    {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;
            const tel = dados.tel;
            if (nome && tel) 
            {
                const cliente = new Cliente(0, nome, tel);
                cliente.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": cliente.cod,
                        "mensagem": "Cliente incluído com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar o cliente:" + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe os dados do cliente de acordo com a documentação!"
                });
            }
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um cliente!"
            });
        }
    }

    atualizar(requisicao, resposta) 
    {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) 
        {
            const dados = requisicao.body;
            const cod = dados.cod;
            const nome = dados.nome;
            const tel = dados.tel;
            if (cod && nome && tel) 
            {
                const cliente = new Cliente(cod, nome, tel);
                cliente.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cliente atualizado com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar o cliente:" + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe os dados do cliente de acordo com a documentação!"
                });
            }
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um cliente!"
            });
        }
    }

    excluir(requisicao, resposta) 
    {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) 
        {
            const dados = requisicao.body;
            const cod = dados.cod;
            if (cod) 
            {
                const cliente = new Cliente(cod);
                cliente.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cliente excluído com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o cliente:" + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do cliente!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um cliente!"
            });
        }
    }

    consultar(requisicao, resposta) 
    {
        resposta.type('application/json');
        let termo = requisicao.params.termo;
        if (!termo)
        {
            termo = "";
        }
        if (requisicao.method === "GET")
        {
            const cliente = new Cliente();
            cliente.consultar(termo).then((listaClientes) => {
                resposta.json({
                    status:true,
                    listaClientes
                });
            })
            .catch((erro) => {
                resposta.json({
                    status:false,
                    mensagem:"Não foi possível obter os clientes: " + erro.message
                });
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar clientes!"
            });
        }
    }
}