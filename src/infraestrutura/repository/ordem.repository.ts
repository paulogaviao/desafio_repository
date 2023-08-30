import Ordem from "../../domain/entity/ordem";
import OrdemItemModel from "../db/sequelize/model/ordemItem.model";
import OrdemModel from "../db/sequelize/model/ordem.model";
import OrderItem from "../../domain/entity/orderItem";

export default class OrderRepository {
  async create(entity: Ordem): Promise<void> {
    await OrdemModel.create(
      {
        id: entity.id,
        cliente_id: entity.idCliente,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          nome: item.nome,
          preco: item.preco,
          quantidade: item.quantidade,
          produto_id: item.idProduto,
        })),
      },
      {
        include: [{ model: OrdemItemModel }],
      }
    );
  }

  async update(entity :Ordem):Promise<void>{
    OrdemModel.update(
        {
          id: entity.id,
          cliente_id: entity.idCliente,
          total: entity.total(),
          items: entity.items.map((item) => ({
            id: item.id,
            nome: item.nome,
            preco: item.preco,
            quantidade: item.quantidade,
            produto_id: item.idProduto,
          }))
        },
        {
          where:{
              id:entity.id
          } 
        }
        
    );
}

async find(id: string): Promise<Ordem> {
  let ordemModel;
  try {
    ordemModel = await OrdemModel.findOne({
      where: {
        id,
      },
      include: [{ model: OrdemItemModel }],
      rejectOnEmpty: true
    });
  } catch (error) {
    throw new Error("Ordem nao encontrado");
  }
  let ordemItens: OrderItem[] = [];
for (let index = 0; index < ordemModel.items.length; index++) {
  const item = ordemModel.items[index];
  const ordemItem = new OrderItem(item.id,item.nome,item.preco,item.quantidade,item.produto_id);
  ordemItens.push(ordemItem); 
}
    const ordem = new Ordem(id,ordemModel.cliente_id, ordemItens);
  
  return ordem;
}

async findAll(): Promise<Ordem[]> {
  
  const ordemModels = await OrdemModel.findAll({
    include: [{ model: OrdemItemModel }]
  });
  
  const ordens = ordemModels.map((ordemModel) => {
    let ordemItens: OrderItem[] = [];
    for (let index = 0; index < ordemModel.items.length; index++) {
      const item = ordemModel.items[index];
      const ordemItem = new OrderItem(item.id,item.nome,item.preco,item.quantidade,item.produto_id);
      ordemItens.push(ordemItem); 
    }
        const ordem = new Ordem(ordemModel.id,ordemModel.cliente_id, ordemItens);
      
      return ordem;
  });
  return ordens;
}

}
