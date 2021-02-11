import DBProvider from "./DBProvider";

export default class AlbumListProvider {
    static albums = new Map();
    static isFetched = false;
    static isFetching = false;

    static getAlbumList() {
        return new Promise(async (resolve, reject) => {
            try {
                if(!this.isFetched) { // If album list hasn't fetched yet
                    // If album list is fetching right now
                    if(this.isFetching) while(this.isFetching) await sleep(50);
                    else { // If album list isn't fetching right now (the first getAlbumList call)
                        this.isFetching = true;
                        
                        const albums = await DBProvider.getAlbumList();
                        for(let album of albums) if(!this.albums.has(album.id)) this.albums.set(album.id, album);

                        this.isFetched = true;
                        this.isFetching = false;
                    }
                }
                resolve(Array.from(this.albums.values()));
            } catch(e) { reject([ ]); }
        });
    }

    static getAlbumDetails(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let album = this.albums.get(id);
                if(!album || !album.full) {
                    const _album = await DBProvider.getAlbumDetails(id);
                    this.albums.set(_album.id, _album);
                }
                resolve(this.albums.get(id));
            } catch(e) { reject({ }) };
        });
    }

    static createAlbum(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("/api/admin/album/create", {
                    method: "POST",
                    headers: { "Content-Type": "application/json;charset=utf-8" },
                    body: JSON.stringify({ data })
                });
                const json = await response.json();
                if(json.status === "success") {
                    // this.albums.set(json.album.id, json.album);
                    return resolve({ success: 1 });
                } else return resolve({ success: 0, reason: json.error });
            } catch(e) { reject({}); }
        });
    }

    static editAlbum(id, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("/api/admin/album/edit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json;charset=utf-8" },
                    body: JSON.stringify({ data: { id, ...data } })
                });
                const json = await response.json();
                if(json.status === "success") {
                    // this.albums.set(json.album.id, json.album);
                    return resolve({ success: 1 });
                } else return resolve({ success: 0, reason: json.error });
            } catch(e) { console.log(e); reject({ }); }
        });
    }

    static removeAlbum(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("/api/admin/album/remove", {
                    method: "POST",
                    headers: { "Content-Type": "application/json;charset=utf-8" },
                    body: JSON.stringify({ data: { id } })
                });
                const json = await response.json();
                if(json.status === "success") {
                    return resolve({ success: 1 });
                } else return resolve({ success: 0, reason: json.error });
            } catch(e) { console.log(e); reject(); }
        });
    }
}