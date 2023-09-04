import { Sequelize } from "sequelize-typescript";
import Ordem from "../../domain/entity/ordem";
import OrderItem from "../../domain/entity/orderItem";
import Cliente from "../../domain/entity/cliente";
import Endereco from "../../domain/entity/endereco";
import Produto from "../../domain/entity/Produto";
import ClienteModel from "../../infraestrutura/db/sequelize/model/cliente.model";
import ClienteRepository from "../../infraestrutura/repository/cliente.repository";
import ProdutoModel from '../db/sequelize/model/produto.model';
import ProdutoRepositorio from "../../infraestrutura/repository/produto.repository"
import OrdemItemModel from "../db/sequelize/model/ordemItem.model";
import OrdemModel from "../db/sequelize/model/ordem.model";
import OrdemRepository from "../repository/ordem.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      ClienteModel,
      OrdemModel,
      OrdemItemModel,
      ProdutoModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("criar nova ordem", async () => {
    const clienteRepository = new ClienteRepository();
    const cliente = new Cliente("123", "Customer 1");
    const endereco = new Endereco("Street 1", 1, "Zipcode 1", "City 1");
    cliente.changeAddress(endereco);
    await clienteRepository.create(cliente);

    const produtoRepository = new ProdutoRepositorio();
    const produto = new Produto("123", "Product 1", 10);
    await produtoRepository.create(produto);

    const orderItem = new OrderItem(
      "1",
      produto.name,
      produto.preco,
      2,
      produto.id
    );

    const order = new Ordem("123", "123", [orderItem]);

    const orderRepository = new OrdemRepository();
    await orderRepository.create(order);

    const orderModel = await OrdemModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      cliente_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          produto_id: "123",
          nome: orderItem.nome,
          preco: orderItem.preco,
          quantidade: orderItem.quantidade,
          ordem_id: "123",
        },
      ],
    });
  });

  it("Editando Ordem", async () => {
    const clienteRepository = new ClienteRepository();
    const cliente = new Cliente("123", "Customer 1");
    const endereco = new Endereco("Street 1", 1, "Zipcode 1", "City 1");
    cliente.changeAddress(endereco);
    await clienteRepository.create(cliente);

    const produtoRepository = new ProdutoRepositorio();
    const produto = new Produto("123", "Product 1", 10);
    await produtoRepository.create(produto);

    const orderItem = new OrderItem(
      "1",
      produto.name,
      produto.preco,
      2,
      produto.id
    );

    const order = new Ordem("123", "123", [orderItem]);

    const orderRepository = new OrdemRepository();
    orderRepository.create(order);
    

    order.mudaCliente("1")
    await orderRepository.update(order);

    const orderModel = await OrdemModel.findOne({
      where: { id: order.id }
    });
    expect(orderModel.toJSON()).toMatchObject({
      cliente_id: "123",
      total: order.total(),
    });
    console.log(orderModel.toJSON());
  });

  it("pesquisa ordem", async () => {
    const clienteRepository = new ClienteRepository();
    const cliente = new Cliente("123", "Customer 1");
    const endereco = new Endereco("Street 1", 1, "Zipcode 1", "City 1");
    cliente.changeAddress(endereco);
    await clienteRepository.create(cliente);

    const produtoRepository = new ProdutoRepositorio();
    const produto = new Produto("123", "Product 1", 10);
    await produtoRepository.create(produto);

    const orderItem = new OrderItem(
      "1",
      produto.name,
      produto.preco,
      2,
      produto.id
    );

    const order = new Ordem("123", "123", [orderItem]);

    const orderRepository = new OrdemRepository();
    await orderRepository.create(order);

    const ordemPesquisa = await orderRepository.find(order.id);

    expect(order).toStrictEqual(ordemPesquisa);
  });

  it("Erro ao consultar ordem, nao encontrado", async () => {
    const orderRepository = new OrdemRepository();

    expect(async () => {
      const ordemPesquisa = await orderRepository.find("1g3f4");
    }).rejects.toThrow("Ordem nao encontrado");
  });

  it("pesquisa todas ordens", async () => {
    const clienteRepository = new ClienteRepository();
    const produtoRepository = new ProdutoRepositorio();
    const orderRepository = new OrdemRepository();
    //ordem 1
    const cliente = new Cliente("123", "Customer 1");
    const endereco = new Endereco("Street 1", 1, "Zipcode 1", "City 1");
    cliente.changeAddress(endereco);
    await clienteRepository.create(cliente);

    const produto = new Produto("123", "Product 1", 10);
    await produtoRepository.create(produto);

    const orderItem = new OrderItem(
      "1",
      produto.name,
      produto.preco,
      2,
      produto.id
    );

    const order = new Ordem("123", "123", [orderItem]);
    //ordem 1

    //ordem 2
    const cliente2 = new Cliente("1234", "Customer 2");
    const endereco2 = new Endereco("Street 2", 2, "Zipcode 2", "City 2");
    cliente2.changeAddress(endereco2);
    await clienteRepository.create(cliente2);

    const produto2 = new Produto("1234", "Product 2", 20);
    
    await produtoRepository.create(produto2);

    const orderItem2 = new OrderItem(
      "2",
      produto2.name,
      produto2.preco,
      1,
      produto2.id
    );

    const order2 = new Ordem("1234", "1234", [orderItem2]);
    //ordem 2
    
    await orderRepository.create(order);
    await orderRepository.create(order2);

    const ordens = await orderRepository.findAll();

    expect(ordens).toHaveLength(2);
    expect(ordens).toContainEqual(order);
    expect(ordens).toContainEqual(order2);
  });

});