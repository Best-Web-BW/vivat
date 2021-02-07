export default class DBProvider {
    static createPromise(url, defaultValue) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                resolve(json);
            } catch(e) { reject(defaultValue) }
        });
    }

    static getArrayPromise = address => this.createPromise(`/api/${address}`, []);
    static getAlbumList = () => this.getArrayPromise("albums");
    static getEventList = () => this.getArrayPromise("events");
    static getPostList = () => this.getArrayPromise("posts");

    static getObjectPromise = address => this.createPromise(`/api/${address}`, {});
    static getAlbumDetails = id => this.getObjectPromise(`albums/${id}`);
    static getEventDetails = id => this.getObjectPromise(`events/${id}`);
    static getPostDetails = id => this.getObjectPromise(`posts/${id}`);
}