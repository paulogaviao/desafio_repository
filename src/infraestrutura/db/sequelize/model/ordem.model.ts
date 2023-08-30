import {
    Table,
    Model,
    PrimaryKey,
    Column,
    ForeignKey,
    BelongsTo,
    HasMany,
  } from "sequelize-typescript";
  import ClienteModel from "../../sequelize/model/cliente.model";
  import OrderItemModel from "../../sequelize/model/ordemItem.model";
  
  @Table({
    tableName: "ordens",
    timestamps: false,
  })
  export default class OrdermModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;
  
    @ForeignKey(() => ClienteModel)
    @Column({ allowNull: false })
    declare cliente_id: string;

    @Column({ allowNull: false })
    declare total: number;

    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[];
  
    @BelongsTo(() => ClienteModel)
    declare cliente: ClienteModel;
  }