import Produto from '../Modelo/produto.js';
import conectar from './conexao.js';

export default class ProdutoDAO
{
    async gravar(produto) 
    {
        if (produto instanceof Produto) 
        {
            const sql = `INSERT INTO produto(prod_desc, prod_precoCusto, 
                prod_precoVenda, prod_validade, prod_qtdEstoque)
                VALUES(?,?,?,?,?)`;
            const parametros = [produto.desc, produto.precoCusto, produto.precoVenda,
                produto.validade, produto.qtdEstoque];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            produto.cod = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(produto) 
    {
        if (produto instanceof Produto) 
        {
            const sql = `UPDATE produto SET prod_desc = ?, prod_precoCusto = ?,
                prod_precoVenda = ?, prod_validade = ?, prod_qtdEstoque = ?
                WHERE prod_cod = ?`;
            const parametros = [produto.desc, produto.precoCusto, produto.precoVenda,
                produto.validade, produto.qtdEstoque, produto.cod];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(produto) 
    {
        if (produto instanceof Produto) 
        {
            const sql = 'DELETE FROM produto WHERE prod_cod = ?';
            const parametros = [produto.cod];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) 
    {
        if (!parametroConsulta)
        {
            parametroConsulta="";
        }
        const conexao = await conectar();
        let listaProdutos = [];
        if (!isNaN(parseInt(parametroConsulta)))
        {
            const sql = `SELECT p.prod_cod, p.prod_desc, p.prod_precoCusto, 
                p.prod_precoVenda, p.prod_validade, p.prod_qtdEstoque
                FROM produto p 
                WHERE p.prod_cod = ?
                ORDER BY p.prod_desc`;
            const parametros = [parametroConsulta];
            const [registros, campos] = await conexao.execute(sql, parametros);
            for (const registro of registros)
            {
                const produto = new Produto(registro.prod_cod,registro.prod_desc,
                                            registro.prod_precoCusto,registro.prod_precoVenda,
                                            registro.prod_validade, registro.prod_qtdEstoque);
                listaProdutos.push(produto);
            }
        }
        else
        {
            const sql = `SELECT p.prod_cod, p.prod_desc, p.prod_precoCusto, 
                p.prod_precoVenda, p.prod_validade,  p.prod_qtdEstoque
                FROM produto p
                WHERE p.prod_desc like ?
                ORDER BY p.prod_desc`;
            const parametros = ['%'+parametroConsulta+'%'];
            const [registros, campos] = await conexao.execute(sql, parametros);
            for (const registro of registros)
            {
                const produto = new Produto(registro.prod_cod,registro.prod_desc,
                                            registro.prod_precoCusto,registro.prod_precoVenda,
                                            registro.prod_validade, registro.prod_qtdEstoque);
                listaProdutos.push(produto);
            }
        }
        return listaProdutos;
    }
}