export default class Endereco {
    _rua:string="";
    _numero:number=0;
    _cep:string="";
    _cidade:string="";

    constructor(rua:string, numero:number, cep:string, cidade:string){
        this._rua=rua;
        this._numero=numero;
        this._cep=cep;
        this._cidade=cidade;
        this.validacao();
    }

    validacao(){
        if(this._rua.length===0){
            throw new Error("deve se informar a rua para o processo");
        }
        if(this._numero === null || this._numero === 0){
            throw new Error("deve se informar o numero para o processo");
        }
        if(this._cidade.length===0){
            throw new Error("deve se informar a cidade para o processo");
        }
        if(this._cep.length===0){
            throw new Error("deve se informar o cep para o processo");
        }
    }
}