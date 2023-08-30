import {
    Table,
    Model,
    PrimaryKey,
    Column,
    ForeignKey,
    BelongsTo,
  } from "sequelize-typescript";
  import ProdutoModel from "../model/produto.model";
  import OrdemModel from "../model/ordem.model";
  
  
  @Table({
    tableName: "order_items",
    timestamps: false,
  })
  export default class OrdemItemModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;
  
    @ForeignKey(() => ProdutoModel)
    @Column({ allowNull: false })
    declare produto_id: string;

    @Column({ allowNull: false })
    declare nome: string;

    @Column({ allowNull: false })
    declare preco: number;

    @Column({ allowNull: false })
    declare quantidade: number;
  
    @ForeignKey(() => OrdemModel)
    @Column({ allowNull: false })
    declare ordem_id: string;
  
    @BelongsTo(() => OrdemModel)
    declare ordem: OrdemModel;
  
    @BelongsTo(() => ProdutoModel)
    declare produto: ProdutoModel;
  }
  