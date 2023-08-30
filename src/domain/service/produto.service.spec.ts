import Produto from "../entity/Produto";
import ProdutoService from "./produto.service";
describe("Produto service teste unitario", ()=>{

    it("Mudança de preço de todos os produtos",()=>{
        const produto1 = new Produto("1","prdt1",1);
        const produto2 = new Produto("2","prdt2",2);
        const produtos = [produto1,produto2];

        ProdutoService.adicionaPreco(produtos,100)
        expect(produto1.preco).toBe(2);
        expect(produto2.preco).toBe(4);
    });

});