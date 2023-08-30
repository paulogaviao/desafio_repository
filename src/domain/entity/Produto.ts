export default class Produto{
    private _id : string;
    private _nome : string;
    private _preco : number;

    constructor(id:string, nome:string,preco:number){
        this._id = id;
        this._nome = nome;
        this._preco = preco;
        this.validar();
    }

    validar(){
        if(this._id.length === 0){
            throw new Error("escreva um id");
        }

        if(this._nome.length === 0){
            throw new Error("escreva um nome");
        }

        if(this._preco < 0){
            throw new Error("escreva um preco maior que zero");
        }
        return true;
    }

    changeNome(nome:string):void{
        this._nome = nome;
        this.validar();
    }

    changePreco(preco:number):void{
        this._preco = preco;
        this.validar();
    }

    get id():string {
        return this._id
    }

    get name():string {
        return this._nome
    }

    get preco():number {
        return this._preco
    }
}