import Ordem from "../../domain/entity/ordem";
import OrdemItemModel from "../db/sequelize/model/ordemItem.model";
import OrdemModel from "../db/sequelize/model/ordem.model";
import OrderItem from "../../domain/entity/orderItem";
import OrdemRepositoryInterface from "../../domain/repository/ordemRepositoryInterface";

export default class OrderRepository implements OrdemRepositoryInterface{
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
    const orderModel = await OrdemModel.findOne({ where: { id: entity.id }, include: [OrdemItemModel] });
    if (orderModel) {
      const items: OrderItem[] = entity.items.map((item) => {
        return new OrderItem(
          item.id,
          item.nome,
          item.preco,
          item.quantidade,
          item.idProduto,
          
        );
      });
      console.log(items);
      await orderModel.update({
        customer_id: entity.idCliente,
        total: entity.total(),
        items
      });
      
    }    

   /*await OrdemModel.update(
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
        
    );*/
}

async find(id: string): Promise<Ordem> {
  let ordemModel;
  try {
    ordemModel = await OrdemModel.findOne({
      where: {
        id,
      },
      include: ["items"],
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
    include: ["items"]
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
  /*let ordens : Ordem[] =[];
  for (let index = 0; index < ordemModels.length; index++) {
    let ordemModel= ordemModels[index];
    let ordemItens: OrderItem[] = [];
    for (let index = 0; index < ordemModel.items.length; index++) {
      const item = ordemModel.items[index];
      const ordemItem = new OrderItem(item.id,item.nome,item.preco,item.quantidade,item.produto_id);
      ordemItens.push(ordemItem); 
    }
      const ordem = new Ordem(ordemModel.id,ordemModel.cliente_id, ordemItens);
      ordens.push(ordem);
  }*/
  return ordens;
}

}