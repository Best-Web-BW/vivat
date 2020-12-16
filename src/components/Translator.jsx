class Translator {
    dictionary = {};
    get = name => this.dictionary[window.language][name];
    constructor(dictionary) {
        this.dictionary = dictionary;
    }
}

export default Translator;