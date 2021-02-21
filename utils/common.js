export const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));
export const toRuDate = rawDate => new Date(rawDate).toLocaleString("ru", { day: "numeric", month: "numeric", year: "numeric" });
export const isServer = () => typeof window === "undefined";
export const isDev = () => process.env.NODE_ENV !== "production";
export const removeTagsFromText = text => text.replace(/<.+?>/g, "");
export const divideArrayRoundly = (array = [], count = 1) => {
    const result = [];
    for(let i = 0; i < count; result[i] = [], i++);
    for(let i = 0; i < array.length; result[i % count].push(array[i]), i++);
    return result;
};
export const divideArrayFlatly = (array = [], count = 1) => {
    const countPerPart = Math.floor(array.length / count);
    const counts = new Array(count).fill(countPerPart);
    for(let i = 0; i < array.length - countPerPart * count; counts[i++]++);
    
    const result = [];
    for(let i = 0, last = 0; i < count; result[i] = array.slice(last, last + counts[i]), last += counts[i++]);
    return result;
};