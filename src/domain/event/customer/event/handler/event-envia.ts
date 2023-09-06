import EventHandlerInterface from "../../../@shared/event-handler.interface";

import CustomerCreatedEvent from "../../../customer/event/customer-created.event";
import EventEnviaInterface from "./event-envia.interface";

export default class EventEnvia implements EventEnviaInterface{
     
    private eventHandlers:{[eventName:string]:EventHandlerInterface[]}={};

    get getEventHandlers():{[eventName:string]: EventHandlerInterface[]}{
        return this.eventHandlers;
    }

    notifica(event: CustomerCreatedEvent):void{
        const eventName = event.constructor.name;

        if(this.eventHandlers[eventName]){
            this.eventHandlers[eventName].forEach((eventHandler) => {
                eventHandler.handle(event);
            });
        }
    };

    cria(eventName:string, eventHandler:EventHandlerInterface): void{
        if(!this.eventHandlers[eventName]){
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(eventHandler);
    };
}