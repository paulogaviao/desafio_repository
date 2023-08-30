import { Sequelize } from "sequelize-typescript";
import Cliente from "../../domain/entity/cliente";
import Endereco from "../../domain/entity/endereco";
import ClienteModel from "../../infraestrutura/db/sequelize/model/cliente.model";
import ClienteRepository from "../../infraestrutura/repository/cliente.repository";

describe("Cliente repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClienteModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Criando Cliente", async () => {
    const customerRepository = new ClienteRepository();
    const cliente = new Cliente("123", "Customer 1");
    const endereco = new Endereco("Street 1", 1, "Zipcode 1", "City 1");
    cliente.endereco = endereco;
    await customerRepository.create(cliente);

    const clienteModel = await ClienteModel.findOne({ where: { id: "123" } });

    expect(clienteModel.toJSON()).toStrictEqual({
      id: "123",
      nome: cliente.nome,
      rua: endereco._rua,
      numero: endereco._numero,
      cep: endereco._cep,
      cidade: endereco._cidade,
      ativo: cliente.isAtivo(),
      pontos: cliente.pontos,
    });
  });

  it("Editando Cliente", async () => {
    const clienteRepository = new ClienteRepository();
    const cliente = new Cliente("123", "Customer 1");
    const endereco = new Endereco("Street 1", 1, "Zipcode 1", "City 1");
    cliente.endereco = endereco;
    await clienteRepository.create(cliente);

    cliente.changeName("Customer 2");
    await clienteRepository.update(cliente);
    const customerModel = await ClienteModel.findOne({ where: { id: "123" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "123",
      nome: cliente.nome,
      rua: endereco._rua,
      numero: endereco._numero,
      cep: endereco._cep,
      cidade: endereco._cidade,
      ativo: cliente.isAtivo(),
      pontos: cliente.pontos
    });
  });

  it("Pesquisa Cliente", async () => {
    const clienteRepository = new ClienteRepository();
    const cliente = new Cliente("123", "Customer 1");
    const endereco = new Endereco("Street 1", 1, "Zipcode 1", "City 1");
    cliente.endereco = endereco;
    await clienteRepository.create(cliente);

    const clienteResult = await clienteRepository.find(cliente.id);

    expect(cliente).toStrictEqual(clienteResult);
  });

  it("Erro ao consultar cliente, nao encontrado", async () => {
    const clienteRepository = new ClienteRepository();

    expect(async () => {
      await clienteRepository.find("456ABC");
    }).rejects.toThrow("Cliente nao encontrado");
  });

  it("Pesquisar todos os clientes", async () => {
    const clienteRepository = new ClienteRepository();
    const cliente1 = new Cliente("123", "Customer 1");
    const endereco1 = new Endereco("Street 1", 1, "Zipcode 1", "City 1");
    cliente1.endereco = endereco1;
    cliente1.somaPontos(10);
    cliente1.ativar;

    const cliente2 = new Cliente("456", "Customer 2");
    const endereco2 = new Endereco("Street 2", 2, "Zipcode 2", "City 2");
    cliente2.endereco = endereco2;
    cliente2.somaPontos(20);
    cliente2.ativar;
    
    await clienteRepository.create(cliente1);
    await clienteRepository.create(cliente2);

    const clientes = await clienteRepository.findAll();

    expect(clientes).toHaveLength(2);
    expect(clientes).toContainEqual(cliente1);
    expect(clientes).toContainEqual(cliente2);
  });
});