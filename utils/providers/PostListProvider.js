import DBProvider from "./DBProvider";

export default class PostListProvider {
    static posts = new Map();
    static isFetched = false;
    static isFetching = false;

    static getPostList() {
        return new Promise(async (resolve, reject) => {
            try {
                if(!this.isFetched) { // If post list hasn't fetched yet
                    // If post list is fetching right now
                    if(this.isFetching) while(this.isFetching) await sleep(50);
                    else { // If post list isn't fetching right now (the first getPostList call)
                        this.isFetching = true;
                        
                        const posts = await DBProvider.getPostList();
                        for(let post of posts) if(!this.posts.has(post.id)) this.posts.set(post.id, post);

                        this.isFetched = true;
                        this.isFetching = false;
                    }
                }
                resolve(Array.from(this.posts.values()));
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