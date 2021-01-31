export default class Translator {
    dictionary = {};
    get = name => this.dictionary["ru"][name];
    constructor(dictionary) {
        this.dictionary = dictionary;
    }
}