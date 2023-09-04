import Ordem from "../entity/ordem";
import Cliente from "../entity/cliente";
import OrderItem from "../entity/orderItem";
import OrdemService from "./ordem.service";
describe("Ordem service teste unitario", ()=>{

    it("criar uma ordem",()=>{
        const cliente = new Cliente("1","Justin");
        const ordemItem = new OrderItem("1","item1", 10, 1, "1");

        const ordem = OrdemService.criarOrdem(cliente,[ordemItem]);
        expect(cliente.pontos).toBe(5);
        expect(ordem.total()).toBe(10);
    });

    it("Soma total de todas as ordens",()=>{
        const ordemItem = new OrderItem("1","item1", 10, 1, "1");
        const ordemItem2 = new OrderItem("1","item1", 20,2,"1");

        const ordem = new Ordem("1","1",[ordemItem]);
        const ordem2 = new Ordem("2","1",[ordemItem2]);

        const total = OrdemService.total([ordem,ordem2]);
        expect(total).toBe(50);
    });

});