import Produto from "../entity/Produto";
export default class ProdutoService{
    static adicionaPreco(produtos: Produto[],percentual:number) : void{
        produtos.forEach(produto => {
            produto.changePreco((produto.preco * percentual)/100 + produto.preco);
        });
    }
}