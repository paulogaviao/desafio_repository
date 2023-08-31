import EventoInterface from "./event.interface";

export default interface EventHandlerInterface  < T extends EventoInterface = EventoInterface>{
    handle(event: T): void;
}