import Cliente from '../Modelo/cliente.js';
import Pedido from '../Modelo/pedido.js';
import Produto from '../Modelo/produto.js';
import ItemPedido from '../Modelo/itemPedido.js';
import conectar from './conexao.js';

export default class PedidoDAO 
{
    async gravar(pedido) 
    {
        if (pedido instanceof Pedido) 
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try 
            {
                const sql = 'INSERT INTO pedido(ped_data, ped_obs, ped_valTotal, cli_cod) VALUES(?,?,?,?)';
                const parametros = [pedido.data, pedido.obs, pedido.valTotal, pedido.cliente.cod];
                const retorno = await conexao.execute(sql, parametros);
                pedido.cod = retorno[0].insertId;
                const sql2 = 'INSERT INTO pedido_produto(ped_cod, prod_cod, prod_qtd, prod_valUnit, prod_subTotal) VALUES(?,?,?,?,?)';
                for (const item of pedido.itens) 
                {
                    const parametros2 = [pedido.cod, item.produto.cod, item.qtd, item.valUnit, item.subTotal];
                    await conexao.execute(sql2, parametros2);
                }
                await conexao.commit();
            } 
            catch (error) 
            {
                await conexao.rollback();
                throw error;
            }
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(pedido)
    {
        if (pedido instanceof Pedido) 
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = `UPDATE pedido_produto SET prod_qtd = ?, prod_valUnit = ?, prod_subTotal = ? WHERE ped_cod = ? AND prod_cod = ?`;
                for (const item of pedido.itens) 
                {
                    const parametros = [item.qtd, item.valUnit, item.subTotal, pedido.cod, item.produto.cod];
                    await conexao.execute(sql, parametros);
                }
                const sql2 = `UPDATE pedido SET ped_data = ?, ped_obs = ?, ped_valTotal = ?, cli_cod = ? WHERE ped_cod = ?`;
                const parametros2 = [pedido.data, pedido.obs, pedido.valTotal, pedido.cliente.cod, pedido.cod];
                await conexao.execute(sql2, parametros2);
            }
            catch (error)
            {
                await conexao.rollback();
                throw error;
            }
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(pedido) 
    {
        if (pedido instanceof Pedido) 
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try 
            {
                const sql = 'DELETE FROM pedido_produto WHERE ped_cod = ?';
                const parametros = [pedido.cod];
                await conexao.execute(sql, parametros);
                const sql2 = 'DELETE FROM pedido WHERE ped_cod = ?';
                const parametros2 = [pedido.cod];
                await conexao.execute(sql2, parametros2);
                await conexao.commit();
            }
            catch (error)
            {
                await conexao.rollback();
                throw error;
            }
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) 
    {
        if (!parametroConsulta)
        {
            parametroConsulta = "";
        }
        const conexao = await conectar();
        let listaPedidos = [];
        if (!isNaN(parseInt(parametroConsulta)))
        {
            const sql = `SELECT p.ped_cod, p.ped_data, p.ped_obs, p.ped_valTotal, p.cli_cod, 
                c.cli_nome, c.cli_tel, c.cli_end, pr.prod_cod, 
                pr.prod_desc, pr.prod_precoCusto, pr.prod_precoVenda, pr.prod_validade, pr.prod_qtdEstoque,
                i.prod_cod, pr.prod_desc, i.prod_qtd, i.prod_valUnit, i.prod_subTotal
                FROM pedido p 
                INNER JOIN cliente c ON p.cli_cod = c.cli_cod 
                INNER JOIN pedido_produto i ON p.ped_cod = i.ped_cod
                INNER JOIN produto pr ON pr.prod_cod = i.prod_cod
                WHERE p.ped_cod = ?
                ORDER BY p.ped_valTotal`;
            const parametros = [parametroConsulta];
            const [registros, campos] = await conexao.execute(sql, parametros);
            if (registros.length>0)
            {
                const cliente = new Cliente(registros[0].cli_cod, registros[0].cli_nome, registros[0].cli_tel, registros[0].cli_end);
                let listaItensPedido = [];
                for (const registro of registros)
                {
                    const produto = new Produto(registro.prod_cod, registro.prod_desc, registro.prod_precoCusto, registro.prod_precoVenda, registro.prod_validade, registro.prod_qtdEstoque);
                    const itemPedido = new ItemPedido(produto, registro.prod_qtd, registro.prod_valUnit, registro.prod_subTotal);
                    listaItensPedido.push(itemPedido);
                }
                const pedido = new Pedido(registros[0].ped_cod, registros[0].ped_data, registros[0].ped_obs, registros[0].ped_valTotal, cliente, listaItensPedido);
                listaPedidos.push(pedido);
            }
        }
        else
        {
            const parametros = ['%'+parametroConsulta+'%'];
            const sql = `SELECT p.ped_cod, p.ped_data, p.ped_obs, p.ped_valTotal, p.cli_cod, 
                c.cli_nome, c.cli_tel, c.cli_end, pr.prod_cod, 
                pr.prod_desc, pr.prod_precoCusto, pr.prod_precoVenda, pr.prod_validade, pr.prod_qtdEstoque,
                i.prod_cod, pr.prod_desc, i.prod_qtd, i.prod_valUnit, i.prod_subTotal
                FROM pedido p 
                INNER JOIN cliente c ON p.cli_cod = c.cli_cod 
                INNER JOIN pedido_produto i ON p.ped_cod = i.ped_cod
                INNER JOIN produto pr ON pr.prod_cod = i.prod_cod
                WHERE p.ped_obs like ?
                ORDER BY p.ped_obs`;
            const [registros, campos] = await conexao.execute(sql, parametros);
            if (registros.length>0)
            {
                let codPedido = registros[0].ped_cod;
                let cliente = new Cliente(registros[0].cli_cod, registros[0].cli_nome, registros[0].cli_tel, registros[0].cli_end);
                let listaItensPedido = [];
                let i;
                for (i=0; i<registros.length; i++)
                {
                    if (registros[i].ped_cod!==codPedido) 
                    {
                        const pedido = new Pedido(registros[i-1].ped_cod, registros[i-1].ped_data, registros[i-1].ped_obs, registros[i-1].ped_valTotal, cliente, listaItensPedido);
                        listaPedidos.push(pedido); 
                        codPedido = registros[i].ped_cod;
                        cliente = new Cliente(registros[i].cli_cod, registros[i].cli_nome, registros[i].cli_tel, registros[i].cli_end);   
                        listaItensPedido = [];
                    }      
                    const produto = new Produto(registros[i].prod_cod, registros[i].prod_desc, registros[i].prod_precoCusto, registros[i].prod_precoVenda, registros[i].prod_validade, registros[i].prod_qtdEstoque);
                    const itemPedido = new ItemPedido(produto, registros[i].prod_qtd, registros[i].prod_valUnit, registros[i].prod_subTotal);
                    listaItensPedido.push(itemPedido);
                }
                const pedido = new Pedido(registros[i-1].ped_cod, registros[i-1].ped_data, registros[i-1].ped_obs, registros[i-1].ped_valTotal, cliente, listaItensPedido);
                listaPedidos.push(pedido); 
            }
        }
        return listaPedidos;
    }
}
