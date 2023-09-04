import Produto from "./Produto";

describe("teste unitario de Produto",()=>{

    it("should get 1 as result id is null or empty", () =>{
        expect(()=>{
            const prdt = new Produto("","produto 1",100)
        }).toThrowError("escreva um id");
    });

    
    it("should get 1 as result nome is null or empty", () =>{
        expect(()=>{
            const prdt = new Produto("1","",100)
        }).toThrowError("escreva um nome");
    });

    it("should get 1 as result preço is null or empty ou menor que 0", () =>{
        expect(()=>{
            const prdt = new Produto("1","Jão",-1)
        }).toThrowError("escreva um preco maior que zero");
    });

    it("should get 1 as result change nome", () =>{
        const prdt = new Produto("1","p1",10)
        prdt.changeNome("p2");
        expect(prdt.name).toBe("p2");
    });

    it("should get 1 as result change preco", () =>{
        const prdt = new Produto("1","p1",10)
        prdt.changePreco(20);
        expect(prdt.preco).toBe(20);
    });
  
});