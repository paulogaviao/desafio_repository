import EventoInterface from "../../@shared/event.interface";

export default class CustomerCreatedEvent implements EventoInterface {

    dataTimeOcurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dataTimeOcurred = new Date();
        this.eventData = eventData;
    }
    
}