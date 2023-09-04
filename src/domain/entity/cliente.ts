import Endereco from "./endereco" 
export default class Cliente {
    private _id:string;
    private _nome:string;
    private _endereco!: Endereco;
    private _ativo :boolean = false;
    private _pontos : number = 0;
    
    constructor(id:string, nome:string){
        this._id = id;
        this._nome = nome;
        this.validar();   
    }

    validar(){
        if(this._nome.length === 0){
            throw new Error("escreva um nome");
        }
        if(this._id.length === 0){
            throw new Error("escreva um id");
        }
    }

    ativar(){
        if(this._endereco === undefined){
            throw new Error("não é possível ativar cliente, cliente não possui endereço!!")
        }
        this._ativo = true;
    }

    desativar(){
        this._ativo = false
    }

    isAtivo(){
        return this._ativo;
    }

    changeName(nome :string){
        this._nome = nome;
    }

    changeAddress(endereco: Endereco) {
        this._endereco = endereco;
      }

    somaPontos(pontos: number){
        this._pontos += pontos;
    }
    
    public get id() : string {
        return this._id;
    }
    
    public get nome() : string {
        return this._nome;
    }

    get pontos() : number {
        return this._pontos;
    }
    
    public get endereco() : Endereco {
        return this._endereco;
    }
    
    public set endereco(endereco : Endereco) {
        this._endereco = endereco;
    }

    public set id(id : string) {
        this._id = id;
    }
    
    
    public set nome(nome : string) {
        this._nome = nome;
    }
    
}