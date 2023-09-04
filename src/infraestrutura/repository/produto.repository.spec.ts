import {Sequelize} from 'sequelize-typescript';
import Produto from '../../domain/entity/Produto';
import ProdutoModel from '../db/sequelize/model/produto.model';
import ProdutoRepositorio from "../../infraestrutura/repository/produto.repository"
describe("Produto repository teste", ()=>{
    let sequelize : Sequelize;
    beforeEach(async () =>{
        sequelize = new Sequelize({
            dialect:'sqlite',
            storage:':memory:',
            logging: false,
            sync:{force:true},
        });

        sequelize.addModels([ProdutoModel]);
        await sequelize.sync()
    });

    afterEach(async () =>{
       await sequelize.close();
    });

    it("Criar produtos do banco",async()=>{
      const produtoRepositorio = new ProdutoRepositorio();
      const produto =new Produto("1","teste",100);

      produtoRepositorio.create(produto);
        const produtoModel = await ProdutoModel.findOne({where : {id:"1"}})

        expect(produtoModel.toJSON()).toStrictEqual({
            id:"1",
            nome:"teste",
            preco:100
        })

    });

    it("Update produtos do banco",async()=>{
        const produtoRepositorio = new ProdutoRepositorio();
        const produto =new Produto("1","teste",100);
  
        produtoRepositorio.create(produto);
        const produtoModel = await ProdutoModel.findOne({where : {id:"1"}})
  
        produto.changeNome("teste2");
        produto.changePreco(200);

        produtoRepositorio.update(produto);
        const produtoModel2 = await ProdutoModel.findOne({where : {id:"1"}})

        expect(produtoModel2.toJSON()).toStrictEqual({
            id:"1",
            nome:"teste2",
            preco:200
        })
      });

      it("find produtos do banco",async()=>{
        const produtoRepositorio = new ProdutoRepositorio();
        const produto =new Produto("1","teste",100);
  
        produtoRepositorio.create(produto);
        const produtoModel = await ProdutoModel.findOne({where : {id:"1"}})
        const produtoEncontrado = await produtoRepositorio.find("1")

        expect(produtoModel.toJSON()).toStrictEqual({
            id: produtoEncontrado.id,
            nome:produtoEncontrado.name,
            preco:produtoEncontrado.preco
        })
      });

      it("produto nao encontrado do banco",async()=>{
        const produtoRepositorio = new ProdutoRepositorio();
        expect(async ()=>{
          await produtoRepositorio.find("0df");
        }).rejects.toThrow("Produto nao encontrado");
      });

      it("findAll produtos do banco",async()=>{
        const produtoRepositorio = new ProdutoRepositorio();
        const produto =new Produto("1","teste",100);
        const produto2 =new Produto("2","teste2",200);
  
        produtoRepositorio.create(produto);
        produtoRepositorio.create(produto2);

        const produtosEncontrado = await produtoRepositorio.findAll();
        const produtos = [produto,produto2];

        expect(produtos).toEqual(produtosEncontrado);
      });
});