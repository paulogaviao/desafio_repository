import Cliente from "../entity/cliente";
import Ordem from "../entity/ordem";
import OrderItem from "../entity/orderItem";
import {v4 as uuid}from "uuid";

export default class OrdemService{

    static criarOrdem(cliente: Cliente,items:OrderItem[]):Ordem{
        if(items.length ===0){
            throw new Error("lista de ordemItens vazia")
        }
        const ordem = new Ordem(uuid(),cliente.id, items)
        cliente.somaPontos(ordem.total()/2);
        return ordem;
    }
    static total(ordens: Ordem[]):number{
        return ordens.reduce((acc,order)=>acc + order.total(),0);
    }
}