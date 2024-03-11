export default class ItemPedido 
{
    #produto;
    #qtd;
    #valUnit;
    #subtotal; 
    
    constructor(produto, qtd, valUnit, subtotal) 
    {
        this.#produto = produto;
        this.#qtd = qtd;
        this.#valUnit = valUnit;
        this.#subtotal = qtd*valUnit;
    }

    get produto() 
    {
        return this.#produto;
    }
    set produto(novoProduto) 
    {
        this.#produto = novoProduto;
    }

    get qtd()
    {
        return this.#qtd;
    }
    set qtd(novaQtd) 
    {
        this.#qtd = novaQtd;
    }

    get valUnit() 
    {
        return this.#valUnit;
    }
    set valUnit(novoValUnit) 
    {
        this.#valUnit = novoValUnit;
    }
    
    get subtotal() 
    {
        this.#subtotal = this.#qtd*this.#valUnit;
        return this.#subtotal;
    }

    toJSON() 
    {
        return{
            produto: this.#produto,
            qtd: this.#qtd,
            valUnit: this.#valUnit,
            subtotal: this.#subtotal
        };
    }
}