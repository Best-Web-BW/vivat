export default class EventListProvider {
    static events;

    static getEventList() {
        return new Promise(async (resolve, reject) => {
            if(!this.events) {
                try {
                    const response = await fetch("/api/events");
                    const json = await response.json();
                    this.events = json;
                } catch(e) {
                    reject([]);
                }
            }

            resolve(this.events);
        });
    }
}