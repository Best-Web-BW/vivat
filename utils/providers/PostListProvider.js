import DBProvider from "./DBProvider";

export function encode(text) {
    return encodeURIComponent(JSON.stringify(text));
}

export function createQuery(categories, tags, search, encoder = encode) {
    const params = [];
    if(categories.length) params.push(`categories=${encoder(categories)}`);
    if(tags.length) params.push(`tags=${encoder(tags)}`);
    if(search.length > 3) params.push(`search=${encoder(search)}`);

    const query = params.length ? `?${params.join("&")}` : "";

    return query;
}

export default class PostListProvider {
    static posts = new Map();
    static fetchingQueries = new Set();
    static fetchedQueries = new Set();
    static successfullyFetchedQueries = new Map();

    static fetchQuery(query) {
        return new Promise(async (resolve, reject) => {
            this.fetchingQueries.add(query);
            const ids = [];
    
            try {
                const posts = await DBProvider.getPostList(query);
                for(let post of posts) {
                    ids.push(post.id);
                    this.posts.set(post.id, post);
                }
                this.successfullyFetchedQueries.set(query, ids);
                resolve();
            } catch(e) { reject(); }
            finally { this.fetchingQueries.delete(query); }
        })
    }

    static getPostList(categories, tags, search) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = createQuery(categories, tags, search);

                while(this.fetchingQueries.has(query)) await sleep(100);

                this.fetchedQueries.add(query);
                if(!this.successfullyFetchedQueries.has(query)) await this.fetchQuery(query);

                resolve(this.successfullyFetchedQueries.get(query).map(id => this.posts.get(id)));
            } catch(e) { reject([ ]); }
        });
    }

    static getPostDetails(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if(!this.posts.has(id)) {
                    const post = await DBProvider.getPostDetails(id);
                    this.posts.set(post.id, post);
                }
                resolve(this.posts.get(id));
            } catch(e) { reject({ }) };
        });
    }
}