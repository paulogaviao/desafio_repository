import {AllowNull, Column, Model, PrimaryKey, Table} from "sequelize-typescript";
@Table({
    tableName:"Produtos",
    timestamps:false
})
export default class ProdutoModel extends Model{
    @PrimaryKey
    @Column
    declare id :string;

    @Column
    declare nome :string;

    @Column
    declare preco :number;
}