export default class EventListProvider {
    static events = new Map();
    static isFetched = false;
    static isFetching = false;
    static currentDate = this.getCurrentDate();

    static getCurrentDate() {
        const date = new Date();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${date.getFullYear()}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
    }

    static loadEventList() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`/api/events?date=${this.currentDate}`);
                const json = await response.json();
                for(let event of json) if(!this.events.has(event.id)) this.events.set(event.id, event);
                resolve();
            } catch(e) { reject(); }
        });
    }

    static loadEventDetails(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`/api/events/${id}`);
                const event = await response.json();
                this.events.set(id, event);
                resolve();
            } catch(e) { reject(); }
        });
    }

    static getEventList() {
        return new Promise(async (resolve, reject) => {
            try {
                if(!this.isFetched) { // If event list hasn't fetched yet
                    // If event list is fetching right now
                    if(this.isFetching) while(this.isFetching) await sleep(50);
                    else { // If event list isn't fetching right now (the first getEventList call)
                        this.isFetching = true;
                        await this.loadEventList();
                        this.isFetched = true;
                        this.isFetching = false;
                    }
                }
                resolve(Array.from(this.events.values()));
            } catch(e) { reject([ ]); }
        });
    }

    static getEventDetails(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const event = this.events.get(id);
                if(!event || !event.full) await this.loadEventDetails(id);
                resolve(this.events.get(id));
            } catch(e) { reject({ }) };
        });
    }
}