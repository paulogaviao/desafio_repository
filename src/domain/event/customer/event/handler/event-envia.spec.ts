import Cliente from "../../../../entity/cliente";
import Endereco from "../../../../entity/endereco";
import CustomerCreatedEvent from "../customer-created.event";
import EnviaConsoleLog3Handler from "./envia-console-log3-handler";
import EventEnvia from "./event-envia";

describe("teste de notificacao altera endereco",()=>{


    it("alterando endereco e printando console",()=>{
       const eventDispatcher = new EventEnvia();
        const eventHandler = new EnviaConsoleLog2Handler();
        
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        eventDispatcher.cria("CustomerCreatedEvent",eventHandler);
       
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
        const clientets = new Cliente("123", "Customer 1");
        const endereco = new Endereco("Street 1", 1, "Zipcode 1", "City 1");
        clientets.endereco = endereco;

        const clienteString = "Endereço do cliente: {" + clientets.id + "}, {" + clientets.nome 
        + "} inserido  com: " + "RUA: "+clientets.endereco._rua + ", NUMERO: "+clientets.endereco._numero
        + ",CEP: "+clientets.endereco._cep + ",CIDADE: "+clientets.endereco._cidade ;

        const cliente = new CustomerCreatedEvent({
            clienteString
        });
        eventDispatcher.notifica(cliente);
        
        const enderecoNovo = new Endereco("Street 2", 1, "Zipcode 2", "City 2");
        clientets.changeAddress(enderecoNovo);

        const eventHandler2 = new EnviaConsoleLog3Handler();
        
        eventDispatcher.altera(cliente.constructor.name,eventHandler, eventHandler2);
        
        const clienteStringUp = "Endereço do cliente: {" + clientets.id + "}, {" + clientets.nome 
        + "} alterado para: " + "RUA: "+clientets.endereco._rua + ", NUMERO: "+clientets.endereco._numero
        + ",CEP: "+clientets.endereco._cep + ",CIDADE: "+clientets.endereco._cidade ;

        const clienteUp = new CustomerCreatedEvent({
            clienteStringUp
        });
        eventDispatcher.notifica(clienteUp);

        expect(spyEventHandler).toHaveBeenCalled();
    });
})
