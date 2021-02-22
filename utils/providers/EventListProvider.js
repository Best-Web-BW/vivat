import { sleep } from "../common";
import DBProvider from "./DBProvider";

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

    static getEventList() {
        return new Promise(async (resolve, reject) => {
            try {
                if(!this.isFetched) { // If event list hasn't fetched yet
                    // If event list is fetching right now
                    if(this.isFetching) while(this.isFetching) await sleep(50);
                    else { // If event list isn't fetching right now (the first getEventList call)
                        this.isFetching = true;
                        
                        const events = await DBProvider.getEventList();
                        for(let event of events) if(!this.events.has(event.id)) this.events.set(event.id, event);

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
                if(!event || !event.full) {
                    const _event = await DBProvider.getEventDetails(id);
                    this.events.set(_event.id, _event);
                }
                resolve(this.events.get(id));
            } catch(e) { reject({ }) };
        });
    }

    static createEvent(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("/api/admin/event/create", {
                    method: "POST",
                    headers: { "Content-Type": "application/json;charset=utf-8" },
                    body: JSON.stringify({ data })
                });
                const json = await response.json();
                if(json.status === "success") {
                    // this.events.set(json.event.id, json.event);
                    return resolve({ success: 1 });
                } else return resolve({ success: 0, reason: json.error });
            } catch(e) { reject({}); }
        });
    }

    static editEvent(id, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("/api/admin/event/edit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json;charset=utf-8" },
                    body: JSON.stringify({ data: { id, ...data } })
                });
                const json = await response.json();
                if(json.status === "success") {
                    // this.events.set(json.event.id, json.event);
                    return resolve({ success: 1 });
                } else return resolve({ success: 0, reason: json.error });
            } catch(e) { console.error(e); reject({ }); }
        });
    }

    static removeEvent(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("/api/admin/event/remove", {
                    method: "POST",
                    headers: { "Content-Type": "application/json;charset=utf-8" },
                    body: JSON.stringify({ data: { id } })
                });
                const json = await response.json();
                if(json.status === "success") {
                    return resolve({ success: 1 });
                } else return resolve({ success: 0, reason: json.error });
            } catch(e) { console.error(e); reject(); }
        });
    }
}