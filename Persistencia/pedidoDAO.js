import Pedido from '../Modelo/pedido.js.js';
import Cliente from '../Modelo/cliente.js';
import conectar from './conexao.js';

export default class PedidoDAO 
{
    async gravar(pedido) 
    {
        if (pedido instanceof Pedido) 
        {
            const sql = `INSERT INTO pedido(ped_qtdItens, ped_valTotal, ped_data, 
                ped_obs, cli_cod) VALUES(?,?,?,?,?)`;
            const parametros = [pedido.qtdItens, pedido.valTotal, pedido.data,
            pedido.obs, pedido.cliente.cod];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            pedido.cod = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(pedido)
    {
        if (pedido instanceof Pedido) 
        {
            const sql = `UPDATE pedido SET ped_qtdItens = ?, ped_valTotal = ?,
                ped_data = ?, ped_obs = ?, cli_cod = ? WHERE ped_cod = ?`;
            const parametros = [pedido.qtdItens, pedido.valTotal, pedido.data,
            pedido.obs, pedido.cliente.cod, pedido.cod];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(pedido) 
    {
        if (pedido instanceof Pedido) 
        {
            const sql = 'DELETE FROM pedido WHERE ped_cod = ?';
            const parametros = [pedido.cod];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
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
            const sql = `SELECT p.ped_cod, p.ped_qtdItens, p.ped_valTotal,
                p.ped_data, p.ped_obs, c.cli_cod, c.cli.nome, c.cli.tel
                INNER JOIN cliente c ON p.cli_cod = c.cli_cod
                FROM pedido p 
                WHERE p.ped_cod = ?
                ORDER BY p.ped_valTotal`;
            const parametros = [parametroConsulta];
            const [registros, campos] = await conexao.execute(sql, parametros);
            for (const registro of registros)
            {
                const cliente = new Cliente(registro.cli_cod, registro.cli_nome, registro.cli_tel);
                const pedido = new Pedido(registro.ped_cod,registro.ped_qtdItens,
                                          registro.ped_valTotal,registro.ped_data,
                                          registro.ped_obs, cliente);
                listaPedidos.push(pedido);
            }
        }
        else
        {
            const sql = `SELECT p.ped_cod, p.ped_qtdItens, p.ped_valTotal,
                p.ped_data, p.ped_obs, c.cli_cod, c.cli.nome, c.cli.tel
                INNER JOIN cliente c ON p.cli_cod = c.cli_cod
                FROM pedido p 
                WHERE p.ped_valTotal like ?
                ORDER BY p.ped_valTotal`;
            const parametros=['%'+parametroConsulta+'%'];
            const [registros, campos] = await conexao.execute(sql, parametros);
            for (const registro of registros)
            {
                const cliente = new Cliente(registro.cli_cod, registro.cli_nome, registro.cli_tel);
                const pedido = new Pedido(registro.ped_cod,registro.ped_qtdItens,
                                          registro.ped_valTotal,registro.ped_data,
                                          registro.ped_obs, cliente);
                listaPedidos.push(pedido);
            }
        }
        return listaPedidos;
    }
}
