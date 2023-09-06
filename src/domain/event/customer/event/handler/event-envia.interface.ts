import EventHandlerInterface from "../../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default interface EventEnviaInterface{
    notifica(event: CustomerCreatedEvent):void;
    cria(eventName: string, eventHandler: EventHandlerInterface):void;
}