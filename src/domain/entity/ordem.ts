import OrderItem from "./orderItem";
export default class Ordem{
    private _id:string;
    private _clienteId:string;
    private _total: number;
    private _items:OrderItem[];

    constructor(id:string, clienteId:string, orderItem:OrderItem[]){
        this._id = id;
        this._clienteId = clienteId;
        this._items = orderItem;
        this._total = this.total();
        this.validar();
    } 
    validar(): boolean{
        if(this._id.length ===0){
            throw new Error("escreva um id")
        }

        if(this._clienteId.length ===0){
            throw new Error("escreva um id do cliente")
        }

        if(this._items.length ===0){
            throw new Error("preencha uma ordem item")
        }

        if(this._items.some(item =>item.quantidade <=0)){
            throw new Error("quantidade deve ser maior que zero")
        }
        return true
    }

    mudaCliente(idCliente :string){
       this._clienteId = idCliente;
    }

    get id() : string {
        return this._id;
    }

    get idCliente() : string {
        return this._clienteId;
    }
    
    get items(): OrderItem[] {
        return this._items;
      }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
      }
}