import EventHandlerInterface from "../../../@shared/event-handler.interface";
import EventoInterface from "../../../@shared/event.interface";
import CustomerCreatedEvent from "../../../customer/event/customer-created.event";

export default class EnviaConsoleLog2Handler implements EventHandlerInterface<CustomerCreatedEvent> {

    handle(event: EventoInterface): void {
        console.log("Esse é o segundo console.log do evento: CustomerCreated")
    }
    
}