import EventHandlerInterface from "./event-handler.interface";
import EventoInterface from "./event.interface";

export default interface EventDispatcherInterface{
    notify(event: EventoInterface):void;
    register(eventName: string, eventHandler: EventHandlerInterface):void;
    unregister(eventName: string, eventHandler: EventHandlerInterface):void;
    unregisterAll():void;
}