
import EventHandlerInterface from "../../../@shared/event-handler.interface";
import EventoInterface from "../../../@shared/event.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLog1Handler implements EventHandlerInterface<CustomerCreatedEvent> {

    handle(event: EventoInterface): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated")
    }
    
}