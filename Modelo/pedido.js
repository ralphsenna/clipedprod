import PedidoDAO from "../Persistencia/pedidoDAO.js";

export default class Pedido
{
    #cod;
    #data;
    #obs;
    #valTotal;   
    #cliente;

    constructor(cod=0, data='', obs="", valTotal=0, cliente={})
    {
        this.#cod=cod;
        this.#data=data;
        this.#obs=obs;
        this.#valTotal=valTotal;
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

    get valTotal()
    {
        return this.#valTotal;
    }
    set valTotal(novoValTotal)
    {
        this.#valTotal = novoValTotal;
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
            data:this.#data,
            obs:this.#obs,
            valTotal:this.#valTotal,
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