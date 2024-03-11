import ProdutoDAO from "../Persistencia/produtoDAO.js";

export default class Produto
{
    #cod;
    #desc;
    #precoCusto;
    #precoVenda;
    #validade;
    #qtdEstoque;

    constructor(cod=0, desc="", precoCusto=0, precoVenda=0, validade='', qtdEstoque=0)
    {
        this.#cod=cod;
        this.#desc=desc;
        this.#precoCusto=precoCusto;
        this.#precoVenda=precoVenda;
        this.#validade=validade;
        this.#qtdEstoque=qtdEstoque;
    }

    get cod()
    {
        return this.#cod;
    }
    set cod(novoCod)
    {
        this.#cod = novoCod;
    }

    get desc()
    {
        return this.#desc;
    }
    set desc(novaDesc)
    {
        this.#desc=novaDesc;
    }

    get precoCusto()
    {
        return this.#precoCusto;
    }
    set precoCusto(novoPreco)
    {
        this.#precoCusto = novoPreco
    }

    get precoVenda()
    {
        return this.#precoVenda;
    }
    set precoVenda(novoPreco)
    {
        this.#precoVenda = novoPreco
    }

    get validade()
    {
        return this.#validade;
    }
    set validade(novaValidade)
    {
        this.#validade = novaValidade;
    }

    get qtdEstoque()
    {
        return this.#qtdEstoque;
    }
    set qtdEstoque(novaQtd)
    {
        this.#qtdEstoque = novaQtd;
    }

    toJSON(){
        return {
            cod:this.#cod,
            desc:this.#desc,
            precoCusto:this.#precoCusto,
            precoVenda:this.#precoVenda,
            validade:this.#validade,
            qtdEstoque:this.#qtdEstoque,
        }
    }

    
    async gravar()
    {
        const prodDAO = new ProdutoDAO();
        await prodDAO.gravar(this);
    }

    async excluir()
    {
        const prodDAO = new ProdutoDAO();
        await prodDAO.excluir(this);
    }

    async atualizar()
    {
        const prodDAO = new ProdutoDAO();
        await prodDAO.atualizar(this);
    }

    async consultar(parametro)
    {
        const prodDAO = new ProdutoDAO();
        return await prodDAO.consultar(parametro);
    }
}