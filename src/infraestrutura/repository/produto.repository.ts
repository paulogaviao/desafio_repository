import Produto from "../../domain/entity/Produto";
import ProdutoRepositoryInterface from "../../domain/repository/produtoRepositoryInterface"
import ProdutoModel from "../db/sequelize/model/produto.model";
export default class ProdutoRepositorio implements ProdutoRepositoryInterface{
    async create(produto :Produto):Promise<void>{
        await ProdutoModel.create({
            id: produto.id,
            nome: produto.name,
            preco: produto.preco
        });
    }
    async find(id :string):Promise<Produto>{
        let prdModel; 
        try {
            prdModel = await ProdutoModel.findOne(
                {
                    where: { 
                        id 
                    },
                    rejectOnEmpty:true
                });
        } catch (error) {
            throw new Error("Produto nao encontrado")
        }
        return new Produto(
            prdModel.id,
            prdModel.nome,
            prdModel.preco
        );
    }
    async findAll():Promise<Produto[]>{
        const prdsModel = await ProdutoModel.findAll();
        return prdsModel.map((prd) => new Produto(prd.id,prd.nome,prd.preco));
    }
    async update(produto :Produto):Promise<void>{
        await ProdutoModel.update(
            {
            nome:produto.name,
            preco:produto.preco
            },
            {
              where:{
                  id:produto.id
              }  
            }
        );
    }
}