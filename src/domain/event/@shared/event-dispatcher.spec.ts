import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreateHandler from "../product/handler/send-email-when-product-is-created-handler"
import ProductCreatedEvent from "../product/product-created.event";
describe("domain events teste",()=>{
    it("registrar event handler",()=>{
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreateHandler();
        eventDispatcher.register("ProductCreateEvent",eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreateEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreateEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreateEvent"][0]).toMatchObject(eventHandler);
    });

    it("desregistrar event handler",()=>{
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreateHandler();
        eventDispatcher.register("ProductCreateEvent",eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreateEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreateEvent",eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreateEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreateEvent"].length).toBe(0);

    });

    it("desregistrar todos event handler",()=>{
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreateHandler();
        eventDispatcher.register("ProductCreateEvent",eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreateEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll()
        expect(eventDispatcher.getEventHandlers["ProductCreateEvent"]).toBeUndefined();
    });

    it("notify event handler",()=>{
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreateHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        eventDispatcher.register("ProductCreateEvent",eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreateEvent"][0]).toMatchObject(eventHandler);

        const productCreateEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0,
        });

        eventDispatcher.notify(productCreateEvent);
        expect(spyEventHandler).toHaveBeenCalled();
    });
});