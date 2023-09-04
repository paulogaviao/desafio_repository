import Ordem from "./ordem";
import OrderItem from "./orderItem";
describe("teste unitario de Ordem",()=>{

    it("should get 1 as result id is null or empty", () =>{
        expect(()=>{
            let ordem = new Ordem("","1",[])
        }).toThrowError("escreva um id");
    });

    it("should get 1 as result id do cliente is null or empty", () =>{
        expect(()=>{
            let ordem = new Ordem("1","",[])
        }).toThrowError("escreva um id do cliente");
    });

    it("should get 1 as result ordemItem is null or empty", () =>{
        expect(()=>{
            let ordem = new Ordem("1","1",[])
        }).toThrowError("preencha uma ordem item");
    });

    it("should get 1 as result ordemItem calcular total", () =>{
      const item = new OrderItem("1","item1",10,1,"1");
      const item2 = new OrderItem("2","item2",20,1,"2");
      const ordem = new Ordem("1","1",[item])
      let total = ordem.total();
      expect(total).toBe(10);
      const ordem2 = new Ordem("1","1",[item,item2])
      total = ordem2.total();
      expect(total).toBe(30);
    })

    it("should get 1 as result ordemItem quantidade maior que zero", () =>{
        expect(()=>{
            const item = new OrderItem("1","item1",10,0,"1");
            let ordem = new Ordem("1","1",[item])
        }).toThrowError("quantidade deve ser maior que zero");
      })

});