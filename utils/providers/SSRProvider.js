import {
    getEventList, getEventStats, getEventDetails,
    getAlbumList, getAlbumStats, getAlbumDetails,
    getPostList, getPostStats, getPostDetails
} from "../../routes/api";


export default class SSRProvider {
    static getEventList = getEventList;
    static getEventStats = getEventStats;
    static getEventDetails = getEventDetails;

    static getAlbumList = getAlbumList;
    static getAlbumStats = getAlbumStats;
    static getAlbumDetails = getAlbumDetails;

    static getPostList = getPostList;
    static getPostStats = getPostStats;
    static getPostDetails = getPostDetails;
}