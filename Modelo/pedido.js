import PedidoDAO from "../Persistencia/pedidoDAO.js";

export default class Pedido
{
    #cod;
    #qtdItens;
    #valTotal;
    #data;
    #obs;
    #cliente;

    constructor(cod=0, qtdItens=0, valTotal=0, data='', obs="", cliente={})
    {
        this.#cod=cod;
        this.#qtdItens=qtdItens;
        this.#valTotal=valTotal;
        this.#data=data;
        this.#obs=obs;
        this.#cliente=cliente;
    }

    get cod()
    {
        return this.#cod;
    }
    set cod(novoCod)
    {
        this.#cod = novoCod;
    }

    get qtdItens()
    {
        return this.#qtdItens;
    }
    set qtdItens(novaQtdItens)
    {
        this.#qtdItens=novaQtdItens;
    }

    get valTotal()
    {
        return this.#valTotal;
    }
    set valTotal(novoValTotal)
    {
        this.#valTotal = novoValTotal;
    }

    get data()
    {
        return this.#data;
    }
    set data(novaData)
    {
        this.#data = novaData;
    }

    get obs()
    {
        return this.#obs;
    }
    set obs(novaObs)
    {
        this.#obs = novaObs;
    }

    get cliente()
    {
        return this.#cliente;
    }
    set cliente(novoCliente)
    {
        this.#cliente = novoCliente;
    }

    toJSON()
    {
        return{
            cod:this.#cod,
            qtdItens:this.#qtdItens,
            valTotal:this.#valTotal,
            data:this.#data,
            obs:this.#obs,
            cliente:this.#cliente
        }
    }


    async gravar()
    {
       const pedDAO = new PedidoDAO();
       await pedDAO.gravar(this);
    }
 
    async excluir()
    {
       const pedDAO = new PedidoDAO();
       await pedDAO.excluir(this);
    }
 
    async atualizar()
    {
       const pedDAO = new PedidoDAO();
       await pedDAO.atualizar(this);
    }
 
    async consultar(parametro)
    {
       const pedDAO = new PedidoDAO();
       return await pedDAO.consultar(parametro);
    }
}