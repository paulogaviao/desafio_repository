import Cliente from "./cliente";
import Endereco from "./endereco";

describe("teste unitario de cliente",()=>{

    it("should get 1 as result id is null or empty", () =>{
        expect(()=>{
            let cliente = new Cliente("","jão");
        }).toThrowError("escreva um id");
    });

    it("should get 1 as result nome is null or empty", () =>{
        expect(()=>{
            let cliente = new Cliente("1","");
        }).toThrowError("escreva um nome");
    });

    it("should get change nome", () =>{
        let cliente = new Cliente("1","jão");
        cliente.changeName("justin")
        expect(cliente.nome).toBe("justin");
    });

    it("should get ativar cliente", () =>{
        const cliente = new Cliente("1","maria");
        const endereco = new Endereco("rua 1", 1,"12345678","itaqui");
        cliente.endereco = endereco;
        cliente.ativar();
        expect(cliente.isAtivo()).toBe(true);
    });

    it("should get tentativa de ativar cliente jogando erro de endereço vazio", () =>{
        expect(()=>{
            const cliente = new Cliente("1","maria");
            cliente.ativar();
        }).toThrowError("não é possível ativar cliente, cliente não possui endereço!!");
    });


    it("should get desativar cliente", () =>{
        const cliente = new Cliente("1","maria");
        cliente.desativar();
        expect(cliente.isAtivo()).toBe(false);
    });

    it("should get adicionar pontos", () =>{
        const cliente = new Cliente("1","maria");

        cliente.somaPontos(10);
        expect(cliente.pontos).toBe(10);

        cliente.somaPontos(10);
        expect(cliente.pontos).toBe(20);
    });

});