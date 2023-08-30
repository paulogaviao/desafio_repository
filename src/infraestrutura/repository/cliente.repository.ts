import Cliente from "../../domain/entity/cliente";
import Endereco from "../../domain/entity/endereco";
import ClienteRepositoryInterface from "../../domain/repository/clienteRepositoryInterface"
import ClienteModel from "../../infraestrutura/db/sequelize/model/cliente.model";

export default class ClienteRepository implements ClienteRepositoryInterface {
  async create(entity: Cliente): Promise<void> {
    await ClienteModel.create({
      id: entity.id,
      nome: entity.nome,
      rua: entity.endereco._rua,
      numero: entity.endereco._numero,
      cep: entity.endereco._cep,
      cidade: entity.endereco._cidade,
      ativo: entity.isAtivo(),
      pontos: entity.pontos,
    });
  }

  async update(entity: Cliente): Promise<void> {
    await ClienteModel.update(
      {
        id: entity.id,
         nome: entity.nome,
         rua: entity.endereco._rua,
         numero: entity.endereco._numero,
         cep: entity.endereco._cep,
         cidade: entity.endereco._cidade,
         ativo: entity.isAtivo(),
         pontos: entity.pontos,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Cliente> {
    let clienteModel;
    try {
      clienteModel = await ClienteModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Cliente nao encontrado");
    }

    const cliente = new Cliente(id, clienteModel.nome);
    const address = new Endereco(
      clienteModel.rua,
      clienteModel.numero,
      clienteModel.cep,
      clienteModel.cidade
    );
    cliente.changeAddress(address);
    return cliente;
  }

  async findAll(): Promise<Cliente[]> {
    const clienteModels = await ClienteModel.findAll();

    const clientes = clienteModels.map((clienteModels) => {
      let cliente = new Cliente(clienteModels.id, clienteModels.nome);
      cliente.somaPontos(clienteModels.pontos);
      const endereco = new Endereco(
        clienteModels.rua,
        clienteModels.numero,
        clienteModels.cep,
        clienteModels.cidade
      );
      cliente.endereco = endereco;
      if (clienteModels.ativo) {
        cliente.ativar();
      }
      return cliente;
    });

    return clientes;
  }
}