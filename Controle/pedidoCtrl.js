import Pedido from "../Modelo/pedido.js";

export default class PedidoCtrl
{
    gravar(requisicao, resposta) 
    {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json'))
        {
            const dados = requisicao.body;
            const qtdItens = dados.qtdItens;
            const valTotal = dados.valTotal;
            const data = dados.data;
            const obs = dados.obs;
            const cliente = dados.cliente;
            if (qtdItens>0 && valTotal>0 && data && obs && cliente) 
            {
                const pedido = new Pedido(0, qtdItens, valTotal, data, obs, cliente);
                pedido.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": pedido.cod,
                        "mensagem": "Pedido incluído com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar o pedido:" + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe os dados do pedido de acordo com a documentação!"
                });
            }
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um pedido!"
            });
        }
    }

    atualizar(requisicao, resposta) 
    {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cod = dados.cod;
            const qtdItens = dados.qtdItens;
            const valTotal = dados.valTotal;
            const data = dados.data;
            const obs = dados.obs;
            const cliente = dados.cliente;
            if (cod && qtdItens>0 && valTotal>0 && data && obs && cliente) 
            {
                const pedido = new Pedido(cod, qtdItens, valTotal, data, obs, cliente);
                pedido.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Pedido atualizado com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar o pedido:" + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do pedido segundo a documentação da API!"
                });
            }
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um pedido!"
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
                const pedido = new Pedido(cod);
                pedido.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Pedido excluído com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o pedido:" + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do pedido!"
                });
            }
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um pedido!"
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
            const pedido = new Pedido();
            pedido.consultar(termo).then((listaPedidos) => {
                resposta.json({
                    status: true,
                    listaPedidos
                });
            })
            .catch((erro) => {
                resposta.json({
                    status: false,
                    mensagem: "Não foi possível obter os pedidos: " + erro.message
                });
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar pedidos!"
            });
        }
    }
}