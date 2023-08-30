import Cliente from './domain/entity/cliente';
import Endereco from './domain/entity/endereco';
import Ordem from './domain/entity/ordem';
import OrderItem from './domain/entity/orderItem';

let cliente = new Cliente("1","jão");
const ender = new Endereco("marechal costa",2,"8554766","pato branco");
cliente.endereco = ender;
cliente.ativar;

const item1 = new OrderItem("1","mouse", 25,1,"1");
const item2 = new OrderItem("1","teclado", 40,1,"2");

const ordem = new Ordem("1","1",[item1,item2])