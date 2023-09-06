import EventHandlerInterface from "../../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";
import CustomerUpdateEvent from "../customer-update.event";

export default interface EventEnviaInterface{
    notifica(event: CustomerCreatedEvent):void;
    cria(eventName: string, eventHandler: EventHandlerInterface):void;
    altera(eventName: string, eventHandler: EventHandlerInterface, eventHandlerUp: EventHandlerInterface): void;
}
