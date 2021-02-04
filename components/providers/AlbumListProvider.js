export default class AlbumListProvider {
    static albums = new Map();
    static isFetched = false;
    static isFetching = false;

    static loadAlbumList() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("/api/albums");
                const json = await response.json();
                for(let album of json) if(!this.albums.has(album.id)) this.albums.set(album.id, album);
                resolve();
            } catch(e) { reject(); }
        });
    }

    static loadAlbumDetails(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`/api/albums/${id}`);
                const album = await response.json();
                this.albums.set(id, album);
                resolve();
            } catch(e) { reject(); }
        });
    }

    static getAlbumList() {
        return new Promise(async (resolve, reject) => {
            try {
                if(!this.isFetched) { // If album list hasn't fetched yet
                    // If album list is fetching right now
                    if(this.isFetching) while(this.isFetching) await sleep(50);
                    else { // If album list isn't fetching right now (the first getAlbumList call)
                        this.isFetching = true;
                        await this.loadAlbumList();
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
                if(!album || !album.full) await this.loadAlbumDetails(id);
                resolve(this.albums.get(id));
            } catch(e) { reject({ }) };
        });
    }
}