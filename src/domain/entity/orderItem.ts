export default class OrderItem {
    private _id:string;
    private _idProduto:string;
    private _nome:string;
    private _preco:number;
    private _quantidade:number;

    constructor(id:string, nome:string, preco:number, quantidade:number, idProduto:string){
        this._id = id;
        this._nome = nome;
        this._preco = preco;
        this._quantidade = quantidade;
        this._idProduto = idProduto;
    }

    get nome(): string {
      return this._nome;
    }

    get idProduto(): string {
      return this._idProduto;
    }

    get id(): string {
      return this._id;
  }

    get preco(): number {
        return this._preco;
    }

    get quantidade(): number {
        return this._quantidade;
      }

      orderItemTotal(): number {
        return this._preco * this._quantidade;
      }
}
