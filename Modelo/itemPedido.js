export default class ItemPedido 
{
    #produto;
    #qtd;
    #valUnit;
    #subTotal; 
    
    constructor(produto, qtd, valUnit, subTotal) 
    {
        this.#produto = produto;
        this.#qtd = qtd;
        this.#valUnit = valUnit;
        this.#subTotal = subTotal;
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
    
    get subTotal()
    {
        return this.#subTotal;
    }
    set subTotal(novoSubTotal) 
    {
        this.#subTotal = novoSubTotal;
    }

    toJSON() 
    {
        return{
            produto: this.#produto,
            qtd: this.#qtd,
            valUnit: this.#valUnit,
            subTotal: this.#subTotal
        };
    }
}