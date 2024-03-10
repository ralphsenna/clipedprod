import Produto from "../Modelo/produto.js";

export default class ProdutoCtrl 
{
    gravar(requisicao, resposta) 
    {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) 
        {
            const dados = requisicao.body;
            const desc = dados.desc;
            const precoCusto = dados.precoCusto;
            const precoVenda = dados.precoVenda;
            const validade = dados.validade;
            const qtdEstoque = dados.qtdEstoque;
            if (desc && precoCusto>0 && precoVenda>0 && validade && qtdEstoque>=0) 
            {
                const produto = new Produto(0, desc, precoCusto, precoVenda, validade, qtdEstoque);
                produto.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": produto.cod,
                        "mensagem": "Produto incluído com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar o produto:" + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, os dados do produto segundo a documentação da API!"
                });
            }
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um produto!"
            });
        }
    }

    atualizar(requisicao, resposta) 
    {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cod = dados.cod;
            const desc = dados.desc;
            const precoCusto = dados.precoCusto;
            const precoVenda = dados.precoVenda;
            const validade = dados.validade;
            const qtdEstoque = dados.qtdEstoque;
            if (cod && desc && precoCusto>0 && precoVenda>0 && validade && qtdEstoque>=0) 
            {
                const produto = new Produto(cod, desc, precoCusto, precoVenda, validade, qtdEstoque);
                produto.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Produto atualizado com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar o produto:" + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do produto segundo a documentação da API!"
                });
            }
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um produto!"
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
                const produto = new Produto(cod);
                produto.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Produto excluído com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o produto:" + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do produto!"
                });
            }
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um produto!"
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
            const produto = new Produto();
            produto.consultar(termo).then((listaProdutos) => {
                resposta.json({
                    "status": true,
                    listaProdutos
                });
            })
            .catch((erro) => {
                resposta.json({
                    "status": false,
                    "mensagem": "Não foi possível obter os produtos: " + erro.message
                });
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar produtos!"
            });
        }
    }
}