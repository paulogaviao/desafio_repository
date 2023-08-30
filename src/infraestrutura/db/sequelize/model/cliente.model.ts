import {AllowNull, Column, Model, PrimaryKey, Table} from "sequelize-typescript";

  @Table({
    tableName: "clientes",
    timestamps: false,
  })
  export default class ClienteModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;
  
    @Column({ allowNull: false })
    declare nome: string;
  
    @Column({ allowNull: false })
    declare rua: string;
  
    @Column({ allowNull: false })
    declare numero: number;
  
    @Column({ allowNull: false })
    declare cep: string;
  
    @Column({ allowNull: false })
    declare cidade: string;
  
    @Column({ allowNull: false })
    declare ativo: boolean;
  
    @Column({ allowNull: false })
    declare pontos: number;
  }