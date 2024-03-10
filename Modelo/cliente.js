import ClienteDAO from "../Persistencia/clienteDAO.js";

export default class Cliente 
{
    #cod;
    #nome;
    #tel;
    #end;

    constructor(cod=0, nome='', tel='', end='')
    {
        this.#cod = cod;
        this.#nome = nome;
        this.#tel = tel;
        this.#end = end;
    }

    get cod()
    {
        return this.#cod;
    }
    set cod(novoCod)
    {
        this.#cod = novoCod;
    }

    get nome()
    {
        return this.#nome;
    }
    set nome(novoNome)
    {
        this.#nome = novoNome;
    }

    get tel()
    {
        return this.#tel;
    }
    set tel(novoTel)
    {
        this.#tel = novoTel;
    }

    get end()
    {
        return this.#end;
    }
    set end(novoEnd)
    {
        this.#end = novoEnd;
    }

    toJSON()     
    {
        return{
            cod:this.#cod,
            nome:this.#nome,
            tel:this.#tel,
            end:this.#end
        }
    }


    async gravar()
    {
        const cliDAO = new ClienteDAO();
        await cliDAO.gravar(this);
    }

    async excluir()
    {
        const cliDAO = new ClienteDAO();
        await cliDAO.excluir(this);
    }

    async atualizar()
    {
        const cliDAO = new ClienteDAO();
        await cliDAO.atualizar(this);

    }

    async consultar(parametro)
    {
        const cliDAO = new ClienteDAO();
        return await cliDAO.consultar(parametro);
    }
}