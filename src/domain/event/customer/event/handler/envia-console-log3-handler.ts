import EventHandlerInterface from "../../../@shared/event-handler.interface";
import EventoInterface from "../../../@shared/event.interface";
import CustomerCreatedEvent from "../../../customer/event/customer-created.event";

export default class EnviaConsoleLog3Handler implements EventHandlerInterface<CustomerCreatedEvent> {

    handle(event: CustomerCreatedEvent): void {
        console.log("Esse é o terceiro console.log do evento: CustomerEditAdress" , JSON.stringify(event.eventData, null, 2))
    }
    
}